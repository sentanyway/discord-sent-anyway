# sent anyway

i turned off discord's privacy settings.

then i read the code.

1. activity status off. it still reports every game you open: the file path on your computer, your server ids, your voice channel.
2. "use data to improve discord" off. the app never checks it. window closed, it still sent analytics every 5 minutes.
3. crash reports send your email to a different company, sentry.io. no setting turns it off.

don't trust me. check your own install. it takes about a minute:

```
git clone https://github.com/sentanyway/discord-sent-anyway
cd discord-sent-anyway
node verify.mjs
```

needs node 18+. no installs, no dependencies. tested on macOS. windows and linux paths are in there but untested.

**read-only.** it reads discord's own app code (`core.asar`) and discord's own web-app javascript out of its http cache (only `discord.com/assets/*.js` entries). it never opens your token, cookies, local storage, or cached messages. for `sentry/scope_v3.json` it prints key names only, never values. read `verify.mjs` before you run it. it's one file.

---

### 1. every game you open

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

it doesn't wait for you to play, either. the second i opened discord it sent `game_name_match_fallback`: the names of 5 games it matched on my computer, one event each.

don't know: where those 5 names came from. running, installed, or launched before.

---

### 2. the setting

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

and it doesn't stop when you close the window. i hid it and didn't touch it for 30 minutes:

```
20:05:09  POST /api/v9/science
20:10:09  POST /api/v9/science
20:15:09  POST /api/v9/science
20:18:40  POST /api/v9/beaker
20:20:09  POST /api/v9/science
20:25:09  POST /api/v9/science
20:30:09  POST /api/v9/science
```

every 5 minutes, on the second. timeline: [`examples/idle-30min-timeline.md`](examples/idle-30min-timeline.md). every captured event and field, redacted: [`examples/what-it-sent.md`](examples/what-it-sent.md).

---

### 3. your email, to a different company

discord already has your email. that's fine.

but when discord crashes, the report goes to sentry.io, a separate company. it carries your email, user id and username.

on mac and linux it sends 100% of crashes.

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

### watch it yourself

[`netlog/HOWTO.md`](netlog/HOWTO.md): see when it sends (chromium's own network log), and what's inside (a local-only debug port and a listener). no proxy, no certificates, nothing installed.

### what i don't know

- what discord's servers do with events after you turn the setting off. the client can't show that.
- where the 5 game names at launch came from.
- what `executable_fingerprint` is made of. that's native code.

### if you post your own output

- `verify.mjs` output has no personal info. still read it first.
- never post a raw net log or a raw `.har`. they have your ids in them. post `summarize.mjs` / `bodies.mjs` output only.
- never post anything from `Local Storage`, `Cookies`, or `sentry/scope_v3.json` values. your token and email live there.

### tested on

| | |
| --- | --- |
| desktop | 0.0.415, 0.0.416 (macOS) |
| web builds | 634304, 638651, 640102 |
| `core.asar` 0.0.416 sha256 | `27aacaa590e9511bf3c70f545fe735a7a695612a88b1c3a78739779ff2ceab47` |

`node verify.mjs --save` writes your own receipts (snippets + sha256 of every file read) to `receipts/`.

a ✗ usually means discord shipped a new build and the code moved. open an issue with your build number and output.
