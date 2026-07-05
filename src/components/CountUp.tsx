"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

/**
 * Counts from 0 up to `end` once the element scrolls into view.
 * Eased with a cubic-out curve. Static final value when reduced-motion is set.
 */
export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1100,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  // Reduced motion: show the final value immediately, don't wait on scroll.
  useEffect(() => {
    if (reduce) setValue(end);
  }, [reduce, end]);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      <span className="u">{suffix}</span>
    </span>
  );
}
