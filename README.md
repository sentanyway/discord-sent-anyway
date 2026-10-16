# sent anyway

i turned off discord's privacy settings.

it didn't matter.

```
git clone https://github.com/sentanyway/discord-sent-anyway
cd discord-sent-anyway
node verify.mjs
```

check your own install. one minute. read-only.

---

### every game you open

activity status: off.

discord reports every game you open anyway.

the file path on your computer. a fingerprint of the file. your server ids. the voice channel you're in.

your "off" gets sent along with it.

sent anyway.

```js
$.default.track(K.HAw.LAUNCH_GAME,{
  activity_status_enabled:eD.tz.getSetting(),
  activity_status_shared_guilds:s,
  executable_path:T,
  voice_channel_id:l, voice_channel_guild_id:c,
  executable_fingerprint:f??t.executableFingerprint})
```

i opened discord. it sent the names of 5 games on my computer before i clicked anything.

`node verify.mjs launch_game`

---

### the setting

"use data to improve discord": off.

the app never checks it.

i closed the window and didn't touch it for 30 minutes.

```
20:05:09  POST /api/v9/science
20:10:09  POST /api/v9/science
20:15:09  POST /api/v9/science
20:18:40  POST /api/v9/beaker
20:20:09  POST /api/v9/science
20:25:09  POST /api/v9/science
20:30:09  POST /api/v9/science
```

every 5 minutes. on the second.

the toggle appears 23 times in the code. all 23 are the settings screen. zero are in the code that sends.

sent anyway.

```js
// the entire job of the toggle
onConfirm:()=>(0,IX.U)([],[A.YAq.USAGE_STATISTICS])
```

`node verify.mjs consent`

---

### your email

discord crashes. your email, user id and username go to sentry.io.

a different company.

every crash. no setting. no opt-out.

and a copy sits on your disk.

sent anyway.

```js
sampleRate: ... IS_LINUX||processUtils.IS_OSX?1: ...
let user=additionalMetadata.sentry?.user;null!=user&&sentry.setUser(user)
```

`node verify.mjs sentry`

---

receipts: [`examples/what-it-sent.md`](examples/what-it-sent.md) · [`examples/idle-30min-timeline.md`](examples/idle-30min-timeline.md) · watch it yourself: [`netlog/HOWTO.md`](netlog/HOWTO.md)

don't know: what discord's servers do with it after.

<sub>verify.mjs reads discord's own code from your install. it never opens your token, cookies or messages. node 18+, macOS tested. never post a raw net log or .har, they have your ids in them. tested on discord 0.0.416, core.asar sha256 27aacaa590e9511bf3c70f545fe735a7a695612a88b1c3a78739779ff2ceab47.</sub>
