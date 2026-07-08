# Handoff: Optimal Offshore Solutions — Website Redesign

## Overview
A full redesign of the single-page marketing site at optimaloffshoresolutions.com. It keeps all existing copy and section content but restructures the layout, introduces a "live operations scorecard" visual identity (warm light neutrals + gold, monospace data labels), scroll-triggered reveal animations, animated KPI counters, an industry marquee, and photo placement for each of the eight services.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (the current site appears to be Next.js — see the repo at github.com/markravencanete50-source/optimal-offshore-solutions) using its established patterns. If no environment exists, choose an appropriate framework (Next.js recommended, matching the current site).

`Optimal Offshore Redesign.dc.html` contains the whole design: the markup lives inside `<x-dc>…</x-dc>` (all styles inline), and the interaction logic lives in the `class Component` script at the bottom (IntersectionObserver reveals, counters, bars, form submit state). `image-slot.js` is a design-tool image placeholder — in production, replace every `<x-import component-from-global-scope="image-slot">` with a real `<img>`/`next/image` using the photo described in its `placeholder` attribute.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate pixel-perfectly.

## Page Structure (single page, sections top to bottom)

### 1. Navigation (fixed)
- Fixed top bar, `padding: 16px 40px`, background `rgba(247,245,240,0.88)` + `backdrop-filter: blur(14px)`, bottom border `1px solid rgba(26,34,51,0.10)`.
- Left: logo — 34×34px gold (#E4B04A) rounded square (6px) with "OS" in IBM Plex Mono 13px on #F7F5F0, plus "Optimal Offshore" Space Grotesk 600 17px.
- Right: links (Services / Approach / Why us / Team) 14.5px #5C6470 → #1C2434 on hover; gold CTA button "Book a pilot →" (#E4B04A bg, #F7F5F0 text, 10px×20px padding, radius 8px, hover: lift 1px + gold glow shadow).

### 2. Hero
- Max-width 1280px, padding `170px 40px 100px`. Two-column grid 7fr/5fr, gap 72px.
- Background decorations: 56px square grid lines (`rgba(26,34,51,0.05)` 1px lines) masked with a radial ellipse fading down; gold radial glow (`rgba(150,112,15,0.13)`) top-right, 640×520px.
- Eyebrow: IBM Plex Mono 13px, letter-spacing 0.14em, gold — "▸ KPO DELIVERY // OPERATIONS ACCOUNTABILITY".
- H1: Space Grotesk 700, `clamp(52px, 6.4vw, 88px)`, line-height 1.02, letter-spacing −0.03em — "Offshore operations, held to the number." with "held to the number." in gold.
- Sub: 19px/1.6 #5C6470, max-width 560px.
- CTAs: primary gold filled (16px 600, padding 16px 28px, radius 10px, hover lift + glow); secondary outlined (`1px solid rgba(26,34,51,0.22)`, hover gold border + faint gold bg).
- Right column: **Operating scorecard card** — gradient `#FFFFFF→#FFFFFF`, border `rgba(26,34,51,0.12)`, radius 18px, padding 28px, big soft shadow, gentle 7s float animation (translateY 0→−10px). Header row: "OPERATING SCORECARD" mono 12px + "LIVE" in #178A5B with pulsing 7px dot. 2×2 grid of metric tiles (bg `rgba(26,34,51,0.035)`, radius 12px, padding 18px): value 38px 700 (CSAT 94% gold, AHT −18% white, FCR 85% white, SLA 99% gold), label 13px #5C6470, and a 4px progress bar animating from 0 to its % (gold or #178A5B). Footer: mono 11.5px #8B8F98 disclaimer comment.

### 3. Industry marquee
- Full-width strip, 1px top/bottom borders, padding 18px 0, bg `rgba(26,34,51,0.025)`.
- Infinitely scrolling row (30s linear, translateX 0→−50%, duplicated content): industries in IBM Plex Mono 13px, letter-spacing 0.16em, #8B8F98, separated by gold "✳". Items: HEALTHCARE, TELECOM, FINANCIAL SERVICES, TECH SUPPORT, TRAVEL, LOGISTICS, DIGITAL PLATFORMS.

### 4. Problem / Approach split
- Two equal cards, gap 28px, radius 16px, padding 44px.
- Left (problem): bg #FFFFFF, mono eyebrow "▸ THE PROBLEM" in #5C6470; body 22px/1.55 #5C6470 with final phrase in #1C2434.
- Right (solution): gold-tinted gradient bg `rgba(150,112,15,0.10)→0.03`, border `rgba(150,112,15,0.28)`, gold eyebrow; body 22px #1C2434 with final phrase in gold.

### 5. Services (01)
- Eyebrow "01 ▸ BUSINESS OPERATIONS SOLUTIONS" (mono 13px gold); H2 `clamp(36px,4vw,54px)` 700: "Eight ways we take work off your floor."
- 4-column grid (2 rows), gap 20px. Card: bg #FFFFFF, border `rgba(26,34,51,0.10)`, radius 14px, overflow hidden. Hover: border → `rgba(150,112,15,0.5)`, translateY(−5px), shadow `0 20px 44px rgba(26,34,51,0.10)`.
- Card anatomy: 150px photo on top → padding 22px content: mono 11px gold tag (e.g. "S1 // SITE BUILD"), title 19px 600, blurb 14px/1.55 #5C6470.
- The 8 services + intended photos:
  1. S1 Offshore Setup & Expansion — photo: new site build / office floor going live
  2. S2 Program Recovery & Optimization — photo: war-room metrics review
  3. S3 HR & Workforce Strategy — photo: team huddle / recruitment day
  4. S4 Multichannel Customer Support — photo: agents on voice + chat
  5. S5 Technical & Healthcare Ops — photo: nurse-led clinical operations
  6. S6 Data Analysis & Reporting — photo: live dashboard close-up
  7. S7 Research & Insights — photo: analyst review session
  8. S8 Process Documentation & SOPs — photo: SOP playbook / documentation
- Copy for each card is verbatim in the HTML file.

### 6. Approach (02)
- Full-width band bg #FFFFFF with top/bottom borders. Eyebrow "02 ▸ HOW ENGAGEMENTS WORK"; H2: "Every engagement starts with a pilot — small, low-risk, and measured."
- 3 columns (Pilot / Measure / Scale) connected by a horizontal 1px gold gradient line at y≈44px. Each step: 88px circle (bg #F7F5F0, gold border `rgba(150,112,15,0.55)`, mono 20px gold number), title 26px 600, body 15.5px #5C6470.

### 7. Why us (03)
- 5fr/7fr grid, gap 72px. Left column is `position: sticky; top: 110px`: eyebrow, H2 "Why teams choose us over a generic vendor.", intro paragraph, and a mini **client scorecard card** (CSAT 94% gold / FCR 85% white / In-SLA 99% green, animated counters, LIVE pulse).
- Right column: 6 numbered rows (grid `64px 1fr`, padding 28px 8px, 1px dividers): mono gold number + 20px 600 title + 15px #5C6470 body. Titles: Operators not middlemen / Accountable to SLA / Licensed RN leadership / Real domain range / Data-driven by default / Pilot-first low risk.
- Below: **stats band** — 4 cells in a bordered rounded (16px) container with 1px gaps (`rgba(26,34,51,0.12)` grid lines), each bg #FFFFFF, padding 36px, centered: animated counter 44px 700 (50+ gold, 13+, 5, 99% green) + 14px label.

### 8. Team (04)
- Band bg #FFFFFF. Eyebrow "04 ▸ MEET THE TEAM"; H2 "Led by operators who have run the numbers you care about."
- 3-column grid of cards (bg #FFFFFF, radius 14px). Photo: aspect 4/3, object-fit cover top, `filter: grayscale(0.35)` → grayscale(0) + scale(1.03) on hover (0.4–0.5s ease). Content padding 24px: mono 11px gold role line, name 21px 600, bio 14px/1.6 #5C6470.
- 5 members (photos live at optimaloffshoresolutions.com/images/team/): Mark Raven Cañete (Founder · Technology & Operations), Karl Ian Martin Cañeda (Client Operations), Rizzie Lynne Larios (Healthcare Operations), Lynlee Gesoro (Workforce Management), Karl Ivan David "KID" Cañeda (Service Delivery & Quality). Bios verbatim in HTML.
- 6th cell: "Your account lead" — dashed gold border `1px dashed rgba(150,112,15,0.4)`, faint gold gradient bg, centered text.

### 9. Mission & values (05)
- Two columns, gap 72px. Left: eyebrow "05 ▸ MISSION & PRINCIPLES", H2 "Performance accountability, customer first.", intro, then 4 numbered mandate lines (mono gold "1." + 15.5px white text).
- Right: "▸ CORE VALUES" label + 3 stacked cards (bg #FFFFFF, radius 14px, padding 28px, gold border on hover): Business Excellence / Integrity / Innovation — gold 20px title + #5C6470 body.

### 10. Contact
- Gradient band `#FFFFFF→#F7F5F0`. 5fr/6fr grid. Left: eyebrow "▸ GET STARTED", H2 "Your pilot starts with a conversation.", intro, then mono contact lines (email, "Bohol, Philippines · Serving US & APAC", green "// We reply within one business day. No spam, ever.").
- Right: form card (bg #FFFFFF, radius 18px, padding 36px). Fields: First name + Work email (row), Company + Industry select (row), textarea "What are you trying to fix or scale?". Inputs: bg `rgba(26,34,51,0.045)`, border `rgba(26,34,51,0.14)`, radius 9px, padding 13px 15px, 15px text; focus → gold border `rgba(150,112,15,0.6)`. Industry options: Healthcare, Telecom, Financial services, Tech support, Logistics, Other.
- Submit: gold filled button; on submit (prevent default) label becomes "✓ Request received — we reply within one business day". Wire to a real endpoint in production.

### 11. Footer
- Top border, padding 56px 40px. Left: logo + tagline "Scalable operations. Trusted expertise. A KPO delivery team that runs to the number." (14px #8B8F98). Right: 3 link columns (SERVICES / COMPANY / GET STARTED) with mono 11px headers and 14px links. Bottom row: mono 12px #8B8F98 — copyright + location, split left/right, above a 1px divider.

## Interactions & Behavior
- **Scroll reveals**: every `[data-reveal]` element starts `opacity: 0; translateY(26px)` and transitions to visible (0.55–0.7s, easing `cubic-bezier(0.2, 0.7, 0.2, 1)`) when 15% enters the viewport (IntersectionObserver, unobserve after firing). Per-element stagger via `data-delay` (0–300ms) applied as transition-delay.
- **Counters**: `[data-count]` elements animate 0→target over 1500ms with cubic ease-out (`1−(1−p)³`), with optional `data-prefix` ("−") / `data-suffix` ("%", "+"). Triggered on viewport entry.
- **Progress bars**: `[data-bar]` widths transition 0→N% (1.4s) on viewport entry.
- **Marquee**: `translateX(0→−50%)` 30s linear infinite on a duplicated content row.
- **Pulse dots**: opacity 1→0.25→1, 1.6s ease-in-out infinite.
- **Scorecard float**: hero card floats translateY 0→−10px→0, 7s ease-in-out infinite.
- **Hovers**: service/value cards (gold border + lift + shadow), team photos (de-grayscale + scale 1.03), buttons (lift 2px + gold glow `0 12px 32px rgba(150,112,15,0.4)`), nav links (dim → white).
- **Smooth scrolling** for all anchor navigation (`scroll-behavior: smooth`).
- **Reduced motion**: honor `prefers-reduced-motion` — show everything instantly, set counters/bars to final values, pause marquee (the prototype exposes this as a `reduceMotion` flag; implement with the media query).
- **Responsive** (prototype is desktop-only; implement): ≤1024px collapse 2-col grids to 1 col, services to 2 cols, team to 2 cols; ≤640px everything 1 col, nav links behind a menu button, hero H1 ~44px, hide the sticky behavior.

## State Management
- `submitted: boolean` — contact form; flips on submit, swaps button label. Production: POST to form handler, add validation (required name/email, email format) and error states.
- All animation state is DOM-driven (observers); no other app state.

## Design Tokens
Colors:
- Background base: `#F7F5F0` (warm off-white) · bands/cards: `#FFFFFF`
- Text primary: `#1C2434` · secondary: `#5C6470` · faint/mono comments: `#8B8F98`
- Accent gold: `#E4B04A` (hover tint `#F1CB7A`) · signal green: `#178A5B`
- Borders: `rgba(255,255,255,0.06–0.10)`; gold borders `rgba(150,112,15,0.28–0.6)`
- Gold tints: bg `rgba(150,112,15,0.02–0.13)`, glow shadow `rgba(150,112,15,0.35–0.4)`

Typography:
- Display/body: **Space Grotesk** (400/500/600/700) — Google Fonts
- Data/labels: **IBM Plex Mono** (400/500) — Google Fonts; eyebrows 12–13px, letter-spacing 0.10–0.16em, uppercase
- Scale: H1 clamp(52–88px)/1.02/−0.03em · H2 clamp(36–54px)/1.08/−0.025em · card titles 19–21px 600 · body 14–19px/1.55–1.65

Spacing & shape:
- Content max-width 1280px, side padding 40px; section padding 100–120px vertical
- Grid gaps: cards 20px, column splits 72px
- Radii: cards 14px, panels 16–18px, buttons/inputs 8–10px, metric tiles 12px
- Shadows: panel `0 30px 80px rgba(26,34,51,0.14)`, card hover `0 20px 44px rgba(26,34,51,0.10)`

## Assets
- Team photos (already hosted on the live site): `/images/team/mark-raven-canete.jpg`, `karl-ian-caneda.jpeg`, `rizzie-larios.jpg`, `lynlee-gesoro.jpg`, `kid-caneda.jpg`
- Existing `logo-mark.png` may replace the "OS" square if preferred.
- 8 service photos: to be sourced by the client (subjects listed in the Services section above). Professional, candid, warm-lit operations photography; consider a consistent subtle dark/gold grade to match the palette.
- No icon library required; glyphs used: ▸ ✳ → ✓ (text characters).

## Files
- `Optimal Offshore Redesign.dc.html` — the complete design (markup with inline styles + interaction logic script)
- `image-slot.js` — design-tool placeholder component for the service photos (do not ship; replace with real images)
