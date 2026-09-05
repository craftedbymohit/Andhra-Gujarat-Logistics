# Andhra Gujarat Logistic

React website built with Vite. Use Node.js 22.12+ (Node 24 was used for verification).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The production output is `dist/`. Vercel and Netlify configurations route known
pages to the React app and return `404.html` with HTTP 404 for unknown URLs.
Fingerprint-named assets are cached for one year. Verify these hosting rules on
the deployed domain; the local development server uses its own SPA fallback.

All four social icons open `/social-coming-soon` in a new tab. Replace their URLs
in `src/constants/company.js` when official accounts are available.

Contact, quote and application forms validate locally and prepare an email draft.
The visitor must open their email app and send it. The website does not claim
delivery or store submissions; a backend/mail service is needed for automatic
submission. Business contacts, service claims and testimonial approval should be
confirmed with the client before publication.

The original client video and images are active. The branded loader appears on startup and normal button/link clicks (1.5 seconds plus its fade). Earlier compression measurements in `reports/` are historical. Only imported assets enter `dist/`.
See `assets/README.md` for regeneration and font licensing.

## Verification

```sh
node scripts/check-source.mjs
npm audit
python -m pip install playwright
python scripts/check-site.py
python scripts/audit-site.py final --measure-only
python scripts/audit-site.py final --measure-only --gzip
```

Browser scripts use installed Windows Chrome and an ephemeral localhost server.
They never send enquiries. Test results are saved in `reports/`; screenshots and
temporary tooling are ignored in `.audit/` and `.tmp-tools/`.
Baseline comparisons require the pre-change build at `.audit/baseline/`.
