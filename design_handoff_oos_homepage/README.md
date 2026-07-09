# Handoff: OOS Homepage — "Control Room" Redesign

## Overview
Full homepage redesign for **Optimal Offshore Solutions** (optimaloffshoresolutions.com) — a Bohol, PH KPO/BPO firm positioned as "operators, not middlemen." The design executes the enhancement spec in `oos-website-enhancement-prompt.md` (included in this bundle): a live-operations-console aesthetic with mono eyebrows, a LIVE pilot scorecard, SLA-first copy, and a pilot-first conversion flow.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing intended look, copy, and behavior. They are **not production code**. The task is to **recreate this design in the existing Next.js repo** using its established patterns: `next/font`, Tailwind + design tokens, Framer Motion, server components/actions. Follow the phase order in `oos-website-enhancement-prompt.md`; this prototype is the visual target for Phases 1–3.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and motion are final intent. Recreate pixel-perfectly, adapting only to the repo's component conventions.

## Files
- `OOS Homepage.dc.html` — the full homepage prototype. Open in a browser. Markup is in the `<x-dc>` template (inline styles carry all design values); behavior is in the `data-dc-script` class at the bottom (typing effect, counters, reveals, sparklines, connector, FAQ, form states).
- `image-slot.js` — drag-and-drop image placeholder used for founder portraits in the prototype only. In production, use `next/image` with real photos.
- `oos-website-enhancement-prompt.md` — the authoritative build spec (Phases 0–5: critical fixes, tokens, motion, layout, SEO, perf/a11y). Execute it in order; do not skip Phase 0.

## Design Tokens ("Control Room" palette)
Put in `/lib/design-tokens.ts` + Tailwind config. No hardcoded hex in components.

- `ink` `#101820` — primary dark background
- `panel` `#1A2530` — cards / raised surfaces (scorecard, service cards, form)
- `hairline` `#2C3B48` — all borders, dividers, table rules on dark
- `signal` `#4FB3E8` — links, eyebrows, active states, sparkline strokes, focus rings
- `sla-gold` `#E8B54D` — primary CTA fill, LIVE dot, key accents. **Max 3 uses per viewport.**
- `paper` `#F4F7FA` — light section bg + primary text on dark
- `muted` `#8CA0B3` — secondary text, mono labels (on dark)
- `pass` `#3FBF7F` / `breach` `#E86A5C` — scorecard deltas only
- Light-section derivatives used in the prototype: body text `#47596A`, mono labels `#7A8B9A`, hairline `#D5DEE6`, signal-on-light `#2A7FB8` (darkened for AA contrast on paper), footer bg `#0C131A`.

Note: the accent is tweakable in the prototype (`gold` prop). Default ships `#E8B54D`; stakeholders also previewed `#4FB3E8` (all-blue). Confirm final choice before build.

## Typography
Load via `next/font`, `display: swap`, latin subset:
- **Space Grotesk** 600/700 — H1/H2/H3, card titles, FAQ questions. H1 letter-spacing `-0.02em`.
- **Inter** 400/500/600 — body, bios, buttons, form inputs. Body 1.0625rem / line-height 1.65.
- **IBM Plex Mono** 400/500 — ALL "machine" elements: eyebrows (`▸ 01 // SERVICES`), scorecard numbers (`font-variant-numeric: tabular-nums`), KPI labels, marquee, form labels/microcopy, footer meta. Never for body prose.

Scale: `h1: clamp(2.4rem, 5vw, 4rem)` · `h2: clamp(1.8rem, 3.5vw, 2.6rem)` · `h3: ~1.15–1.35rem` · body `1.0625rem` · mono-label `0.8125rem, letter-spacing 0.08em, uppercase` (small variants 0.72–0.75rem).

## Page Structure (top → bottom)
1. **Nav** — sticky, `rgba(16,24,32,0.92)` + `backdrop-blur(12px)`, hairline bottom border, 64px tall, 1160px container (32px side padding — global). Mono logo `▸ OOS // OPTIMAL OFFSHORE SOLUTIONS` (▸ in gold), mono uppercase links (muted → paper on hover), ghost CTA `▸ Book a pilot` in signal → gold on hover.
2. **Hero** (ink) — 2-col grid `1.05fr / 0.95fr`, gap 72px, padding 96/88px. Left: typed mono eyebrow `▸ oos --status // live from bohol, ph` (signal), H1 "Operators, / not middlemen." (gold period), muted subhead ≤46ch, CTA row (primary gold "Schedule a pilot consultation →" + secondary outlined "See how a pilot works"), mono microline `▸ reply < 1 business day // no retainers to start`. Right: **scorecard panel** — panel bg, hairline border, radius 4px; header row "PILOT SCORECARD // DAY 90" + LIVE badge (8px gold pulsing dot + gold LIVE); 2×2 metric grid with internal hairline borders: In-SLA **96.4%**, CSAT **92%**, FCR **78%**, AHT delta **−18%** — number 2.3rem Plex Mono 500 tabular-nums, mono label above, `pass`-green delta line below; footer `▸ updated weekly // shared with every client`.
3. **Industry marquee** — hairline top/bottom, mono uppercase items separated by `//` in hairline color: Telecom, Healthcare, Fintech, E-commerce, SaaS, Logistics, Real estate, Travel, Energy & utilities. Infinite left scroll ~36s, duplicate list `aria-hidden="true"`, pause on hover.
4. **Services** (ink) — eyebrow `▸ 01 // Services`, H2 "Nine services. Three jobs." 3 columns (gap 28px): **BUILD / RUN / PROVE**, each with signal mono header (`▸ BUILD //`), one-line thesis in paper, and 3 cards (panel bg, hairline border, radius 4, padding 20/22): Space Grotesk title + one-line muted description. Hover: border → signal, 200ms. Cards link to `/services/[slug]` (Phase 4).
   - BUILD: Offshore Setup & Expansion · HR & Workforce Strategy · Process Documentation & SOPs
   - RUN: Multichannel Customer Support · Technical & Healthcare Ops · Program Recovery & Optimization
   - PROVE: Data Analysis & Reporting · Research & Insights · Sales & Lead Generation
5. **Approach** (paper, LIGHT) — 2-col `0.9fr / 1.1fr`. Left: eyebrow + H2 "The pilot, start to scale." + ghost link `▸ Scope your pilot`. Right: 3 steps (01 Scope // 2 weeks · 02 Run // 90 days · 03 Scale // your call), each 48px mono-numbered square (2px signal-on-light border) + title + body. A 2px vertical connector line behind the squares (light hairline) with a signal fill that draws downward, scroll-linked.
6. **Why OOS** (ink) — 2-col. Left: H2 "You see the numbers we see." + 3 bullets (`▸ a/b/c` mono markers): Operators on the floor / SLAs in the contract / One dashboard, no spin. Right: **trend panel** — header "90-DAY TREND // ACTIVE PODS" + `wk 13`; 3 rows (FCR 78% ▲, AHT 5:42 ▼ −18%, In-SLA 96.4% ▲) each with a signal SVG sparkline that draws in on scroll (stroke-dashoffset, 800ms); footer `▸ every client sees this view`.
7. **Proof block** (ink, panel card, padding 40/44) — gold mono label "FROM OUR OPERATORS' PRIOR ACCOUNTS", mono line "TELECOM ACCOUNT // 90 DAYS", 3 stats with left hairline rules: FCR 61% **→ 78%** (arrow part in pass green) · **−18%** AHT · 96% in-SLA. Muted mono footnote about honest labeling.
8. **Team** (paper, LIGHT) — H2 "Run by people who ran the floor." 3 cards (white bg, light hairline border): 4:5 portrait (grayscale → color on hover, 300ms), name + 32px "in" LinkedIn box-link, mono role line, ~3-line bio. **Karl Ian Martin Cañeda — Co-founder // Client operations** is real; the other two names are `[ Co-founder name ]` placeholders — get real names, bios, LinkedIn URLs, photos.
9. **FAQ** (ink, 860px container) — H2 "Asked before every pilot." 7-item accordion, hairline row dividers: mono `▸` marker rotates 90° and turns gold when open; Space Grotesk question; muted answer expands (max-height + opacity, ~350ms). First item open by default. Questions: pilot mechanics, minimum commitment, SLA reporting, time zones, data security, pricing, ramp speed.
10. **Contact** (ink) — 2-col. Left: H2 "Tell us what's out of SLA." + pitch + mono mailto `hello@optimaloffshoresolutions.com`. Right: panel form card, **step one = 3 fields**: First name, Work email, "What program are you worried about?" (textarea). Mono uppercase labels with gold `*` inside the label. Hidden honeypot (`company_site`). Submit = primary gold "Book a pilot →". One instance of "▸ We reply within one business day. No spam, ever." under the button. On success: green mono `▸ Received. We reply within one business day.` then optional **step two** ("help us prep for the call"): Industry, Monthly budget, Preferred channel, Best time — secondary "Send details" → `▸ Details logged. Talk soon.` Production: server action + rate limiting; inline email validation on blur ("Enter a work email like name@company.com" in `breach` red).
11. **Footer** (`#0C131A`, hairline top) — brand blurb / Site links / Contact cols, mono copyright `© 2026 OPTIMAL OFFSHORE SOLUTIONS // BOHOL, PH`. **No Admin link** (Phase 0).

Not in the prototype but in spec: sticky mobile CTA bar (<1024px, panel bg, dismissible, "Book a pilot →") and responsive layout to 360px — single-column stacks of the grids above.

## Interactions & Motion (Framer Motion in production)
Global: `useReducedMotion` → opacity-only, no counters (real values are in server HTML already — counters are progressive enhancement, **SSR the final numbers**). Durations: micro 150–200ms, reveals 450–600ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Animate transform/opacity only.

- **Hero load sequence** (the signature): eyebrow types on ~420ms → H1 lines + copy rise 12px/fade, staggered ~90ms starting at 260ms → scorecard slides in from right 24px/500ms at ~420ms → counters run 0→value over 1.2s ease-out (tabular-nums) → LIVE dot pulses at 2s intervals (one of only two ambient loops, with the marquee).
- **Section reveals**: fade + 16px rise, once, `viewport={{ once: true, margin: "-80px" }}`. Stagger ONLY the 3 service clusters and 3 approach steps (80ms).
- **Service cards**: border hairline → signal, 200ms. No lift/shadow.
- **Sparklines**: stroke-dashoffset draw, 800ms, on enter.
- **Approach connector**: scroll-linked scaleY fill, origin top (progress = (0.78·vh − rect.top) / rect.height, clamped).
- **FAQ**: marker rotates 90°/250ms; body max-height+opacity ~350ms.
- **Buttons**: primary hover = brightness lift + arrow nudge; active scale 0.98; `:focus-visible` 2px signal outline, offset 2px. Secondary hover = signal border + `0 0 0 1px` signal glow. All ≥44px touch targets.

## State Management
- `openFaq: number` (−1 = all closed; default 0)
- Contact: `sent`, `prepSent`, `emailError` — step-one → success → optional step-two flow
- Counters/reveals/sparks/connector: IntersectionObserver + scroll, not state

## Accessibility & Perf (gates from spec Phase 5)
Real `<label>`s (done in prototype), honeypot hidden from AT, marquee clone `aria-hidden`, `aria-expanded` on accordion buttons, WCAG AA pairs (signal darkened to `#2A7FB8` on paper for this reason), LCP < 2.5s (preload Space Grotesk), CLS < 0.05 (reserve scorecard/marquee space, tabular-nums), JS < 180KB gz, per-component Framer imports.

## Assets
No raster assets shipped. Needed from client: 3 founder portraits (4:5, will render grayscale→color), 2 founder names/bios/LinkedIn URLs, final LinkedIn company URL. Icons in the design are typographic (`▸`, `//`, `→`, `▲`, `▼`, "in") — no icon library required.
