// passive listener: records discord's analytics requests, bodies included, into a HAR file.
// it only listens. no clicks, no navigation, nothing injected.
//
//   node netlog/capture.mjs <seconds> <out.har>
//
// discord must be started with a local-only debug port first (see netlog/HOWTO.md).
// auth headers, cookies, fingerprint and installation id are removed before writing.
import fs from 'node:fs';
const [secs, out] = process.argv.slice(2);
if (!secs || !out) { console.error('usage: node netlog/capture.mjs <seconds> <out.har>'); process.exit(1); }
const list = await (await fetch('http://127.0.0.1:9229/json/list')).json();
const page = list.find(t => t.type === 'page' && t.url.startsWith('https://discord.com'));
if (!page) { console.error('no discord page on 127.0.0.1:9229. start discord with the debug port first.'); process.exit(1); }
const ws = page.webSocketDebuggerUrl;
const MATCH = /\/api\/v\d+\/(science|beaker|metrics|activities|track)\b|error-reporting-proxy|dc-telemetry/;
const DROP = /^(authorization|cookie|x-fingerprint|x-installation-id|x-debug-options|x-captcha.*)$/i;
const sock = new WebSocket(ws);
let id = 0; const pending = new Map(); const reqs = new Map(); const entries = [];
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); sock.send(JSON.stringify({ id: i, method, params })); });
sock.onmessage = async ev => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Network.requestWillBeSent') {
    const r = m.params.request; if (!MATCH.test(r.url)) return;
    let body = r.postData;
    if (body == null && r.hasPostData) { const g = await send('Network.getRequestPostData', { requestId: m.params.requestId }); body = g.result?.postData; }
    reqs.set(m.params.requestId, { started: new Date(m.params.wallTime * 1000).toISOString(), r, body });
    console.log(new Date().toTimeString().slice(0, 8), r.method, r.url.split('?')[0], body ? body.length + 'B' : '');
  }
  if (m.method === 'Network.responseReceived' && reqs.has(m.params.requestId)) reqs.get(m.params.requestId).status = m.params.response.status;
};
sock.onopen = async () => {
  await send('Network.enable', { maxPostDataSize: 4 * 1024 * 1024 });
  console.log('listening', secs, 's');
  setTimeout(() => {
    for (const { started, r, body, status } of reqs.values()) {
      const headers = Object.entries(r.headers).map(([name, value]) => ({ name, value: DROP.test(name) ? '<removed>' : value }));
      entries.push({
        startedDateTime: started, time: 0,
        request: { method: r.method, url: r.url, httpVersion: 'HTTP/2', cookies: [], headers, queryString: [], headersSize: -1, bodySize: body ? Buffer.byteLength(body) : 0,
          ...(body != null ? { postData: { mimeType: r.headers['Content-Type'] || r.headers['content-type'] || 'application/json', text: body } } : {}) },
        response: { status: status || 0, statusText: '', httpVersion: 'HTTP/2', cookies: [], headers: [], content: { size: 0, mimeType: 'x-unknown' }, redirectURL: '', headersSize: -1, bodySize: -1 },
        cache: {}, timings: { send: 0, wait: 0, receive: 0 },
      });
    }
    fs.writeFileSync(out, JSON.stringify({ log: { version: '1.2', creator: { name: 'cdp-har', version: '1' }, entries } }, null, 1));
    console.log('wrote', entries.length, 'entries');
    process.exit(0);
  }, Number(secs) * 1000);
};
sock.onerror = e => { console.error('ws error', e.message); process.exit(1); };
