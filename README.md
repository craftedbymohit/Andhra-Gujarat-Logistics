# Andhra Gujarat Logistics

Corporate website for Andhra Gujarat Logistics — positioned as a **regional transportation
infrastructure brand**, not a truck-hire company. Ten pages, React 18 + Vite.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

---

## Before going live — replace these placeholders

Everything a client needs to change lives in **two folders**. No component edits required.

| What | File |
|---|---|
| Phone, email, address, hours, socials, KPI numbers, announcement ticker | `src/constants/company.js` |
| Branches — address, manager, phone, industrial belt, lat/lng | `src/data/branches.js` |
| Services & the 7-stage process | `src/data/services.js` |
| Industry verticals | `src/data/industries.js` |
| About: story, values, milestones, leadership, safety, CSR | `src/data/company.js` |
| Fleet types and lane transit times | `src/data/fleet.js` |
| Testimonials and client names | `src/data/testimonials.js` |
| FAQs | `src/data/faqs.js` |
| Careers: culture, benefits, openings | `src/data/careers.js` |
| Long-form service page content | `src/data/serviceDetails.js` |

**Specifically still placeholder:**

- All phone numbers, email addresses and the Ahmedabad HQ address (`company.js`)
- Branch manager names and direct numbers (`branches.js`)
- Testimonials — currently role-attributed, not name-attributed. Get written client approval
  before publishing quotes.
- KPI figures (98% on-time, 500+ clients, etc.) — confirm these are defensible.
- Gallery tiles are CSS placeholders; drop in real photography.
- Chairman's portrait is an initials block.
- Social links point to `#`.

### Wiring up the forms

All three forms validate client-side and then call a stubbed `onSubmit`. Point them at a real
endpoint — each is marked with a `TODO`:

- `src/components/forms/QuoteForm.jsx`
- `src/components/forms/ContactForm.jsx`
- `src/components/forms/ApplicationForm.jsx`

Shared validation lives in `src/hooks/useForm.js`.

---

## Architecture

```
src/
├── app/          QuoteContext — global "Request a Quote" modal state
├── routes/       route table (Home eager, all other pages lazy)
├── layouts/      MainLayout, Header, Footer, AnnouncementBar
├── pages/        10 pages + 404
├── components/   hero, navigation, sections, cards, maps, timeline,
│                 counters, testimonials, forms, animations, buttons,
│                 loaders, modals, shared
├── hooks/        useLenis, useForm, useScrolled, usePageMeta
├── data/         all copy and business data
├── constants/    company details, navigation
├── utils/        cn, projection (lat/lng -> SVG)
└── styles/       tokens -> base -> utilities -> components -> layout -> sections -> pages
```

### The India map

`src/data/branches.js` stores real `lat`/`lng`. `src/utils/projection.js` converts them to SVG
coordinates against a fixed bounding box (68–98°E, 7.5–37.5°N). **Adding a branch to the data file
places it on the map automatically** — no coordinate maths needed. `NETWORK_LANES` draws the
animated corridors between hub pairs.

### Design system

All colour, type, spacing, radius, shadow and easing values are CSS custom properties in
`src/styles/tokens.css`. Change a token once and it propagates site-wide. No Tailwind, no CSS-in-JS.

### Animation

Deliberately restrained — motion is used where it carries meaning, not everywhere.

| Library | Used for |
|---|---|
| **GSAP** | Hero entrance timeline; process-timeline rail draw (ScrollTrigger) |
| **Framer Motion** | Scroll reveals, route transitions, accordion, modal, mobile menu |
| **Lenis** | Smooth scrolling (also handles `#hash` anchors, which it otherwise intercepts) |
| **react-countup** | KPI counters, triggered by Framer's `useInView` |
| CSS | Grid drift, marquee, map node pulse, SVG `animateMotion` truck |

Everything is disabled under `prefers-reduced-motion: reduce`.

---

## Deployment

`vercel.json` and `public/_redirects` are included. Both do the same thing: rewrite all paths to
`index.html`. Without one of these, refreshing any page other than `/` returns a 404, because
routing is client-side.

## Known gaps

- Not verified visually in a browser — the dev environment could not composite frames, so
  layout/behaviour was verified programmatically (geometry, overflow, routing, state, forms)
  rather than by eye. **Review the running site before sign-off.**
- Insight articles link to `#`; there is no blog/CMS yet.
- No sitemap.xml, robots.txt or Open Graph images.
