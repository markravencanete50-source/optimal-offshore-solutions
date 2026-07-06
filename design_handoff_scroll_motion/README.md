# Handoff: Scroll Motion for optimal-offshore-solutions

## Overview
Adds a **subtle, premium scroll-motion layer** to the Optimal Offshore homepage:
gentle fade/slide reveals, staggered card cascades, animated scorecard counters,
a hero headline that rises word-by-word, background parallax, a top scroll-progress
bar, a pinned **horizontal pan** for the 8 services, and sticky section behavior.
Every effect honors `prefers-reduced-motion`.

## What's in this bundle

```
design_handoff_scroll_motion/
├── README.md                         ← you are here
├── hooks/
│   └── useMotionSafe.ts              ← reduced-motion helper
├── components/motion/
│   ├── index.ts                      ← barrel export
│   ├── Reveal.tsx                    ← fade + slide up on enter
│   ├── Stagger.tsx                   ← StaggerGroup / StaggerItem
│   ├── Counter.tsx                   ← count 0 → target in view
│   ├── Parallax.tsx                  ← layer drifts on scroll
│   ├── Pinned.tsx                    ← sticky-through-section wrapper
│   ├── HorizontalPan.tsx             ← vertical scroll → horizontal pan
│   ├── WordRise.tsx                  ← headline rises word-by-word
│   ├── ScrollProgress.tsx            ← top-of-page gold progress bar
│   └── GridBackdrop.tsx              ← masked grid, parallax-ready
└── references/
    ├── Optimal Offshore — Animated.html   ← full animated homepage (visual reference)
    └── Motion Snippet Guide.html          ← per-effect explainer
```

## About the design files
The two files in `references/` are **design references built in HTML** — they show the
intended look, timing, and behavior. They are **not** meant to be shipped as-is.
The `.tsx` files in `components/motion/` and `hooks/` **are** production React/TypeScript
built for this repo's stack (Next.js 14 App Router + TypeScript + Tailwind + Framer Motion)
— drop them straight into `src/` and wire them into the existing homepage components.

## Fidelity
**High-fidelity.** Colors, type, spacing, easing, and durations are final. Recreate the
motion exactly with these components; keep the existing markup/content from the current
homepage and wrap it in these primitives.

## Install
```bash
npm install framer-motion
```

## Where files go (this repo)
| Bundle path | Repo path |
|---|---|
| `hooks/useMotionSafe.ts` | `src/hooks/useMotionSafe.ts` |
| `components/motion/*` | `src/components/motion/*` |

The components import the hook as `@/hooks/useMotionSafe` (the repo's `@/*` → `src/*`
alias, already set in `tsconfig.json`). Adjust if your alias differs.

## Wiring it into the homepage

**1. Global chrome — add once in `src/app/layout.tsx`** (inside `<body>`, above `{children}`):
```tsx
import { ScrollProgress } from '@/components/motion';
// ...
<ScrollProgress />
{children}
```

**2. Reveal any section** — wrap the existing section content:
```tsx
import { Reveal } from '@/components/motion';

<Reveal>
  <ProblemSolution />
</Reveal>
```

**3. Stagger a grid** (Differentiators, Team, Services cards):
```tsx
import { StaggerGroup, StaggerItem } from '@/components/motion';

<StaggerGroup className="grid grid-cols-2 gap-px">
  {items.map((it) => (
    <StaggerItem key={it.id}><Card {...it} /></StaggerItem>
  ))}
</StaggerGroup>
```

**4. Scorecard counters** — replace the static number in `HeroSection` gauges:
```tsx
import { Counter } from '@/components/motion';

<Counter to={94} suffix="%" />
<Counter to={18} prefix="−" suffix="%" />
```

**5. Hero headline** — `WordRise`:
```tsx
import { WordRise } from '@/components/motion';

<WordRise
  lines={[['Offshore', 'operations,'], ['held', 'to', 'the', 'number.']]}
  className="font-serif ..."
/>
```

**6. Services — pinned horizontal pan** (the signature effect):
```tsx
import { HorizontalPan } from '@/components/motion';

<HorizontalPan>
  {services.map((s) => (
    <ServiceCard key={s.slug} {...s} className="flex-none w-[340px]" />
  ))}
</HorizontalPan>
```
On the live top-level site this pins the section and pans the track. `HorizontalPan`
already reads `useReducedMotion()` and renders a normal horizontal scroll strip when
the user prefers less motion.

**7. Hero grid backdrop + parallax:**
```tsx
import { Parallax, GridBackdrop } from '@/components/motion';

<section className="relative overflow-hidden">
  <Parallax amount={80}><GridBackdrop /></Parallax>
  {/* hero content */}
</section>
```

## Interactions & timing (design tokens)
| Effect | Property | Value |
|---|---|---|
| Reveal | duration / ease | `0.8s` / `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| Reveal | slide distance | `24px` (→ `0` when reduced) |
| Stagger | per-child delay | `0.09s` |
| Counter | duration / ease | `1.2s` / `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| WordRise | duration / ease | `0.85s` / `cubic-bezier(0.16, 1, 0.3, 1)` |
| WordRise | per-word delay | `0.07s` |
| Parallax | drift range | `±60px` (configurable) |
| ScrollProgress | spring | `stiffness 120, damping 30` |
| HorizontalPan | wrapper height | `300vh` (≈ scroll length of the pan) |

## Brand tokens (already in the design)
| Token | Hex |
|---|---|
| Corporate blue | `#2F80ED` |
| Signal gold (buttons/bars) | `#E6C04B` |
| Deep gold (accents on light) | `#94700F` |
| Charcoal ink | `#1B242C` / panel `#171E24` |
| Paper / panel / card | `#EAF1F8` / `#DBE7F2` / `#FFFFFF` |
| Hairline | `#CBDBE9` / `#B2C6D8` |
Fonts: **Newsreader** (serif display), **IBM Plex Sans** (body), **IBM Plex Mono** (labels).

## Accessibility
All components call Framer Motion's `useReducedMotion()`. When the user prefers reduced
motion: slides/parallax/word-rise collapse to opacity-only or no motion, counters snap to
their final value, and the pinned pan becomes a native horizontal scroll strip. Nothing is
ever left invisible.

## Performance notes
- Reveals use `whileInView` with `viewport={{ once: true }}` — they fire once and stop observing.
- Scroll-linked effects (`Parallax`, `HorizontalPan`, `ScrollProgress`) use Framer Motion's
  `useScroll`/`useTransform`, which run off the compositor and don't trigger React re-renders.
- Keep `HorizontalPan` and `Parallax` children on the GPU (`transform` only — no layout props).
```
