#!/usr/bin/env python3
"""Rexora X proxy - keeps your X API token out of the browser and caps your spend.

Run:   X_BEARER_TOKEN=your_token python3 server.py     (Windows PowerShell: $env:X_BEARER_TOKEN="..."; python server.py)
Then:  in the Rexora panel > Settings, X proxy URL = http://localhost:8787

X bills per post read, so this proxy (1) caches identical searches for 30s and
(2) refuses more than MAX_REQUESTS_PER_HOUR searches per hour (default 30).
"""
import json, os, time, urllib.request, urllib.parse, urllib.error
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

TOKEN = os.environ.get('X_BEARER_TOKEN', '')
BASE = os.environ.get('X_API_BASE', 'https://api.x.com')
PORT = int(os.environ.get('PORT', '8787'))
MAX_PER_HOUR = int(os.environ.get('MAX_REQUESTS_PER_HOUR', '30'))
ORIGINS = {'https://trade.padre.gg'} | set(filter(None, os.environ.get('ALLOW_ORIGINS', '').split(',')))
cache, hits = {}, []

class H(BaseHTTPRequestHandler):
    def _cors(self):
        o = self.headers.get('Origin', '')
        if o in ORIGINS:
            self.send_header('Access-Control-Allow-Origin', o)
            self.send_header('Access-Control-Allow-Private-Network', 'true')
            self.send_header('Access-Control-Allow-Methods', 'GET')
            self.send_header('Access-Control-Allow-Headers', '*')
            self.send_header('Vary', 'Origin')
    def _send(self, code, obj):
        b = json.dumps(obj).encode()
        self.send_response(code); self.send_header('Content-Type', 'application/json'); self._cors()
        self.send_header('Content-Length', str(len(b))); self.end_headers(); self.wfile.write(b)
    def do_OPTIONS(self):
        self.send_response(204); self._cors(); self.end_headers()
    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if u.path != '/search': return self._send(404, {'error': 'not found'})
        if not TOKEN: return self._send(500, {'error': 'X_BEARER_TOKEN is not set on the proxy'})
        qs = urllib.parse.parse_qs(u.query)
        q = qs.get('q', [''])[0][:400]
        try: n = max(10, min(100, int(qs.get('n', ['20'])[0])))
        except ValueError: n = 20
        if not q: return self._send(400, {'error': 'missing q'})
        key = (q, n); hit = cache.get(key)
        if hit and time.time() - hit[0] < 30: return self._send(200, hit[1])
        now = time.time(); hits[:] = [t for t in hits if now - t < 3600]
        if len(hits) >= MAX_PER_HOUR:
            return self._send(429, {'error': 'hourly request cap reached (%d). Raise MAX_REQUESTS_PER_HOUR if you want more.' % MAX_PER_HOUR})
        hits.append(now)
        url = BASE + '/2/tweets/search/recent?' + urllib.parse.urlencode({
            'query': q + ' -is:retweet', 'max_results': n,
            'tweet.fields': 'created_at,public_metrics,author_id', 'expansions': 'author_id', 'user.fields': 'username'})
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'Authorization': 'Bearer ' + TOKEN}), timeout=10) as r:
                d = json.load(r)
        except urllib.error.HTTPError as e:
            return self._send(e.code, {'error': 'X API returned %d (check token, credits and rate limits)' % e.code})
        except Exception:
            return self._send(502, {'error': 'could not reach the X API'})
        users = {x['id']: x['username'] for x in d.get('includes', {}).get('users', [])}
        out = {'tweets': [{'text': t['text'], 'author': users.get(t.get('author_id'), '?'), 'created_at': t['created_at'],
                           'likes': t.get('public_metrics', {}).get('like_count', 0)} for t in d.get('data', [])]}
        cache[key] = (now, out); self._send(200, out)
    def log_message(self, *a): pass

if __name__ == '__main__':
    print('Rexora X proxy on http://127.0.0.1:%d  (cap %d searches/hour)' % (PORT, MAX_PER_HOUR))
    ThreadingHTTPServer(('127.0.0.1', PORT), H).serve_forever()
