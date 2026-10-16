#!/usr/bin/env node
// turn a chromium net log from discord into a redacted, postable timeline.
//
//   node netlog/summarize.mjs ~/discord-netlog.json [--from 20:00] [--all]
//
// --from HH:MM   only show requests after this local time (e.g. when you hid the window)
// --all          list every request instead of only the telemetry-ish ones
//
// redacts: ids (15+ digit numbers), query strings, the dns beacon nonce, your
// locale in the beacon, attachment signatures, anything that looks like a token.
// still: read the output before you post it.

import fs from 'node:fs';

const args = process.argv.slice(2);
const file = args.find(a => !a.startsWith('--') && !/^\d{1,2}:\d{2}$/.test(a));
const fromArg = args[args.indexOf('--from') + 1];
const ALL = args.includes('--all');
if (!file) { console.error('usage: node netlog/summarize.mjs <netlog.json> [--from HH:MM] [--all]'); process.exit(1); }

// discord may still be writing the file, or was killed: repair a truncated log.
let t = fs.readFileSync(file, 'utf8').trimEnd();
let j;
try { j = JSON.parse(t); } catch {
  t = t.replace(/,\s*$/, '');
  try { j = JSON.parse(t + ']}'); } catch { j = JSON.parse(t.slice(0, t.lastIndexOf('},') + 1) + ']}'); }
}

const C = j.constants;
const typeName = Object.fromEntries(Object.entries(C.logEventTypes).map(([k, v]) => [v, k]));
const tickOffset = Number(C.timeTickOffset);

const redact = u => {
  let [base] = u.split(/[?#]/);
  return base
    .replace(/\/\d{15,}/g, '/<id>')
    .replace(/idt-[^.]+/g, 'idt-<nonce>')
    .replace(/\.loc-[^.]+/g, '.loc-<locale>')
    .replace(/\/[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{6,}\.[A-Za-z0-9_-]{20,}/g, '/<token>')
    .replace(/\/(invites?|invite)\/[^/]+/g, '/$1/<code>');
};

const reqs = [];
const dns = new Map();
for (const e of j.events) {
  const ty = typeName[e.type];
  const ms = tickOffset + Number(e.time);
  if (ty === 'URL_REQUEST_START_JOB' && e.params?.url) reqs.push({ ms, m: e.params.method, u: redact(e.params.url) });
  if (/^HOST_RESOLVER/.test(ty) && e.params?.host) {
    const raw = String(e.params.host).replace(/^[a-z]+:\/\//, '').replace(/:\d+$/, '');
    const h = redact('https://' + raw).slice(8);
    dns.set(h, (dns.get(h) || 0) + 1);
  }
}
reqs.sort((a, b) => a.ms - b.ms);

const hhmmss = ms => new Date(ms).toTimeString().slice(0, 8);
let from = 0;
if (fromArg && /^\d{1,2}:\d{2}$/.test(fromArg) && reqs.length) {
  const d = new Date(reqs[0].ms); const [h, m] = fromArg.split(':').map(Number);
  d.setHours(h, m, 0, 0); from = d.getTime();
}

const interesting = r => /\/(science|beaker|metrics|activities|track|error-reporting-proxy)|dc-telemetry|sentry\.io/.test(r.u);
const shown = reqs.filter(r => r.ms >= from && (ALL || interesting(r)));

console.log(`# discord network timeline (redacted)`);
console.log(`capture: ${hhmmss(reqs[0]?.ms)} → ${hhmmss(reqs.at(-1)?.ms)}, ${reqs.length} requests total${from ? `, showing from ${fromArg}` : ''}`);
console.log(`source: chromium --log-net-log, default capture mode (no bodies, no cookies, no auth headers)\n`);
console.log('| time | method | url |');
console.log('| --- | --- | --- |');
for (const r of shown) console.log(`| ${hhmmss(r.ms)} | ${r.m} | ${r.u} |`);

const sci = reqs.filter(r => r.ms >= from && /\/science$/.test(r.u)).map(r => r.ms);
if (sci.length > 1) {
  const gaps = sci.slice(1).map((v, i) => Math.round((v - sci[i]) / 1000));
  console.log(`\n/science posts: ${sci.length}. gaps between them (s): ${gaps.join(', ')}`);
}

const hosts = new Map();
for (const r of reqs.filter(r => r.ms >= from)) { const h = r.u.split('/')[2]; hosts.set(h, (hosts.get(h) || 0) + 1); }
console.log('\n## hosts contacted' + (from ? ` since ${fromArg}` : ''));
for (const [h, n] of [...hosts].sort((a, b) => b[1] - a[1])) console.log(`- ${h} (${n})`);
console.log('\n## dns names looked up');
for (const [h, n] of [...dns].sort((a, b) => b[1] - a[1]).slice(0, 40)) console.log(`- ${h} (${n})`);
