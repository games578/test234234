X TRACKER PROXY
================
The X Tracker works without this for: the token's linked X account/website and the "Search on X" buttons.
Live mentions need an X API token, and X now bills per post read (check your Developer Console for current rates).
Your token stays on YOUR computer in this proxy - never in the browser bookmark.

1. Create an app at developer.x.com, add credits, copy the Bearer Token.
2. Run:   X_BEARER_TOKEN=your_token python3 server.py
   (Windows PowerShell:  $env:X_BEARER_TOKEN="your_token"; python server.py)
3. In the Rexora panel: Settings > X proxy URL = http://localhost:8787
4. Open the X Tracker, press "Load recent mentions".

Spend controls: each press fetches the 20 newest posts; identical searches are cached 30s;
the proxy refuses more than 30 searches/hour (change with MAX_REQUESTS_PER_HOUR).
