# sent anyway

i turned off every privacy setting in discord.

then i read the code.

- the "use data to improve discord" toggle is never checked before sending analytics.
- every game you open gets reported with its file path, your servers and your voice channel. activity status off or not.
- your email goes to a third party (sentry.io) with every crash. no setting turns it off.
- it tracks how long your whole computer has been idle, every 10 seconds.
- window closed, untouched for 30 minutes: analytics went out every 5 minutes, on the second.
- your language gets sent in a dns lookup on every launch, outside the api.
- there's a script inside that installs a vpn on your mac with admin rights.

don't trust me. check your own install. it takes about a minute:

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

the web app mentions `USAGE_STATISTICS` 23 times. every single one is the settings screen or the line that defines it. **zero** are in the code that queues or sends events to `/api/v9/science`.

flipping the toggle sends one request to discord's server saying you revoked consent. then the app keeps sending exactly what it sent before.

```js
// the entire job of the toggle
onConfirm:()=>(0,IX.U)([],[A.YAq.USAGE_STATISTICS])
```

---

### 2. in the background

i closed the window. didn't touch it for 30 minutes.

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

10 analytics posts and 1 telemetry batch in 30 minutes, with nobody using it. full redacted timeline: [`examples/idle-30min-timeline.md`](examples/idle-30min-timeline.md). capture your own: [`netlog/HOWTO.md`](netlog/HOWTO.md).

---

### 3. every game you open

activity status: off.

discord still reports every game it detects. the full file path of the exe. a fingerprint of the file. whether it runs as admin. up to 200 of your server ids. the voice channel you're in, and its server.

"off" just becomes a field in the report.

sent anyway.

```
node verify.mjs launch_game
```

```js
$.default.track(K.HAw.LAUNCH_GAME,{game:..., elevated:..., hardware_display_count:...,
  activity_status_enabled:eD.tz.getSetting(),   // your "off", sent along with everything else
  activity_status_shared_guilds:s,
  executable_path:T,
  voice_channel_id:l, voice_channel_guild_id:c,
  executable_fingerprint:f??t.executableFingerprint})
// fires 10 seconds (1e4 ms) after the game is detected
```

it's not just games. a separate event, `launch_non_game_application`, does the same for other apps it recognises. my own logs show 123 game changes and 123 non-game app changes picked up.

---

### 4. your email, to sentry.io

when discord crashes, the report goes to sentry.io, a third-party company. it carries your email, user id and username.

on mac (and linux) it sends 100% of crashes.

there is no setting. the only way to turn it off is an environment variable.

sent anyway.

```
node verify.mjs sentry
```

```js
sampleRate: ... IS_LINUX||processUtils.IS_OSX?1: ... :.01      // mac + linux: 1 = every crash
let user=additionalMetadata.sentry?.user;null!=user&&sentry.setUser(user)
if("true"===process.env.ELECTRON_ENABLE_STACK_DUMPING)return void console.warn("Not initializing crash reporter ...")
```

and it keeps a copy. on my machine `sentry/scope_v3.json` holds `user.id`, `user.username`, `user.email`, plus about 100 breadcrumbs of what i was doing. the script shows you which keys are in yours.

---

### 5. your whole computer

discord checks how long your entire computer has been idle. not discord. your computer. every 10 seconds.

it listens for you locking the screen, unlocking it, sleeping and waking.

idle, afk, locked and asleep all go out in presence and heartbeats.

sent anyway.

```
node verify.mjs idle heartbeat
```

```js
setTimeout(e,10*u.A.Millis.SECOND)} if(d.A?.powerMonitor?.getSystemIdleTimeMs!=null) ...
powerMonitor.on("lock-screen",...)  powerMonitor.on("unlock-screen",...)  powerMonitor.on("suspend",...)
```

---

### 6. the dns beacon

every launch, discord builds a hostname out of your system language and looks it up.

`idt-<nonce>.loc-<your language>.chk-webapp.res-ok.dur-0.v1.dc-telemetry.net`

it doesn't go through the api. it doesn't go through analytics. no setting touches it. i saw it go out live, about 20 seconds after launch.

sent anyway.

```
node verify.mjs dns_beacon
```

```js
class DnsReporter{baseDomain;clientLocale; ... this.baseDomain=baseDomain??"dc-telemetry.net"
new connectivityTester.DnsReporter("dc-telemetry.net",locale)
```

discord calls it a connectivity test. it still carries your language, every launch, through a side channel.

---

### 7. a vpn installer

inside `discord_utils.node` there's a shell script. it downloads cloudflare's warp vpn and installs it system-wide, behind an admin password prompt.

don't know: what triggers it. i found nothing in the current app that calls it.

```
node verify.mjs warp
```

```sh
/usr/bin/curl -L -o "$INSTALLER" https://1111-releases.cloudflareclient.com/mac/latest
/usr/sbin/installer -pkg "$INSTALLER" -target /
```

---

### 8. every request

every api call carries a header with your os, os version, cpu arch, system language, and whether you run betterdiscord or vencord.

every request. not just analytics.

sent anyway.

```
node verify.mjs super_properties
```

```js
a={os:e, ..., os_version:i, os_arch:r, app_arch:s, system_locale:o, has_client_mods:(0,et.b)(), client_launch_id:ea.C}
```

---

### 9. a second pipe

there's a second analytics endpoint: `/api/v9/beaker`. about once an hour. window open or closed. caught live at 20:18:40.

sent anyway.

```
node verify.mjs beaker
```

---

### 10. on your disk

discord's cache on my machine was ~800 MB. in it: channel messages, user profiles, and my private notes on other users. not encrypted. cookie encryption is switched off in the app build.

and the main window runs with the chromium sandbox off (`sandbox:false`). `node verify.mjs sandbox`

---

### what i don't know

- what discord's servers do with events after you turn the setting off. the client can't show that.
- what's inside each background `/science` post. that needs a tls-intercepting proxy. coming.
- what triggers the vpn installer.
- the game-scan interval, and what `executable_fingerprint` is made of. that's native code.

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
