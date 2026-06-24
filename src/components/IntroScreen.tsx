"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";

const SESSION_KEY = "genmek_intro_seen";
const HOLD_DURATION = 1500; // ms the intro stays before dismissing

export function IntroScreen() {
  // `null` = undecided (avoids a flash before we read sessionStorage).
  const [show, setShow] = useState<boolean | null>(null);

  // Decide whether to play the intro (once per browser session).
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage may be unavailable (privacy mode) — just play it.
    }
    // sessionStorage is browser-only, so this decision must happen post-mount.
    if (seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }
    setShow(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Short hold: mount the logo + welcome line, then dismiss.
  useEffect(() => {
    if (show !== true) return;

    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setShow(false);
      document.body.style.overflow = "";
    }, HOLD_DURATION);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show === true && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* ambient radial glow */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_45%,rgba(61,90,254,0.18),transparent_55%)]" />

          {/* Logo mark */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="absolute inset-0 -z-10 rounded-full bg-glow/40 blur-3xl"
              style={{ animation: "pulse-glow 2.2s ease-in-out infinite" }}
            />
            <Logo size={84} withWordmark={false} />
          </motion.div>

          {/* Welcome line */}
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="mt-8 font-display text-lg font-semibold tracking-tight text-ink sm:text-xl"
          >
            Bem-vindo à <span className="text-gradient-brand">GenMek</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
