"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin glowing progress bar fixed to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-brand via-glow to-glow shadow-[0_0_12px_1px_var(--color-glow)]"
    />
  );
}
