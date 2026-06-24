"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

/**
 * Minimal custom cursor: a small dot that tracks the pointer 1:1 (no spring,
 * so it never lags behind fast movement) and gently grows into a ring over
 * interactive elements. Only active on fine-pointer devices.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

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
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[91] -translate-x-1/2 -translate-y-1/2 rounded-full border border-glow"
      style={{ x, y }}
      animate={{
        width: hovering ? 34 : 10,
        height: hovering ? 34 : 10,
        backgroundColor: hovering
          ? "rgba(61,90,254,0)"
          : "rgba(61,90,254,0.9)",
      }}
      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
    />
  );
}
