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
