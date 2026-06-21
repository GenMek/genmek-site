"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the element travels from. */
  from?: Direction;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Render as a different element if needed (defaults to div). */
  as?: "div" | "section" | "li" | "span";
};

/**
 * Scroll-triggered reveal. Animates once when it enters the viewport.
 * Used everywhere for consistent, premium entrance motion.
 */
export function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  duration = 0.7,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const { x, y } = offset[from];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its direct <RevealItem> children on scroll. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};
