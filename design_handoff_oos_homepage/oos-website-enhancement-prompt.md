# OOS Website Enhancement — Full Build Prompt

> Paste this into Claude Code (or hand to a developer) at the root of the optimaloffshoresolutions.com Next.js repo. Execute in the phase order given. Do not skip Phase 0.

---

## Role & standard

Act as a principal frontend engineer with a senior brand designer's eye. You are enhancing the existing site for **Optimal Offshore Solutions (OOS)** — a Bohol, Philippines KPO/BPO firm positioned as "operators, not middlemen," selling a pilot-first, SLA-accountable engagement model to US & APAC buyers. The existing identity is a terminal/ops-dashboard aesthetic (`//` comment markers, `▸` prompts, live scorecard). **Preserve and sharpen this identity — do not replace it with a generic SaaS look.** The site should feel like a live operations console that happens to be a marketing site.

Every change ships production-ready: typed, accessible, responsive to 360px, and passing Core Web Vitals.

---

## Phase 0 — Critical fixes (do these before anything else)

1. **SSR all statistics.** Every metric (CSAT target, AHT reduction, FCR, in-SLA %, years of leadership, industries served) must render its real final value in the server HTML. The count-up animation becomes progressive enhancement: on scroll into view, animate 0 → value with an `IntersectionObserver`; if JS fails or `prefers-reduced-motion` is set, the real number is simply already there. No crawler, scraper, or slow connection may ever see "0%".
2. **Remove the `Admin` link** from the footer. Add the admin route to `robots.ts` disallow.
3. **Remove the `meta keywords` tag** (obsolete).
4. **Deduplicate** the "We reply within one business day. No spam, ever." line — it appears twice in the contact section. Keep one instance under the submit button.
5. Verify `app/sitemap.ts` and `app/robots.ts` exist and are correct; create if missing.

---

## Phase 1 — Design system

Create `/lib/design-tokens.ts` + Tailwind config extension. All components consume tokens; no hardcoded hex values in components.

### Color palette — "Control Room"

Built on the OOS brand family (light blue / gold / white / charcoal), tuned for the ops-console identity:

| Token | Hex | Role |
|---|---|---|
| `ink` | `#101820` | Primary background (deep charcoal-navy, not pure black) |
| `panel` | `#1A2530` | Card / raised surface |
| `hairline` | `#2C3B48` | Borders, dividers, table rules |
| `signal` | `#4FB3E8` | Brand light blue — links, active states, data lines, chart strokes |
| `sla-gold` | `#E8B54D` | Gold — CTAs, live indicators, hit-target moments only. Ration it. |
| `paper` | `#F4F7FA` | Light-section background & primary text on dark |
| `muted` | `#8CA0B3` | Secondary text, mono labels, captions |
| `pass` | `#3FBF7F` | In-SLA / positive delta (scorecard only) |
| `breach` | `#E86A5C` | Out-of-SLA / negative delta (scorecard only) |

Rules:
- Dark sections dominate (hero, scorecard, why-us); alternate with one or two `paper` light sections (approach, team) so the page breathes. Currently the page is tonally flat — this alternation is the biggest visual upgrade.
- `sla-gold` appears in at most 3 places per viewport. It marks *the number* and *the action* — nothing else.
- All text/background pairs must pass WCAG AA (4.5:1 body, 3:1 large text). Verify `muted` on `ink` = if it fails, lighten `muted`.

### Typography

Three roles, loaded via `next/font` with `display: swap`, subset `latin`:

- **Display: `Space Grotesk`** (600/700) — headlines and section titles. Geometric, slightly technical, distinctive without being a novelty face. Tight tracking on H1 (`-0.02em`).
- **Body: `Inter`** (400/500) — paragraphs, bios, form labels. Set at 16–18px, line-height 1.65.
- **Data/utility: `IBM Plex Mono`** (400/500) — everything in the ops-console layer: eyebrows (`▸ 01 // SERVICES`), scorecard numbers, KPI labels, the industry marquee, form microcopy. This face IS the brand voice; use it consistently for every "machine" element and never for body prose.

Type scale (clamp-based, fluid):
```
h1: clamp(2.4rem, 5vw, 4rem)
h2: clamp(1.8rem, 3.5vw, 2.6rem)
h3: clamp(1.25rem, 2vw, 1.5rem)
body: 1.0625rem
mono-label: 0.8125rem, letter-spacing 0.08em, uppercase
```

### Buttons

Build a `<Button>` component with variants:

- **Primary** (`sla-gold` fill, `ink` text): "Schedule a pilot consultation →". Hover: background lifts 6% lighter + arrow translates 4px right (150ms ease-out). Active: scale 0.98. Focus-visible: 2px `signal` outline offset 2px.
- **Secondary** (transparent, 1px `hairline` border, `paper` text): "See how a pilot works". Hover: border becomes `signal`, subtle `signal` glow (`box-shadow: 0 0 0 1px`).
- **Ghost/mono** (IBM Plex Mono, `signal` text, `▸` prefix): inline nav-level actions. Hover: `▸` blinks once like a cursor — this is a signature micro-interaction, keep it subtle (single 200ms opacity pulse, not a loop).
- All buttons: min touch target 44×44px, `cursor-pointer`, disabled state at 40% opacity with `cursor-not-allowed`.

Add a **sticky mobile CTA bar**: after the user scrolls past the hero, a slim bottom bar (`panel` bg, hairline top border) with one primary "Book a pilot →" button. Dismissible. Hidden ≥1024px.

---

## Phase 2 — Motion spec

Use Framer Motion. Global rules first:

- Wrap everything in a `useReducedMotion` check — reduced motion gets opacity-only fades, zero translation, zero counters (values just appear).
- Nothing animates on a loop except the two designated "live" elements below.
- Durations: micro 150–200ms, section reveals 450–600ms, easing `[0.22, 1, 0.36, 1]` (ease-out-quint feel). Stagger children 60–80ms.
- Animate `transform` and `opacity` only. Never `width/height/top/left`.

### The orchestrated moment (spend the motion budget here)

**Hero load sequence** — the site's signature. On first paint:
1. Mono eyebrow types on character-by-character (400ms, like a terminal command being entered)
2. H1 reveals per-line with a 12px rise + fade (staggered)
3. Scorecard panel slides in from right (24px, 500ms)
4. Scorecard counters run 0 → real value over 1.2s with ease-out, numbers in IBM Plex Mono using `font-variant-numeric: tabular-nums` so digits don't jitter
5. The "LIVE" badge begins its idle state: a small dot pulsing at 2s intervals (the ONE allowed ambient loop, plus the marquee)

### Everything else (restrained)

- **Section reveals:** single fade + 16px rise per section on scroll into view, once, `viewport={{ once: true, margin: "-80px" }}`. Do NOT stagger every card everywhere — it reads as AI-generated. Stagger only the 3 service clusters and the 3 approach steps.
- **Service cards hover:** border `hairline → signal` (200ms) + the mono cluster label gains a `▸` prefix. No lift/scale/shadow theatrics.
- **Industry marquee:** existing infinite scroll is fine; pause on hover; duplicate list with `aria-hidden="true"` on the clone.
- **Scorecard in "Why us":** when it enters view, draw a tiny 90-day sparkline (SVG `stroke-dashoffset` animation, 800ms) under each metric. This reinforces "live data" better than any decoration could.
- **Approach steps 01→02→03:** a vertical connector line draws downward as the user scrolls through them (scroll-linked `pathLength`). This is the one place numbering is genuinely sequential — make the sequence felt.

---

## Phase 3 — Layout & content restructure

1. **Service cards: 9 → 3 clusters of 3.** Replace the flat S1–S9 grid:
   - **BUILD** — Offshore Setup & Expansion · HR & Workforce Strategy · Process Documentation & SOPs
   - **RUN** — Multichannel Customer Support · Technical & Healthcare Ops · Program Recovery & Optimization
   - **PROVE** — Data Analysis & Reporting · Research & Insights · Sales & Lead Generation
   Each cluster gets a mono header (`▸ BUILD //`), one-line thesis, and 3 compact cards linking to their dedicated service pages (Phase 4).
2. **Team section:** equalize bios to ~3 lines each (move detail to LinkedIn). Add LinkedIn icon-links per founder. Grayscale portraits that gain color on hover (300ms) — clean, on-brand, cheap.
3. **Add an FAQ section** before contact (6–8 questions: How does a pilot work? Minimum commitment? How is SLA reporting shared? Time-zone coverage? Data security? Pricing model? How fast can you ramp?). Accordion with mono `▸` markers that rotate 90° on open.
4. **Add one proof block** between Why-us and Team: a single anonymized pilot result rendered in the scorecard visual language ("TELECOM ACCOUNT // 90 DAYS: FCR 61% → 78% · AHT −18% · In-SLA 96%"). If no client data exists yet, use founders' verifiable track-record numbers and label them as such ("FROM OUR OPERATORS' PRIOR ACCOUNTS") — specificity with honest labeling beats vague targets.
5. **Contact form: cut to 3 fields** for step one — First name, Work email, "What program are you worried about?" (textarea). On submit success, reveal optional step two (industry, budget, preferred channel, best time) framed as "help us prep for the call." Server action + honeypot field + basic rate limiting. Inline validation on blur, error messages in plain language ("Enter a work email like name@company.com"), success state confirms in the console voice: `▸ Received. We reply within one business day.`

---

## Phase 4 — SEO architecture

1. **Create `/services/[slug]` pages** for all nine services. Each page: unique `generateMetadata` (title ≤60 chars targeting the commercial keyword, e.g. "Program Recovery & SLA Turnaround Services | OOS"), H1, 400–700 words of real content (problem → how OOS runs it → metrics held → pilot CTA), 3-question FAQ, `Service` + `FAQPage` JSON-LD, breadcrumbs with `BreadcrumbList` schema. Homepage cluster cards and footer links point here — kill the `#services` footer links.
2. **Global JSON-LD** in root layout: `Organization` + `ProfessionalService` (name, logo, `hello@` email, Bohol PH address, `areaServed`: US & APAC, `founder` array). Add `Person` schema per founder with `sameAs` LinkedIn URLs.
3. **Scaffold `/insights`** (blog) with MDX or CMS-ready structure — even if launching with 2 posts. Target: "how to run an offshore pilot," "BPO SLA reporting explained," "signs your outsourced program is out of SLA." This is the organic lead-gen engine given zero social presence.
4. Descriptive `alt` text on all images ("Karl Ian Martin Cañeda, Co-Founder, Client Operations at Optimal Offshore Solutions"). Team photos via `next/image` with explicit dimensions, `sizes` attr, WebP/AVIF.
5. Canonicals on every route; `sitemap.ts` includes all service pages + insights.

---

## Phase 5 — Performance & accessibility budget

Hard gates — do not ship a phase that violates these:

- LCP < 2.5s (hero H1 or scorecard panel is the LCP element; preload the display font)
- CLS < 0.05 — reserve exact space for the scorecard and marquee; `tabular-nums` on all counters
- INP < 200ms; total JS on homepage < 180KB gzipped; Framer Motion imported per-component, not globally
- Full keyboard navigation with visible `:focus-visible` states on every interactive element; skip-to-content link; form inputs with real `<label>`s (no placeholder-as-label); required-field markers inside labels, not floating in options
- `prefers-reduced-motion` honored everywhere (see Phase 2)
- Run Lighthouse + axe after each phase; report scores in the PR description

---

## Execution order & verification

Ship as 5 sequential PRs (Phase 0 → 4, with Phase 5 gates applied to each). After each phase: screenshot desktop (1440px) + mobile (390px), run Lighthouse, and list what changed vs. the token system. If any element would look at home on a generic template site, redesign it against the "live operations console" thesis before merging.
