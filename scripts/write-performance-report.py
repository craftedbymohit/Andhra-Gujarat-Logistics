"""Summarize measured evidence without inventing a Lighthouse score."""
import json
from pathlib import Path
from statistics import median

ROOT = Path(__file__).resolve().parents[1]
R = ROOT / 'reports'
read = lambda name: json.loads((R / name).read_text(encoding='utf-8-sig'))
bundle = read('bundle-comparison.json')
checks = read('functional-checks.json')['passed']
source = read('source-checks.json')
media = read('media-optimization.json')
def pct(before, after): return f'{(1-after/before)*100:.1f}%'
rows=[]
for label,key in [('Complete build (all routes and both video variants)','totalBuildBytes'),('Initial JavaScript, gzip','initialJavascriptGzipBytes'),('Images in production','imageBytes'),('Stylesheets, uncompressed','cssBytes')]:
    a,b=bundle['before'][key],bundle['after'][key]
    rows.append(f'| {label} | {a/1000:,.1f} KB | {b/1000:,.1f} KB | {pct(a,b)} |')
for filename,label in [('hero-desktop.mp4','Desktop hero video'),('hero-mobile.mp4','Mobile hero video')]:
    item=next(i for i in media if i['output']==filename)
    rows.append(f"| {label} | {item['before']/1000000:.2f} MB | {item['after']/1000000:.2f} MB | {pct(item['before'],item['after'])} |")
measurements=[]
for suffix,label in [('-gzip','Gzip delivery'),('','Uncompressed delivery')]:
    if not (R/f'final{suffix}-browser-audit.json').exists(): continue
    before=read(f'baseline{suffix}-browser-audit.json')['measurements']
    after=read(f'final{suffix}-browser-audit.json')['measurements']
    for device in ['desktop','mobile']:
        a=[x for x in before if x['device']==device];b=[x for x in after if x['device']==device]
        for key,metric in [('fcp','First contentful paint'),('lcp','Largest contentful paint'),('longTasks','Observed long-task blocking')]:
            av,bv=median(x[key] for x in a),median(x[key] for x in b)
            measurements.append(f'| {label}, {device} | {metric} | {av/1000:.3f} s | {bv/1000:.3f} s |')
report=f'''# AGL website performance and review report

Prepared 5 September 2026. Status: production build and local browser checks pass. Changes are in the workspace; no deployment was performed.

The complete production build is **{pct(bundle['before']['totalBuildBytes'],bundle['after']['totalBuildBytes'])} smaller**, and initial gzip-compressed JavaScript is **{pct(bundle['before']['initialJavascriptGzipBytes'],bundle['after']['initialJavascriptGzipBytes'])} smaller**. The deliberate 1,500 ms wait plus 320 ms fade on startup and every button/link click has been removed. A loader remains only for genuinely pending page code.

## Asset size results

Decimal units: 1 KB = 1,000 bytes; 1 MB = 1,000,000 bytes. Build size is not the amount downloaded by a single visitor.

| Item | Before | After | Reduction |
| --- | ---: | ---: | ---: |
{chr(10).join(rows)}

The hero has a 31.4 KB poster, so its visible background does not depend on the video download. Both video variants retain the full original clip and use 24 fps H.264, no audio, and fast-start MP4 metadata. Phones select the 640 px version; desktop selects 1280 px. Reduced-motion, data-saving, and reported slow connections use the poster without video. Playback pauses outside the viewport or in a hidden tab; visitors can pause it manually.

Images are converted to smaller WebP copies only when conversion saves bytes. Existing smaller JPEG/AVIF files are retained. Below-the-fold images use lazy loading and asynchronous decoding. The map fell from 860.5 KB to 28.8 KB; the Vital logo fell from 566.4 KB to 2.3 KB. Original client media is retained for editing and excluded from delivery unless imported.

## Browser measurements

Median of three fresh-browser-context home-page visits per device and delivery mode. Chrome on Windows; desktop 1440 × 900 without throttling; mobile 390 × 844, 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 0.75 Mbps upload. Cache was disabled through Chrome DevTools. Each run was observed for eight seconds after DOMContentLoaded. Final performance runs were separate from functional testing.

| Delivery / device | Measurement | Before | After |
| --- | --- | ---: | ---: |
{chr(10).join(measurements)}

These are local lab observations, **not Lighthouse/PageSpeed scores or field Core Web Vitals**. Gzip was provided by the test server for HTML, CSS and JavaScript; the raw runs show the penalty when compression is absent. The baseline still requested Google Fonts; the optimized build serves fonts locally. OS caches and host activity can still affect timing.

“Observed long-task blocking” sums the portion beyond 50 ms of long tasks in the observation window; it is not Lighthouse TBT or INP. The old loader can itself count as painted content, so paint metrics alone do not represent the old delay before the page became usable. Incomplete video requests and cross-origin timing restrictions make transfer totals unsuitable as a full-page size comparison; use the asset table above. No real-user INP or live-domain measurements were collected.

## Bugs and maintenance fixes

- Removed artificial startup/click waits and route fade delays.
- Replaced the GSAP timeline and Lenis scroll loop with the existing Motion library and native scrolling; removed both dependencies.
- Fixed cross-route industry anchors and branch query links that previously retained the old selection.
- Fixed duplicate form IDs, associated field errors, validation focus, modal focus trapping, Escape handling, focus restoration and mobile-menu scroll locking.
- Replaced false “received” confirmations and console logging of personal data with explicit, editable email drafts. Visitors must send these from their email app; no automatic mail delivery is claimed.
- Added a dedicated social “Coming soon” page, with all four social icons opening it in a new tab.
- Retained the client-side 404 route, added a lightweight standalone 404 document and explicit hosting fallbacks, and added a recovery screen for route/render or lazy-chunk failures. Error pages are marked noindex.
- Removed unused SpecRows, FormSuccess, insights data, related styles, an unused import and obsolete router migration flags. Original design edits were preserved.
- Upgraded Vite to 7.3.6, its React plugin to 5.2.0 and React Router to 7.18.3; updated the lockfile. The final npm audit reported zero known vulnerabilities.
- Served existing brand fonts locally with font-display swap and preloads; added long-lived caching for fingerprinted production assets.

## Verification completed

- Production build passed; source parsing checked {source['sourceFiles']} JS/JSX/CSS files and {source['cssRules']} CSS rules, with no missing static imports/assets or unused imports.
- {len(checks)} browser check groups passed: all 11 routes at 1440 px and 390 px, images, horizontal overflow, branch filters, deep links, all three form drafts, validation, social links, keyboard focus, mobile menu, no-video preferences, and simulated lazy-chunk failure.
- No unexpected JavaScript exceptions occurred in the functional route checks. The deliberately failed chunk displayed the recovery page.
- Desktop and phone screenshots were reviewed; the video pause control was moved clear of the floating phone button.
- Git whitespace checks passed. No enquiries were sent during testing.

## Before publishing

1. Confirm the production host applies gzip/Brotli, cache headers, known-route rewrites and HTTP 404 for unknown URLs. Vercel and Netlify configurations are included; their deployed behavior is not proven by the local test server.
2. Connect a backend/mail service if forms must submit automatically. Current email drafts require a configured email app or manual emailing to the displayed address.
3. Verify business claims, contact details and testimonial approval with the client. Source comments flag testimonials for approval and company contact details for verification; this technical review cannot certify those business facts.
4. Run live-domain PageSpeed and real-device checks after deployment, including iPhone/Safari and slower networks. Instant loading on every connection cannot be guaranteed; compression, CDN distance, device speed and third-party Maps affect the experience.

## Evidence and reproduction

Evidence files in this folder: `bundle-comparison.json`, `media-optimization.json`, `baseline-browser-audit.json`, `final-browser-audit.json`, gzip browser audits, `functional-checks.json`, `source-checks.json`, and `dependency-audit.json`.

Run `npm run build`, `node scripts/check-source.mjs`, `python scripts/check-site.py`, and `python scripts/audit-site.py final --measure-only --gzip`. Browser scripts use installed Windows Chrome. Baseline reruns require the preserved pre-change build at `.audit/baseline`. See the repository README for setup and media regeneration.
'''
if 'assets/agl_hero_vid.mp4' in (ROOT/'src/components/hero/HomeHero.jsx').read_text(encoding='utf-8'):
    report = '> **Superseded:** Original media and the branded startup/click loader have been restored at the client request. Measurements below apply to the earlier compressed version, not the current website.\n\n' + report
(R/'performance-report.md').write_text(report,encoding='utf-8')
print('Wrote reports/performance-report.md')
