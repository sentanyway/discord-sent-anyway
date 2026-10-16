# watch it yourself

discord is electron, so it understands chromium's own network logging flag. nothing to install, no proxy, nothing intercepted. you get urls, methods and times. no bodies, no cookies, no auth headers.

### mac

1. quit discord completely (cmd+q, check the menu bar).
2. start it with logging on:
   ```
   /Applications/Discord.app/Contents/MacOS/Discord --log-net-log="$HOME/discord-netlog.json" --net-log-capture-mode=Default
   ```
3. let it load. note the time. close the window (it keeps running in the background).
4. don't touch it for 30 minutes.
5. quit discord (cmd+q). the log is finished when discord exits.
6. summarize:
   ```
   node netlog/summarize.mjs ~/discord-netlog.json --from 20:02
   ```
   use the time you closed the window plus a minute or two.

if discord updates itself on launch, it restarts without the flag. quit and do step 2 again.

### windows (untested)

```
%LOCALAPPDATA%\Discord\Update.exe --processStart Discord.exe --process-start-args "--log-net-log=%USERPROFILE%\discord-netlog.json --net-log-capture-mode=Default"
```

### before you post

- post the `summarize.mjs` output, never `discord-netlog.json` itself. the raw log has your server, channel and user ids in urls.
- the summary strips ids, query strings, the beacon nonce and your locale. read it anyway.
- delete `discord-netlog.json` when you're done.

---

# see what's inside (bodies)

the net log above shows *when*. this shows *what*. same idea: no proxy, no certificate, nothing installed. discord gets a debug port that only listens on your own machine, and a small script reads the analytics requests as they go out.

### mac

1. quit discord completely (cmd+q).
2. start it with a local-only debug port:
   ```
   /Applications/Discord.app/Contents/MacOS/Discord --remote-debugging-port=9229 --remote-debugging-address=127.0.0.1
   ```
3. as soon as the window appears, start listening (6 minutes):
   ```
   node netlog/capture.mjs 380 capture.har
   ```
4. hide the window (cmd+h) and don't touch it.
5. when it says `wrote N entries`, read it:
   ```
   node netlog/bodies.mjs capture.har > what-it-sent.md
   ```
6. **quit discord and open it normally again.** don't leave the debug port running.

`capture.mjs` drops auth headers, cookies, fingerprint and installation id before writing. `bodies.mjs` also strips ids, uuids, the analytics token, emails, ips, and game/app names.

### before you post

- post `what-it-sent.md`, never `capture.har`. the har still has ids and the analytics token in it.
- read it first. counts (friends, servers, dms) are left in.
- delete `capture.har` when you're done.
