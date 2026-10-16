# sent anyway

i turned off "use data to improve discord".

then i read the code.

everything below is checkable on your own machine in about a minute. you don't have to trust me.

```
git clone https://github.com/sentanyway/discord-sent-anyway
cd discord-sent-anyway
node verify.mjs
```

needs node 18+. no installs, no dependencies. tested on macOS. windows and linux paths are in there but untested.

**read-only.** it reads discord's own app code (`app.asar`, `core.asar`), one native module (strings only), and discord's own web-app javascript out of its http cache (only `discord.com/assets/*.js` entries). it never opens your token, cookies, local storage, or cached messages. for `sentry/scope_v3.json` it prints key names only, never values. read `verify.mjs` before you run it. it's one file.

---

### 1. the setting

i turned off "use data to improve discord".

the app never checks that setting before sending analytics.

don't know: what discord does with it after.

sent anyway.

```
node verify.mjs consent
```

lists every place the web app mentions `USAGE_STATISTICS`. all of them are the settings screen or the enum that defines it. none are in the code that queues or sends events to `/api/v9/science`. the toggle calls a consent api on the server. that's it.

```js
// settings screen: this is the whole job of the toggle
onConfirm:()=>(0,IX.U)([],[A.YAq.USAGE_STATISTICS])
```

---

### 2. every game you open

activity status: off.

discord still reports every game it detects. exe path. a file fingerprint. up to 200 of your server ids. your voice channel.

"off" just becomes a field in the report.

sent anyway.

```
node verify.mjs launch_game
```

```js
$.default.track(K.HAw.LAUNCH_GAME,{game:..., elevated:..., hardware_display_count:...,
  activity_status_enabled:eD.tz.getSetting(),
  activity_status_shared_guilds:s,
  executable_path:T,
  voice_channel_id:l, voice_channel_guild_id:c,
  executable_fingerprint:f??t.executableFingerprint})
// scheduled 10 seconds (1e4 ms) after the game is detected
```

---

### 3. crash reports

discord sends crash reports to sentry.io. with your email, user id and username.

on mac it sends every one (sample rate 1).

no setting turns it off. only an environment variable does.

sent anyway.

```
node verify.mjs sentry
```

```js
sampleRate: ... IS_LINUX||processUtils.IS_OSX?1: ... :.01
if("true"===process.env.ELECTRON_ENABLE_STACK_DUMPING)return void console.warn("Not initializing crash reporter ...")
let user=additionalMetadata.sentry?.user;null!=user&&sentry.setUser(user)
```

on my machine `sentry/scope_v3.json` holds `user.id`, `user.username`, `user.email` and about 100 breadcrumbs. check yours: the script prints the key names, not the values.

---

### 4. the dns beacon

every launch, discord puts your system language into a dns name.

`idt-<nonce>.loc-<your locale>.chk-webapp.res-ok.dur-0.v1.dc-telemetry.net`

it goes outside the normal api. no setting.

it's probably a connectivity check. it still carries your locale.

sent anyway.

```
node verify.mjs dns_beacon
```

```js
class DnsReporter{baseDomain;clientLocale; ... this.baseDomain=baseDomain??"dc-telemetry.net"
new connectivityTester.DnsReporter("dc-telemetry.net",locale)
```

---

### 5. idle

discord checks how long your whole computer has been idle. every 10 seconds.

it listens for lock, unlock, sleep and wake.

idle, afk, locked and suspended go out in presence and heartbeats.

sent anyway.

```
node verify.mjs idle heartbeat
```

```js
setTimeout(e,10*u.A.Millis.SECOND)} if(d.A?.powerMonitor?.getSystemIdleTimeMs!=null) ...
powerMonitor.on("lock-screen",...) powerMonitor.on("suspend",...)
```

---

### 6. in the background

i hid the window and didn't touch it for 30 minutes.

it posted analytics every 5 minutes. on the second.

don't know: what was in them. the capture has urls and times, not bodies.

sent anyway.

```
20:05:09  POST /api/v9/science
20:10:09  POST /api/v9/science
20:15:09  POST /api/v9/science
20:18:40  POST /api/v9/beaker
20:20:09  POST /api/v9/science
20:25:09  POST /api/v9/science
20:30:09  POST /api/v9/science
```

full redacted timeline: [`examples/idle-30min-timeline.md`](examples/idle-30min-timeline.md). do it yourself: [`netlog/HOWTO.md`](netlog/HOWTO.md).

---

### 7. every request

every api call carries a header with your os, os version, cpu arch, system language, and whether you run betterdiscord or vencord.

sent anyway.

```
node verify.mjs super_properties
```

```js
a={os:e, ..., os_version:i, os_arch:r, app_arch:s, system_locale:o, has_client_mods:(0,et.b)(), client_launch_id:ea.C}
```

---

### 8. the second endpoint

there's a second analytics endpoint: `/api/v9/beaker`. about once an hour. in the background too.

sent anyway.

```
node verify.mjs beaker
```

---

### smaller stuff

- **cloudflare warp installer** (inferred). `discord_utils.node` contains a script that downloads `warp.pkg` from cloudflare and installs it with an admin prompt. i found nothing that calls it. strings only, no disassembly. `node verify.mjs warp`
- **sandbox off.** the main window runs with `sandbox:false`. context isolation is on. `node verify.mjs sandbox`
- **your messages on disk.** discord's http cache (~800 MB on my machine) holds api responses: channel messages, profiles, your private notes. i only looked at the url keys.

---

### what i don't know

- what discord's servers do with events after you turn the setting off. maybe they drop them. the client can't show that.
- what's inside each `/science` batch in the background. that needs a tls-intercepting proxy. not done yet.
- whether `installWarp` ever runs, and what triggers it.
- the game-scan interval, and what `executable_fingerprint` is made of. that's native code.

### what this isn't

not saying discord sells your data. not saying it's malware. some of this is in their privacy policy.

i'm saying the toggle doesn't do what it sounds like it does, on the client.

---

### if you post your own output

- `verify.mjs` output has no personal info. still read it first.
- never post a raw net log. it has your ids in the urls. post `summarize.mjs` output only.
- never post anything from `Local Storage`, `Cookies`, or `sentry/scope_v3.json` values. your token and email live there.

### tested on

| | |
| --- | --- |
| desktop | 0.0.415, 0.0.416 (macOS) |
| web builds | 634304, 638651 |
| `app.asar` 0.0.416 sha256 | `94ddb271db012dbaf4801dba9782a98c6bac9398f1b970bb6ce1f703ac2dc245` |
| `core.asar` 0.0.416 sha256 | `27aacaa590e9511bf3c70f545fe735a7a695612a88b1c3a78739779ff2ceab47` |

`node verify.mjs --save` writes your own receipts (snippets + sha256 of every file read) to `receipts/`.

a ✗ usually means discord shipped a new build and the code moved. open an issue with your build number and output.
