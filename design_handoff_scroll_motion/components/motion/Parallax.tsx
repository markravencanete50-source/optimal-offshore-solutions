'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

interface ParallaxProps {
  children: ReactNode;
  /** Max drift in px at each end of the scroll range. */
  amount?: number;
  className?: string;
}

/**
 * Drifts its children vertically as the wrapper crosses the viewport, so a
 * background layer appears to move slower than the content in front of it.
 * `useTransform` runs off the main thread — no React re-renders on scroll.
 * Under reduced-motion, Framer Motion resolves scroll values statically.
 */
export function Parallax({ children, amount = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
