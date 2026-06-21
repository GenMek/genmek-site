"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Custom cursor: a small dot that tracks 1:1 plus a soft blue glow that
 * lags behind with spring physics. Only active on fine-pointer devices.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const glowX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    // Pointer capability is only knowable on the client, post-mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(Boolean(el?.closest("a, button, [data-cursor='hover']")));
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Lagging soft glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/30 blur-2xl"
        style={{ x: glowX, y: glowY }}
        animate={{ width: hovering ? 90 : 56, height: hovering ? 90 : 56 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[91] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow bg-glow/20 backdrop-invert-0"
        style={{ x, y }}
        animate={{
          width: hovering ? 44 : 12,
          height: hovering ? 44 : 12,
          opacity: hovering ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
}
