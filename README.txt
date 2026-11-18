REXORA PRO — everything in one zip
===================================
index.html, css/, js/, images/    the website (original design, plain HTML/CSS/JS, no build step, no dependencies)
bookmarklet/bookmarklet.txt       the Rexora Pro bookmark (paste as a bookmark's URL)
bookmarklet/rexora-scan.src.js    readable source of the bookmark (edit this, then run build.py)
x-proxy/server.py                 optional local proxy for live X mentions (see x-proxy/README.txt)

RUN THE SITE
  Open index.html in a browser, or upload the folder to any static host.

INSTALL THE BOOKMARK
  Easiest: on the site, open "Try Rexora Pro" and drag the Activate button to the bookmarks bar.
  Manual: right-click bookmarks bar > Add page > paste bookmarklet.txt into the URL field.
  Then open a token chart on trade.padre.gg and click it.

WHAT WORKS TODAY
  Scan         token analysis from public market data + risk flags (estimates, not advice)
  AI Trader    PAPER mode works. Real-money mode is NOT connected: it never places a trade.
  X Tracker    linked X account + search shortcuts; live mentions need the x-proxy and an X API token
  Settings     opacity, size, refresh, sound, confirm trades, avatars, compact tape, autosave
  Alerts, Fomo Tracker, Rexora Radar   show "Soon"

AFTER EDITING THE BOOKMARK SOURCE
  cd bookmarklet && python3 build.py     (needs terser: npm i -g terser)
  then paste the new bookmarklet.txt into your bookmark, and into the #launcher href in index.html.
