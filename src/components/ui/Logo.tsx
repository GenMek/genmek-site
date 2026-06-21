"use client";

import { motion } from "motion/react";

type LogoProps = {
  /** Size of the glyph mark in px. */
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * GenMek brand mark — an abstract "G" built from interlocking
 * angular strokes that read as a machine / structure being assembled.
 * The inner stroke draws itself in on mount (subtle, continuous feel).
 */
export function Logo({ size = 34, withWordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="gmk-grad" x1="0" y1="0" x2="48" y2="48">
            <stop offset="0%" stopColor="#3d5afe" />
            <stop offset="100%" stopColor="#0b0ee8" />
          </linearGradient>
        </defs>

        {/* Outer hex frame */}
        <motion.path
          d="M24 3.5 41.7 13.75v20.5L24 44.5 6.3 34.25v-20.5z"
          stroke="url(#gmk-grad)"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="rgba(11,14,232,0.06)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />

        {/* Inner "G" notch */}
        <motion.path
          d="M30 18.5a8 8 0 1 0 1.4 9.5H24"
          stroke="#f8fafc"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />
      </motion.svg>

      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Gen<span className="text-glow">Mek</span>
        </span>
      )}
    </span>
  );
}
