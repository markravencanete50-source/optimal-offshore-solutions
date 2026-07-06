'use client';

interface GridBackdropProps {
  /** Grid line color. */
  line?: string;
  /** Grid cell size in px. */
  size?: number;
  className?: string;
}

/**
 * A decorative grid layer for the hero, radially masked so it fades out toward
 * the edges. Absolutely positioned — place inside a `position: relative`
 * container, and wrap in <Parallax> if you want it to drift on scroll.
 */
export function GridBackdrop({ line = '#CBDBE9', size = 64, className }: GridBackdropProps) {
  const mask = 'radial-gradient(ellipse 90% 70% at 65% 20%, #000 0%, transparent 72%)';
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: '-10% 0 0 0',
        pointerEvents: 'none',
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity: 0.9,
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
    />
  );
}
