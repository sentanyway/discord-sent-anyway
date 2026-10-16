#!/usr/bin/env node
// sent anyway — check the claims against YOUR OWN discord install.
//
// read-only. it never writes to discord's folders, never opens your token,
// cookies, local storage or cached messages. it reads:
//   - core.asar (discord's own app code)
//   - discord's own web-app javascript from its http cache (only /assets/*.js entries)
//   - sentry/scope_v3.json (key names only, values are never printed)
//
// usage:
//   node verify.mjs            run every check
//   node verify.mjs consent    run one check (see list with --list)
//   node verify.mjs --save     also write receipts/ (snippets + sha256 of every file read)

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const HOME = os.homedir();
const args = process.argv.slice(2);
const SAVE = args.includes('--save');
const wanted = args.filter(a => !a.startsWith('--'));
const tty = process.stdout.isTTY;
const B = s => (tty ? `\x1b[1m${s}\x1b[0m` : s);
const Y = s => (tty ? `\x1b[33m${s}\x1b[0m` : `>>${s}<<`);
const G = s => (tty ? `\x1b[32m${s}\x1b[0m` : s);
const R = s => (tty ? `\x1b[31m${s}\x1b[0m` : s);
const D = s => (tty ? `\x1b[2m${s}\x1b[0m` : s);
const tilde = p => p.split(HOME).join('~');
const sha256 = buf => crypto.createHash('sha256').update(buf).digest('hex');

// ---------- find the install ----------

function dataDir() {
  const c = {
    darwin: [path.join(HOME, 'Library/Application Support/discord')],
    win32: [path.join(process.env.APPDATA || '', 'discord')],
    linux: [path.join(HOME, '.config/discord')],
  }[process.platform] || [];
  return c.find(p => fs.existsSync(p));
}

function newestAppDir(dd) {
  // mac: <data>/app-0.0.416 ; windows: %LOCALAPPDATA%/Discord/app-1.0.9xxx
  const roots = [dd];
  if (process.platform === 'win32') roots.push(path.join(process.env.LOCALAPPDATA || '', 'Discord'));
  const dirs = [];
  for (const r of roots) {
    if (!r || !fs.existsSync(r)) continue;
    for (const n of fs.readdirSync(r)) if (/^app-\d+\.\d+\.\d+$/.test(n)) dirs.push(path.join(r, n));
  }
  const v = p => path.basename(p).slice(4).split('.').map(Number);
  dirs.sort((a, b) => { const x = v(a), y = v(b); for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return y[i] - x[i]; return 0; });
  return dirs[0];
}

function findFile(root, name, depth = 7) {
  if (!root || !fs.existsSync(root) || depth < 0) return null;
  for (const e of fs.readdirSync(root, { withFileTypes: true })) {
    const p = path.join(root, e.name);
    if (e.isFile() && e.name === name) return p;
    if (e.isDirectory()) { const r = findFile(p, name, depth - 1); if (r) return r; }
  }
  return null;
}

// ---------- asar reader (no deps) ----------
// asar = 8-byte pickle prefix, json header, then file bytes.

function readAsar(file) {
  const fd = fs.openSync(file, 'r');
  const pre = Buffer.alloc(16); fs.readSync(fd, pre, 0, 16, 0);
  const headerSize = pre.readUInt32LE(4), jsonLen = pre.readUInt32LE(12);
  const hb = Buffer.alloc(jsonLen); fs.readSync(fd, hb, 0, jsonLen, 16);
  const header = JSON.parse(hb.toString('utf8'));
  const base = 8 + headerSize;
  const files = new Map();
  (function walk(node, prefix) {
    for (const [name, e] of Object.entries(node.files || {})) {
      const p = prefix ? `${prefix}/${name}` : name;
      if (e.files) walk(e, p);
      else if (!e.unpacked && e.offset != null && /\.(js|json)$/.test(name)) {
        const buf = Buffer.alloc(e.size); fs.readSync(fd, buf, 0, e.size, base + Number(e.offset));
        files.set(p, buf.toString('utf8'));
      }
    }
  })(header, '');
  fs.closeSync(fd);
  return files;
}

// ---------- discord's web-app js, from its own http cache ----------
// chromium "simple cache": 24-byte header, url key, body, eof magic, response headers.
// only entries whose key is a discord.com/assets/*.js url are opened.

const EOF_MAGIC = Buffer.from('d8410d97456ffaf4', 'hex');
function webJs(dd) {
  const dir = path.join(dd, 'Cache', 'Cache_Data');
  const out = new Map();
  if (!fs.existsSync(dir)) return out;
  for (const n of fs.readdirSync(dir)) {
    if (!n.endsWith('_0')) continue;
    const p = path.join(dir, n);
    const fd = fs.openSync(p, 'r'); const head = Buffer.alloc(512);
    const got = fs.readSync(fd, head, 0, 512, 0); fs.closeSync(fd);
    if (got < 24) continue;
    const keyLen = head.readUInt32LE(12);
    if (keyLen > 480) continue;
    const key = head.subarray(24, 24 + keyLen).toString('latin1');
    const m = key.match(/https:\/\/discord\.com\/assets\/([\w.-]+\.js)$/);
    if (!m) continue;
    const raw = fs.readFileSync(p);
    const end = raw.indexOf(EOF_MAGIC, 24 + keyLen);
    if (end < 0) continue;
    let body = raw.subarray(24 + keyLen, end);
    const enc = (raw.subarray(end).toString('latin1').match(/content-encoding:\s*([a-z]+)/i) || [])[1]?.toLowerCase();
    try {
      if (enc === 'br') body = zlib.brotliDecompressSync(body);
      else if (enc === 'gzip') body = zlib.gunzipSync(body);
    } catch { continue; }
    const prev = out.get(m[1]);
    if (!prev || body.length > prev.length) out.set(m[1], body.toString('utf8'));
  }
  return out;
}

// ---------- receipts ----------

const receipts = [];
const sources = new Map(); // label -> sha256

function show(where, text, idx, needles, before = 160, after = 360) {
  let s = text.slice(Math.max(0, idx - before), idx + after).replace(/\s+/g, ' ');
  s = redact(s);
  let shown = s;
  for (const n of needles) shown = shown.split(n).join(Y(n));
  console.log(D(`  ${where} @${idx}`));
  console.log('  ' + shown);
  receipts.push({ where, offset: idx, snippet: s });
}

// sentry dsn keys are public client keys, but no need to spray them around.
const redact = s => s
  .replace(/([0-9a-f]{32})(@o\d+\.ingest)/g, '<key>$2')
  .replace(/(sentry_key=)[0-9a-f]{32}/g, '$1<key>')
  .replace(/buildSentryDSN\("[0-9a-f]{32}"\)/g, 'buildSentryDSN("<key>")');

function searchAll(files, re, max = 3) {
  const hits = [];
  for (const [name, text] of files) {
    re.lastIndex = 0; let m;
    while ((m = re.exec(text)) && hits.length < max) hits.push({ name, text, idx: m.index, m });
    if (hits.length >= max) break;
  }
  return hits;
}

// ---------- checks ----------

const results = [];
function result(id, ok, line) { results.push({ id, ok, line }); console.log((ok ? G('  ✓ ') : R('  ✗ ')) + line + '\n'); }

const checks = {
  launch_game: {
    title: 'every game you open gets reported. exe path, fingerprint, your servers, your voice channel. activity status off just becomes a field.',
    run(ctx) {
      const h = searchAll(ctx.web, /\.LAUNCH_GAME,\{/g, 1)[0];
      if (!h) return result('launch_game', false, 'LAUNCH_GAME call not found in cached js');
      const body = h.text.slice(h.idx, h.text.indexOf('})', h.idx) + 2);
      const fields = [...body.matchAll(/[{,]([a-z_]+):/g)].map(m => m[1]);
      show(h.name, h.text, h.idx, ['executable_path', 'executable_fingerprint', 'activity_status_enabled', 'activity_status_shared_guilds', 'voice_channel_id', 'voice_channel_guild_id'], 40, body.length + 40);
      console.log(`  fields: ${fields.join(', ')}`);
      const t = searchAll(ctx.web, /sharedGuildIds:[a-zA-Z$]+,voiceChannelId/g, 1)[0];
      if (t) { console.log('  fires 10s (1e4 ms) after a game is detected:'); show(t.name, t.text, t.idx, ['1e4']); }
      const need = ['executable_path', 'activity_status_enabled', 'activity_status_shared_guilds', 'voice_channel_id'];
      result('launch_game', need.every(f => fields.includes(f)), `launch_game carries ${need.join(', ')}`);
    },
  },

  consent: {
    title: 'i turned off "use data to improve discord". the app never checks it before sending analytics.',
    run(ctx) {
      const hits = searchAll(ctx.web, /USAGE_STATISTICS/g, 50);
      const where = new Map();
      for (const h of hits) {
        const win = h.text.slice(Math.max(0, h.idx - 600), h.idx + 600);
        const kind = /USAGE_STATISTICS="usage_statistics"/.test(win) ? 'enum definition'
          : /updateConsent|DATA_USAGE|onConfirm|hasConsented/.test(win) ? 'settings screen'
          : 'OTHER';
        where.set(`${h.name} @${h.idx}`, kind);
      }
      console.log(`  every place the web app mentions USAGE_STATISTICS (${hits.length}):`);
      for (const [k, v] of where) console.log(`   - ${k}: ${v === 'OTHER' ? Y(v) : v}`);
      const first = hits.find(h => /updateConsent|onConfirm/.test(h.text.slice(h.idx - 600, h.idx + 600)));
      if (first) show(first.name, first.text, first.idx, ['USAGE_STATISTICS', 'updateConsent', 'hasConsented']);
      const pipe = searchAll(ctx.web, /TRACKING_URL:/g, 1)[0];
      if (pipe) {
        console.log('  the analytics pipeline config (where events get sent). no consent anywhere in it:');
        show(pipe.name, pipe.text, pipe.idx, ['handleTrack', 'TRACKING_URL', 'TRACK'], 260, 260);
      }
      const other = [...where.values()].filter(v => v === 'OTHER').length;
      result('consent', hits.length > 0 && other === 0,
        hits.length === 0 ? 'no web-app js found in cache (open discord once, then rerun)'
        : `${hits.length} references, ${other} outside settings/enum. the send path never reads it.`);
    },
  },


  sentry: {
    title: 'crash reports go to sentry.io with your email, id and username. no opt-out. mac = 100% of crashes.',
    run(ctx) {
      const dsn = searchAll(ctx.core, /ingest\.sentry\.io\/146342/g, 1)[0];
      if (dsn) show(`core.asar:${dsn.name}`, dsn.text, dsn.idx, ['ingest.sentry.io']);
      const rate = searchAll(ctx.core, /IS_OSX\?1:/g, 1)[0];
      if (rate) { console.log('  sample rate: 1 (= every crash) on mac:'); show(`core.asar:${rate.name}`, rate.text, rate.idx, ['sampleRate', 'IS_OSX?1']); }
      const off = searchAll(ctx.core, /ELECTRON_ENABLE_STACK_DUMPING/g, 1)[0];
      if (off) { console.log('  the only off switch is an environment variable, not a setting:'); show(`core.asar:${off.name}`, off.text, off.idx, ['ELECTRON_ENABLE_STACK_DUMPING']); }
      const su = searchAll(ctx.core, /sentry\.setUser\(user\)/g, 1)[0];
      if (su) show(`core.asar:${su.name}`, su.text, su.idx, ['setUser']);
      // the local copy: key names only
      const f = path.join(ctx.dd, 'sentry', 'scope_v3.json');
      let local = 'no sentry/scope_v3.json on this machine';
      if (fs.existsSync(f)) {
        try {
          const j = JSON.parse(fs.readFileSync(f, 'utf8'));
          const u = j?.scope?.user || j?.user || {};
          const crumbs = j?.scope?.breadcrumbs || j?.breadcrumbs || [];
          const keys = Object.keys(u).map(k => `user.${k}`);
          local = `${tilde(f)} has ${keys.join(', ') || 'no user keys'} (values not shown) + ${crumbs.length} breadcrumbs`;
        } catch { local = `${tilde(f)} exists but did not parse`; }
      }
      console.log('  on your disk: ' + Y(local));
      result('sentry', !!dsn && !!rate, 'main-process sentry, sample rate 1 on mac, env-var-only opt-out');
    },
  },
};

// ---------- main ----------

if (args.includes('--list')) { for (const [k, c] of Object.entries(checks)) console.log(`${k.padEnd(18)} ${c.title}`); process.exit(0); }

const dd = dataDir();
if (!dd) { console.error('discord data folder not found. is discord installed and opened at least once?'); process.exit(1); }
const appDir = newestAppDir(dd);
const coreAsar = findFile(appDir, 'core.asar') || findFile(path.join(dd, 'modules'), 'core.asar') || findFile(dd, 'core.asar', 4);

console.log(B('sent anyway — checking your own discord install (read-only)\n'));
for (const [label, p] of [['core.asar', coreAsar]]) {
  if (!p) { console.log(`  ${label}: not found`); continue; }
  const h = sha256(fs.readFileSync(p)); sources.set(label, { path: tilde(p), sha256: h });
  console.log(`  ${label.padEnd(19)} ${tilde(p)}\n  ${''.padEnd(19)} sha256 ${h}`);
}
const ctx = {
  dd,
  core: coreAsar ? readAsar(coreAsar) : new Map(),
  web: webJs(dd),
};
const build = (() => { for (const t of ctx.web.values()) { const m = t.match(/buildNumber:"?(\d{6})"?/) || t.match(/"buildNumber","(\d{6})"/); if (m) return m[1]; } return '?'; })();
console.log(`  web app js          ${ctx.web.size} files from discord's http cache (web build ${build})\n`);

for (const [id, c] of Object.entries(checks)) {
  if (wanted.length && !wanted.includes(id)) continue;
  console.log(B(`## ${id}`));
  console.log(c.title + '\n');
  try { c.run(ctx); } catch (e) { result(id, false, 'error: ' + e.message); }
}

console.log(B('summary'));
for (const r of results) console.log(`  ${r.ok ? G('✓') : R('✗')} ${r.id.padEnd(18)} ${r.line}`);
console.log(D('\n✗ usually means discord shipped a new build and the pattern moved. open an issue with your build number.'));

if (SAVE) {
  const dir = path.join(process.cwd(), 'receipts');
  fs.mkdirSync(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const f = path.join(dir, `receipts-${stamp}.json`);
  fs.writeFileSync(f, JSON.stringify({ when: new Date().toISOString(), platform: `${process.platform} ${os.release()}`, web_build: build, sources: Object.fromEntries(sources), results, receipts }, null, 2));
  console.log(`\nsaved ${f}`);
}
