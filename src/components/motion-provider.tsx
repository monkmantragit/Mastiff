'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Honour the OS "reduce motion" setting for every framer-motion animation on the site
 * (parallax, entrance animations, infinite loops). CSS-only reduction in globals.css did
 * not reach framer-motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
