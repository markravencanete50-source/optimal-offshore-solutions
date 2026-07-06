# Content Update — Service graphics, Why-us, Stats & Core values

This supplements `README.md`. It documents the **content sections added to the
homepage** (beyond the motion primitives) so a developer can port them into
Next.js. All markup lives, fully realized, in
`references/Optimal Offshore — Animated.html` — copy the exact SVG/geometry from
there; the notes below explain intent, structure, and tokens.

Everything here is **static markup styled inline** plus the existing motion
components (`Reveal`, `StaggerGroup/Item`, `Counter`). No new libraries.

---

## 1. Service cards with data-graphics (Services section)

Each of the 8 service cards now leads with a **charcoal "instrument-panel"
graphic** that visually matches the service — echoing the hero scorecard rather
than using stock photos. These are hand-built inline SVGs (simple lines / rects /
circles), so they stay crisp, theme-correct, and weightless.

**Card structure**
```
<article class="service-card">        // white, radius 6, overflow:hidden, flex column
  <div class="service-viz">           // height 152px, bg #141B21, 26px grid overlay
     <span class="viz-cap">Site build</span>   // mono caption, top-left, #7C8F9C
     <svg viewBox="0 0 340 152">…motif…</svg>
  </div>
  <div class="service-body">          // padding 22/24, flex column, flex:1
     <span class="idx">S1</span>
     <h3>Offshore Setup & Expansion</h3>
     <p>…</p>
     <span class="cta">Consulting →</span>   // pushed to bottom (margin-top:auto)
  </div>
</article>
```

**The 8 motifs** (caption → what the SVG shows):
| # | Service | Caption | Graphic |
|---|---|---|---|
| S1 | Offshore Setup & Expansion | SITE BUILD | 5 rising bars, gold gradient |
| S2 | Program Recovery & Optimization | SLA RECOVERY | line dips then recovers, gold node at peak |
| S3 | HR & Workforce Strategy | COVERAGE | roster of 6 avatar dots + coverage bar |
| S4 | Multichannel Customer Support | OMNICHANNEL | channel waveform + 3 gold crest dots |
| S5 | Technical & Healthcare Ops | CLINICAL · TECH | ECG pulse line + small plus mark |
| S6 | Data Analysis & Reporting | REPORTING | bar chart + gold gauge arc |
| S7 | Research & Insights | RESEARCH | scatter dots + magnifier |
| S8 | Process Documentation & SOPs | SOP LIBRARY | 3 connected nodes with checkmarks |

Copy each `<svg>` verbatim from the reference file. Graphic palette:
`#E6C04B` gold (primary), `#46586A` muted, panel `#141B21`, grid `#1e2b34`.

> Porting tip: build a `ServiceCard` component that takes `{ id, title, body,
> cta, caption, children }` where `children` is the SVG motif, and map your 8
> services over it.

---

## 2. "Why us" section (Differentiators, expanded)

Three parts, top to bottom:

**a) Heading + lead** — "Why teams choose us over a generic vendor." + one lead
paragraph.

**b) Two-column band** (`grid 1.02fr / 1fr`, gap 56, collapses to 1 column ≤960px):
- **Left — live scorecard visual:** a charcoal panel (`#171E24`) with a mono
  header row (`Client scorecard · 90-day trend` + pulsing "Live" dot), an
  **area line-chart SVG trending up** (gold line + fill at 8% opacity), and a
  3-cell metric footer (CSAT 94% / FCR 85% / In-SLA 99%).
- **Right — six reasons:** numbered `01–06` rows, each `mono index · serif title ·
  muted body`, divided by hairlines:
  1. Operators, not middlemen
  2. Accountable to SLA
  3. Licensed RN leadership
  4. Real domain range
  5. Data-driven by default
  6. Pilot-first, low risk

**c) Stats band** — 4 cells (`repeat(4,1fr)`, hairline grid), each a **`Counter`**
that animates when scrolled into view:
| Value | Label |
|---|---|
| `50+` | Years combined ops leadership |
| `15+` | Avg years per team lead |
| `5` | Core industries served |
| `99%` | In-SLA delivery target |

Wire with the existing `Counter`: `<Counter to={50} suffix="+" />`, etc.

---

## 3. Core values (Mission section)

A band appended under the mission/principles list, above the footer:
heading "The three things every engagement is built on." + 3 cells
(`repeat(3,1fr)`, hairline grid, collapses to 2 ≤680px). Each cell = a small
40×40 gold icon + serif title + muted body.

| Value | Icon motif | Body |
|---|---|---|
| **Business Excellence** | concentric target + center dot | A relentless focus on SLA, quality and measurable outcomes on every account we run. |
| **Integrity** | check inside a ring | Transparent reporting and honest numbers — even the hard ones. No black boxes, ever. |
| **Innovation** | 4-point spark + center dot | Automation, AI tooling and live analytics built into delivery — not bolted on after. |

Icons are inline SVGs (rings/lines/polyline) — copy from the reference file.
Icon palette: outer `#94700F` deep gold, accent `#E6C04B` gold.

---

## Tokens introduced here
| Token | Hex | Use |
|---|---|---|
| Panel base | `#141B21` / `#171E24` | service viz / scorecard bg |
| Panel grid | `#1e2b34` | 26px grid overlay on viz |
| Panel hairline | `#22303A` / `#2C3842` | gauge track / baselines |
| Graphic muted | `#46586A` | secondary marks |
| Caption ink | `#7C8F9C` / `#8FA3B2` | mono captions on charcoal |

All type/spacing follows the tokens already in `README.md`.
