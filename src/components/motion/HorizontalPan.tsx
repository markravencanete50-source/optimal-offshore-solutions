'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

interface HorizontalPanProps {
  children: ReactNode;
  /**
   * How far the track pans across the pinned viewport, as a CSS translateX
   * end value. Tune to your track width — roughly
   * `-(trackWidth - viewportWidth)` expressed as a % of the track.
   */
  distance?: string;
  /** Vertical scroll length devoted to the pan. Taller = slower pan. */
  scrollLength?: string;
  className?: string;
  /** Content shown above the track inside the pinned viewport (heading, hint). */
  header?: ReactNode;
  gap?: number;
}

/**
 * Turns vertical scroll through a pinned section into a horizontal pan of a
 * flex track — the signature "services / team" effect.
 *
 * Under `prefers-reduced-motion`, it degrades to a native horizontal scroll
 * strip (swipe/drag) with no pinning, so it never hijacks scroll for users who
 * opted out.
 */
export function HorizontalPan({
  children,
  distance = '-66%',
  scrollLength = '300vh',
  className,
  header,
  gap = 20,
}: HorizontalPanProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', distance]);

  if (reduced) {
    return (
      <section className={className}>
        {header}
        <div
          style={{
            display: 'flex',
            gap,
            overflowX: 'auto',
            scrollSnapType: 'x proximity',
            paddingBottom: 24,
          }}
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={className} style={{ position: 'relative', height: scrollLength }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {header}
        <motion.div style={{ x, display: 'flex', gap }}>{children}</motion.div>
      </div>
    </section>
  );
}
