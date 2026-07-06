'use client';

import type { CSSProperties, ReactNode } from 'react';

interface PinnedProps {
  children: ReactNode;
  /** Total scroll length the inner content stays pinned for, e.g. '220vh'. */
  height?: string;
  className?: string;
  innerStyle?: CSSProperties;
}

/**
 * A tall wrapper whose single child is `position: sticky` and therefore holds
 * fixed on screen while the page scrolls through the wrapper's length.
 * Pure CSS — no JS, no reduced-motion concerns (there is no animation, just a
 * hold). Compose with scroll-linked children (e.g. a Counter reveal) inside.
 */
export function Pinned({ children, height = '220vh', className, innerStyle }: PinnedProps) {
  return (
    <section className={className} style={{ position: 'relative', height }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'grid',
          placeItems: 'center',
          overflow: 'hidden',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </section>
  );
}
