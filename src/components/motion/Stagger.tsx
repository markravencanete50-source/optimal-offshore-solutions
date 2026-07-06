'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMotionSafe } from '@/hooks/useMotionSafe';

const parentVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

interface GroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Orchestrates its <StaggerItem> children so they reveal one-by-one when the
 * group enters the viewport. Fires once.
 */
export function StaggerGroup({ children, className }: GroupProps) {
  return (
    <motion.div
      className={className}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
    >
      {children}
    </motion.div>
  );
}

interface ItemProps {
  children: ReactNode;
  className?: string;
  /** Slide distance in px (collapses to 0 under reduced-motion). */
  distance?: number;
}

export function StaggerItem({ children, className, distance = 24 }: ItemProps) {
  const y = useMotionSafe(distance);
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
