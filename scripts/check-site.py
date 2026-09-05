"""Behavior regression checks against dist; no messages are sent."""
import functools
import http.server
import json
from pathlib import Path
import sys
import threading
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tmp-tools'))
from playwright.sync_api import sync_playwright, expect

ROUTES = ['/', '/about', '/services', '/services/road-freight', '/services/project-cargo', '/services/customized-solutions', '/branch-network', '/industries', '/careers', '/contact', '/social-coming-soon']
class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlparse(self.path).path
        if path.rstrip('/') in [r.rstrip('/') for r in ROUTES]:
            self.path='/index.html'
        elif not Path(self.translate_path(self.path)).is_file():
            self.send_response(404)
            self.send_header('Content-Type','text/html')
            self.end_headers()
            self.wfile.write((ROOT/'dist/404.html').read_bytes())
            return
        try: super().do_GET()
        except (ConnectionResetError, BrokenPipeError): pass
    def log_message(self,*args): pass

server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(ROOT/'dist')))
threading.Thread(target=server.serve_forever,daemon=True).start()
base=f'http://127.0.0.1:{server.server_port}'
checks=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',headless=True)
    for width in [1440,390]:
        context=browser.new_context(viewport={'width':width,'height':900 if width==1440 else 844})
        page=context.new_page()
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.route('https://maps.google.com/**',lambda route:route.abort())
        for route in ROUTES:
            response=page.goto(base+route,wait_until='load')
            expect(page.locator('h1')).to_have_count(1)
            for y in range(0,page.evaluate('document.body.scrollHeight'),650):
                page.evaluate('(y)=>window.scrollTo({top:y,behavior:"instant"})',y)
                page.wait_for_timeout(80)
            page.wait_for_timeout(500)
            page.locator('img').evaluate_all("async images=>{images.forEach(i=>i.loading='eager');await Promise.all(images.map(i=>i.decode().catch(()=>{})))}")
            broken=page.locator('img').evaluate_all('(images)=>images.filter(i=>!i.complete || !i.naturalWidth).map(i=>i.src)')
            assert not broken,(route,broken)
            assert not page.evaluate('document.documentElement.scrollWidth>innerWidth'),(width,route,'overflow')
            page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
            page.screenshot(path=str(ROOT/'.audit'/f'page-{width}-{route.strip("/").replace("/","-") or "home"}.png'))
            checks.append(f'{width}px {route}: heading, layout and images pass')
        page.goto(base+'/branch-network?branch=hyderabad')
        expect(page.locator('.branch-panel__city')).to_have_text('Hyderabad')
        page.locator('.footer__branch-list').get_by_role('link',name='Vapi',exact=True).click()
        expect(page.locator('.branch-panel__city')).to_have_text('Vapi')
        page.get_by_role('button',name='Karnataka',exact=False).first.click()
        expect(page.locator('.branch-panel__city')).to_have_text('Basavakalyan')
        checks.append(f'{width}px branch links and filtering pass')
        page.goto(base+'/industries#healthcare')
        page.wait_for_timeout(1000)
        assert abs(page.locator('#healthcare').evaluate('e=>e.getBoundingClientRect().top')-100)<80
        checks.append(f'{width}px lazy route hash navigation passes')
        page.goto(base+'/contact')
        opener=page.locator('.header__actions').get_by_role('button',name='Request a Quote') if width==1440 else page.get_by_role('button',name='Open menu',exact=True)
        opener.click()
        if width==390: page.get_by_role('dialog',name='Navigation menu').get_by_role('button',name='Request a Quote').click()
        dialog=page.get_by_role('dialog',name='Request a quote')
        expect(dialog).to_be_visible()
        dialog.get_by_role('button',name='Prepare quote email').click()
        assert dialog.locator('[aria-invalid="true"]').count()==5
        for label,value in [('Full name','Website QA'),('Email','qa@example.com'),('Contact number','9876543210')]: dialog.get_by_label(label).fill(value)
        dialog.get_by_label('Origin').select_option('Ahmedabad')
        dialog.get_by_label('Destination').select_option('Hyderabad')
        dialog.get_by_role('button',name='Prepare quote email').click()
        expect(dialog.get_by_role('link',name='Open email draft')).to_have_attribute('href',__import__('re').compile('mailto:.*subject=.*'))
        assert 'Nothing has been sent yet' in dialog.inner_text()
        dialog.get_by_role('button',name='Edit details').click()
        expect(dialog.get_by_label('Full name')).to_have_value('Website QA')
        ids=page.locator('[id]').evaluate_all('(els)=>els.map(e=>e.id)')
        assert len(ids)==len(set(ids)),'duplicate IDs'
        page.keyboard.press('Shift+Tab')
        assert dialog.evaluate('e=>e.contains(document.activeElement)')
        page.keyboard.press('Escape')
        expect(dialog).not_to_be_visible()
        expect(opener).to_be_focused()
        checks.append(f'{width}px quote validation, email draft, edit, focus and Escape pass')
        for route,button in [('/contact','Prepare enquiry email'),('/careers','Prepare application email')]:
            page.goto(base+route)
            form=page.locator('form')
            form.get_by_role('button',name=button).click()
            assert form.locator('[aria-invalid="true"]').count()==4
            for label,value in [('Full name','Website QA'),('Email','qa@example.com'),('Contact number','9876543210')]: form.get_by_label(label,exact=False).fill(value)
            if route=='/contact': form.locator('[name=message]').fill('QA only; this draft is not sent.')
            else: form.get_by_label('Role applied for').select_option('General application')
            form.get_by_role('button',name=button).click()
            expect(page.get_by_role('link',name='Open email draft')).to_be_visible()
        checks.append(f'{width}px contact and application validation and drafts pass')
        for label in ['LinkedIn','Facebook','Instagram','YouTube']:
            link=page.get_by_role('link',name=label,exact=True)
            expect(link).to_have_attribute('href','/social-coming-soon')
            expect(link).to_have_attribute('target','_blank')
        with page.expect_popup() as popup:
            page.get_by_role('link',name='LinkedIn',exact=True).click()
        expect(popup.value.get_by_role('heading',level=1)).to_contain_text('coming soon')
        popup.value.close()
        checks.append(f'{width}px all social destinations and new tab pass')
        response=page.goto(base+'/does-not-exist')
        assert response.status==404
        expect(page.get_by_role('heading',level=1)).to_have_text('Page not found.')
        checks.append(f'{width}px direct 404 and recovery links pass')
        if width==390:
            page.goto(base)
            page.get_by_role('button',name='Open menu',exact=True).click()
            expect(page.get_by_role('dialog',name='Navigation menu')).to_be_visible()
            page.keyboard.press('Escape')
            expect(page.get_by_role('dialog',name='Navigation menu')).not_to_be_visible()
            page.get_by_role('button',name='Open menu',exact=True).click()
            page.get_by_role('dialog').get_by_role('button',name='Request a Quote').click()
            expect(page.get_by_role('dialog',name='Request a quote')).to_be_visible()
            page.wait_for_timeout(400)
            page.keyboard.press('Escape')
            page.wait_for_timeout(400)
            assert page.evaluate('document.body.style.overflow')!='hidden'
            checks.append('Mobile menu, quote handoff and scroll unlock pass')
        assert not errors, errors
        context.close()
    # Explicit accessibility/data-saving preferences must never download video.
    for preference in ['reduced-motion','save-data']:
        context=browser.new_context(reduced_motion='reduce' if preference=='reduced-motion' else 'no-preference')
        if preference=='save-data': context.add_init_script("Object.defineProperty(navigator,'connection',{value:{saveData:true,addEventListener(){},removeEventListener(){}}})")
        page=context.new_page(); video_requests=[]
        page.on('request',lambda r:video_requests.append(r.url) if '.mp4' in r.url else None)
        page.goto(base,wait_until='load'); page.wait_for_timeout(1000)
        assert not video_requests,video_requests
        checks.append(preference+': no video request')
        context.close()
    # Force a failed route chunk to exercise the error boundary.
    context=browser.new_context(); page=context.new_page(); page.goto(base,wait_until='load')
    page.route('**/assets/*.js',lambda route:route.abort())
    page.locator('.nav').get_by_role('link',name='About',exact=True).click()
    expect(page.get_by_role('heading',level=1)).to_have_text('This page could not load.')
    expect(page.get_by_role('button',name='Try again')).to_be_visible()
    checks.append('Failed lazy chunk shows recovery screen')
    context.close(); browser.close()
server.shutdown()
(ROOT/'reports/functional-checks.json').write_text(json.dumps({'passed':checks},indent=2))
print(json.dumps(checks,indent=2))
