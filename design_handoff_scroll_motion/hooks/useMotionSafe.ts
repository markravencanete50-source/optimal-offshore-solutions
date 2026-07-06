import { useReducedMotion } from 'framer-motion';

/**
 * Returns a motion distance that collapses to 0 when the user has
 * `prefers-reduced-motion: reduce` set. Use it to gate any transform-based
 * animation so reduced-motion users get an opacity-only (or no-motion) result.
 *
 *   const y = useMotionSafe(24); // 24 normally, 0 when reduced
 */
export function useMotionSafe(distance = 24): number {
  const reduced = useReducedMotion();
  return reduced ? 0 : distance;
}
