#!/usr/bin/env node
// read a HAR of discord's analytics requests and print what was inside, redacted.
//
//   node netlog/bodies.mjs capture.har [--json]
//
// redacts: the analytics token, every id (15+ digit numbers), uuids, long hex/base64
// strings, emails, ip addresses, and your username inside file paths.
// keeps: event names, field names, and values that don't identify you.
// still: read the output before you post it.

import fs from 'node:fs';
import os from 'node:os';

const [file, ...rest] = process.argv.slice(2);
const JSON_OUT = rest.includes('--json');
if (!file) { console.error('usage: node netlog/bodies.mjs <capture.har> [--json]'); process.exit(1); }
const har = JSON.parse(fs.readFileSync(file, 'utf8'));
const user = os.userInfo().username;

const ID_KEYS = /(^|_)(token|uuid|fingerprint|launch_signature|session_id|heartbeat_session_id|launch_id|install(ation)?_id|request_id|nonce|email|ip|hostname|device_id|advertiser_id|evaluation_id|load_id|snowflake_id|media_session_id)$/i;
const redactStr = s => s
  .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '<email>')
  .replace(/\b\d{15,20}\b/g, '<id>')
  .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, '<uuid>')
  .replace(/\b\d{1,3}(\.\d{1,3}){3}\b/g, '<ip>')
  .replace(/(\/Users\/|\/home\/|C:\\Users\\)[^/\\]+/gi, '$1<you>')
  .split(user).join('<you>')
  .replace(/\b[A-Za-z0-9+/_-]{32,}={0,2}/g, '<blob>');

const GAME_KEYS = /^(matched_name|game_name|game|application_name|matched_game_name|exe_name|executable_name|client_heartbeat_current_game_name|client_heartbeat_current_game_executable|executable_path)$/i;
function redact(v, key = '') {
  if (v == null) return v;
  if (GAME_KEYS.test(key) && v !== '' && typeof v === 'string') return '<game/app>';
  if (Array.isArray(v)) {
    const r = v.map(x => redact(x, key));
    if (r.length > 3 && r.every(x => x === '<id>')) return `[${r.length} × <id>]`;
    return r;
  }
  if (typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, redact(x, k)]));
  if (ID_KEYS.test(key) && v !== '' && typeof v !== 'boolean') return `<${key}>`;
  if (typeof v === 'number') return /^\d{15,}$/.test(String(Math.trunc(v))) ? '<id>' : v;
  if (typeof v === 'string') return redactStr(v);
  return v;
}

const decodeSuper = h => { try { return JSON.parse(Buffer.from(h, 'base64').toString('utf8')); } catch { return null; } };
const out = [];
for (const e of har.log.entries) {
  const url = e.request.url.split('?')[0];
  const path = new URL(url).pathname;
  const text = e.request.postData?.text;
  let body = null; try { body = text ? JSON.parse(text) : null; } catch { body = text ? '<non-json body>' : null; }
  const sp = e.request.headers.find(h => /^x-super-properties$/i.test(h.name));
  const events = Array.isArray(body?.events) ? body.events : body && path.endsWith('/beaker') ? [body] : [];
  out.push({
    time: new Date(e.startedDateTime).toTimeString().slice(0, 8),
    method: e.request.method, path, status: e.response.status,
    super_properties: sp ? redact(decodeSuper(sp.value)) : undefined,
    events: events.map(ev => ({ type: ev.type ?? '(no type)', properties: redact(ev.properties ?? ev) })),
    raw_if_not_events: events.length ? undefined : redact(body),
  });
}

if (JSON_OUT) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }

console.log('# what discord sent (redacted)\n');
const seenSuper = out.find(o => o.super_properties)?.super_properties;
if (seenSuper) { console.log('## header on every request: X-Super-Properties (decoded)\n'); console.log('```json\n' + JSON.stringify(seenSuper, null, 2) + '\n```\n'); }
console.log('## requests\n');
console.log('| time | request | events inside |');
console.log('| --- | --- | --- |');
for (const o of out) console.log(`| ${o.time} | ${o.method} ${o.path} | ${o.events.map(e => e.type).join(', ') || (o.raw_if_not_events ? '(body below)' : '-')} |`);
console.log('\n## every event, every field\n');
for (const o of out) for (const ev of o.events) {
  console.log(`### ${o.time} — \`${ev.type}\` → ${o.path}\n`);
  console.log('```json\n' + JSON.stringify(ev.properties, null, 2) + '\n```\n');
}
for (const o of out) if (o.raw_if_not_events) { console.log(`### ${o.time} — ${o.path}\n`); console.log('```json\n' + JSON.stringify(o.raw_if_not_events, null, 2) + '\n```\n'); }
