"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** stagger delay in seconds */
  delay?: number;
  /** vertical travel distance in px */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "ol" | "ul";
};

/**
 * Scroll-triggered entrance. Fades + rises into place the first time it
 * enters the viewport.
 *
 * Fail-safe to VISIBLE: when the user prefers reduced motion we skip the
 * hidden state entirely and render content immediately, so content is never
 * stuck invisible waiting on an observer.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </MotionTag>
  );
}
