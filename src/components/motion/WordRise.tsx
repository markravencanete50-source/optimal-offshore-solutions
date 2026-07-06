'use client';

import { motion } from 'framer-motion';
import { useMotionSafe } from '@/hooks/useMotionSafe';

const wordVariants = (rise: string) => ({
  hidden: { y: rise },
  show: { y: '0%', transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
});

interface WordRiseProps {
  /** Each inner array is a visual line; each string is a word. */
  lines: string[][];
  className?: string;
  /** Words matching these (case-insensitive) render italic — e.g. ['the', 'number.']. */
  italicWords?: string[];
}

/**
 * Reveals a headline word-by-word: each word rises from behind an
 * overflow-hidden line. Runs on mount. Under reduced-motion the rise distance
 * collapses to 0 (words simply appear).
 */
export function WordRise({ lines, className, italicWords = [] }: WordRiseProps) {
  const risePx = useMotionSafe(110); // 110% travel, or 0 when reduced
  const rise = `${risePx === 0 ? 0 : 110}%`;
  const italics = new Set(italicWords.map((w) => w.toLowerCase()));
  let index = 0;

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.07 }}
    >
      {lines.map((words, li) => (
        <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.04em' }}>
          {words.map((w) => {
            const italic = italics.has(w.toLowerCase());
            index += 1;
            return (
              <motion.span
                key={index}
                variants={wordVariants(rise)}
                transition={{ delay: index * 0.07 }}
                style={{ display: 'inline-block', fontStyle: italic ? 'italic' : 'normal' }}
              >
                {w}&nbsp;
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.h1>
  );
}
