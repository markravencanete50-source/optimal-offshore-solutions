'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
  /** Target value to count up to. */
  to: number;
  prefix?: string;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 up to `to` when it scrolls into view. Snaps straight to the
 * final value under reduced-motion. Fires once.
 */
export function Counter({ to, prefix = '', suffix = '', duration = 1.2, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduced) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
