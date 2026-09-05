"""Fetch the existing Google Fonts Latin variable fonts for same-origin delivery."""
from pathlib import Path
import re
from urllib.request import Request, urlopen

root = Path(__file__).resolve().parents[1]
out = root / 'assets' / 'fonts'
out.mkdir(exist_ok=True)
css = []
agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
for name, query, weights in [('Manrope','Manrope:wght@400..800','400 800'),('Inter','Inter:wght@400..600','400 600'),('Space Grotesk','Space+Grotesk:wght@500..700','500 700')]:
    request = Request('https://fonts.googleapis.com/css2?family='+query+'&display=swap', headers={'User-Agent':agent})
    remote = urlopen(request).read().decode()
    block = remote.split('/* latin */')[-1]
    url = re.search(r'url\(([^)]+)\)', block).group(1)
    filename = name.lower().replace(' ','-')+'.woff2'
    (out / filename).write_bytes(urlopen(url).read())
    css.append(f"@font-face {{ font-family: '{name}'; font-style: normal; font-weight: {weights}; font-display: swap; src: url('../../assets/fonts/{filename}') format('woff2'); }}")
(root / 'src/styles/fonts.css').write_text('\n'.join(css)+'\n')
print('Downloaded', [p.name for p in out.iterdir()])
