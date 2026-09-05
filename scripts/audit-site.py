"""Local Chromium measurements and functional checks. pip install playwright."""
import functools
import gzip
import http.server
import json
import pathlib
import sys
import threading

ROOT = pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tmp-tools'))
from playwright.sync_api import sync_playwright

class SPA(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        target = pathlib.Path(self.translate_path(self.path))
        if '--gzip' in sys.argv and target.is_file() and target.suffix in ('.html', '.css', '.js'):
            import io
            data = gzip.compress(target.read_bytes())
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(str(target)))
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            return io.BytesIO(data)
        return super().send_head()
    def do_GET(self):
        if not pathlib.Path(self.translate_path(self.path)).exists() and '.' not in self.path.split('/')[-1]:
            self.path = '/index.html'
        try: super().do_GET()
        except (ConnectionResetError, BrokenPipeError): pass
    def log_message(self, *args):
        pass

mode = sys.argv[1] if len(sys.argv) > 1 else 'final'
folder = ROOT / ('.audit/baseline' if mode == 'baseline' else 'dist')
server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(SPA, directory=str(folder)))
threading.Thread(target=server.serve_forever, daemon=True).start()
base = f'http://127.0.0.1:{server.server_port}'
results = {'mode': mode, 'compression': 'gzip' if '--gzip' in sys.argv else 'none', 'measurements': [], 'checks': []}
observer = """window.audit={lcp:0,cls:0,longTasks:0};
new PerformanceObserver(l=>l.getEntries().forEach(e=>window.audit.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.audit.cls+=e.value})).observe({type:'layout-shift',buffered:true});
new PerformanceObserver(l=>l.getEntries().forEach(e=>window.audit.longTasks+=Math.max(0,e.duration-50))).observe({type:'longtask',buffered:true});"""
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    for mobile in [False, True]:
      for run in range(3):
        context = browser.new_context(viewport={'width':390 if mobile else 1440, 'height':844 if mobile else 900}, device_scale_factor=1, is_mobile=mobile)
        page = context.new_page()
        page.add_init_script(observer)
        cdp = context.new_cdp_session(page)
        cdp.send('Network.enable')
        cdp.send('Network.setCacheDisabled', {'cacheDisabled':True})
        if mobile:
            cdp.send('Network.emulateNetworkConditions', {'offline':False,'latency':150,'downloadThroughput':200000,'uploadThroughput':93750})
            cdp.send('Emulation.setCPUThrottlingRate', {'rate':4})
        page.goto(base, wait_until='domcontentloaded', timeout=90000)
        page.wait_for_timeout(8000)
        metrics = page.evaluate("""({...window.audit, fcp:performance.getEntriesByName('first-contentful-paint')[0]?.startTime, resources:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0), loader:!!document.querySelector('.page-loader'), overflow:document.documentElement.scrollWidth>innerWidth})""")
        metrics.update({'device':'mobile' if mobile else 'desktop','run':run+1})
        results['measurements'].append(metrics)
        if run == 0:
            page.screenshot(path=str(ROOT / '.audit' / f'{mode}-{metrics["device"]}.png'))
        context.close()
    if mode == 'final' and '--measure-only' not in sys.argv:
        context = browser.new_context(viewport={'width':1440,'height':900})
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.route('https://maps.google.com/**', lambda route: route.abort())
        for route in ['/', '/about','/services','/services/road-freight','/services/project-cargo','/services/customized-solutions','/branch-network','/industries','/careers','/contact','/social-coming-soon','/missing-page']:
            page.goto(base+route, wait_until='load')
            page.locator('h1').wait_for()
            results['checks'].append({'route':route,'heading':page.locator('h1').inner_text(),'overflow':page.evaluate('document.documentElement.scrollWidth>innerWidth')})
        results['errors'] = errors
        context.close()
    browser.close()
server.shutdown()
suffix = '-gzip' if '--gzip' in sys.argv else ''
(ROOT / 'reports' / f'{mode}{suffix}-browser-audit.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print(json.dumps(results, indent=2))
