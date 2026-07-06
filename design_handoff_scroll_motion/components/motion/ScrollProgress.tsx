'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  /** Bar height in px. */
  height?: number;
  /** CSS background for the bar. */
  background?: string;
}

/**
 * A fixed gold bar at the very top of the page whose scaleX tracks whole-page
 * scroll progress. Spring-smoothed. Mount once in the root layout.
 * Safe under reduced-motion (it reflects position, it doesn't animate on its own).
 */
export function ScrollProgress({
  height = 3,
  background = 'linear-gradient(90deg,#94700F,#E6C04B)',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height,
        zIndex: 60,
        transformOrigin: 'left center',
        scaleX,
        background,
        boxShadow: '0 0 12px -2px rgba(230,192,75,0.7)',
      }}
    />
  );
}
