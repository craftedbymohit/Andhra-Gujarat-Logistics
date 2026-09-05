"""Generate delivery copies, retaining original media. Requires Pillow and imageio-ffmpeg."""
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tmp-tools'))
from PIL import Image, ImageOps
import imageio_ffmpeg

OUT = ROOT / 'assets' / 'optimized'
OUT.mkdir(exist_ok=True)
records = []
source = '\n'.join(p.read_text(encoding='utf-8') for p in (ROOT / 'src').rglob('*') if p.suffix in ('.jsx', '.js', '.css'))
manifest = ROOT / 'reports' / 'media-optimization.json'
if manifest.exists():
    source += '\n' + '\n'.join(item['source'] for item in json.loads(manifest.read_text()))
for path in (ROOT / 'assets').iterdir():
    if not path.is_file() or path.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif'):
        continue
    if path.name not in source:
        continue
    image = ImageOps.exif_transpose(Image.open(path))
    image.thumbnail((400, 400) if 'logo' in path.stem.lower() else (1280, 1280), Image.Resampling.LANCZOS)
    target = OUT / (path.stem + '.webp')
    image.save(target, 'WEBP', quality=82, method=6)
    if target.stat().st_size >= path.stat().st_size:
        target.unlink()
        continue
    records.append({'source': path.name, 'output': target.name, 'before': path.stat().st_size, 'after': target.stat().st_size, 'width': image.width, 'height': image.height})
    for file in (ROOT / 'src').rglob('*'):
        if file.suffix not in ('.jsx', '.js', '.css'):
            continue
        text = file.read_text(encoding='utf-8')
        updated = text.replace('assets/' + path.name, 'assets/optimized/' + target.name)
        if updated != text:
            file.write_text(updated, encoding='utf-8')

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video = ROOT / 'assets' / 'agl_hero_vid.mp4'
for name, width, crf in [('hero-desktop.mp4', 1280, '28'), ('hero-mobile.mp4', 640, '30')]:
    target = OUT / name
    subprocess.run([ffmpeg, '-y', '-i', str(video), '-an', '-vf', f'scale={width}:-2,fps=24', '-c:v', 'libx264', '-preset', 'slow', '-crf', crf, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target)], check=True)
    records.append({'source': video.name, 'output': name, 'before': video.stat().st_size, 'after': target.stat().st_size})
subprocess.run([ffmpeg, '-y', '-ss', '0', '-i', str(video), '-frames:v', '1', '-vf', 'scale=1280:-2', str(OUT / 'hero-poster.png')], check=True)
poster = Image.open(OUT / 'hero-poster.png')
poster.save(OUT / 'hero-poster.webp', 'WEBP', quality=82, method=6)
(OUT / 'hero-poster.png').unlink()
(ROOT / 'reports' / 'media-optimization.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
print(json.dumps(records, indent=2))
