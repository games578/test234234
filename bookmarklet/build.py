# Rebuild bookmarklet.txt after editing rexora-scan.src.js
# Needs: pip install pillow (no), npm i -g terser
import base64, subprocess, urllib.parse
src = open('rexora-scan.src.js', encoding='utf-8').read()
logo = 'data:image/png;base64,' + base64.b64encode(open('logo48.png', 'rb').read()).decode()
open('rexora-scan.js', 'w', encoding='utf-8').write(src.replace('__LOGO__', logo))
subprocess.run('npx terser rexora-scan.js -c -m -o rexora-scan.min.js', shell=True, check=True)
code = open('rexora-scan.min.js', encoding='utf-8').read().strip()
open('bookmarklet.txt', 'w').write('javascript:' + urllib.parse.quote(code, safe="()!*'~.-_"))
print('bookmarklet.txt rebuilt - re-paste it into your bookmark (and into index.html launcher href)')
