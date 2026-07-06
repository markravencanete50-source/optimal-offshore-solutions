'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionSafe } from '@/hooks/useMotionSafe';

const EASE = [0.2, 0.7, 0.2, 1] as const;

interface RevealProps {
  children: ReactNode;
  /** Delay before this element animates, in seconds. */
  delay?: number;
  /** Slide distance in px (collapses to 0 under reduced-motion). */
  distance?: number;
  className?: string;
}

/**
 * Fades + slides its children up as they enter the viewport. Fires once.
 */
export function Reveal({ children, delay = 0, distance = 24, className }: RevealProps) {
  const y = useMotionSafe(distance);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
