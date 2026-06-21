"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { INTRO_PHRASES } from "@/lib/site";

const SESSION_KEY = "genmek_intro_seen";
const PHRASE_INTERVAL = 900; // ms per phrase

export function IntroScreen() {
  // `null` = undecided (avoids a flash before we read sessionStorage).
  const [show, setShow] = useState<boolean | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [welcome, setWelcome] = useState(false);

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

  // Drive the phrase cycle, then the "welcome" beat, then dismiss.
  useEffect(() => {
    if (show !== true) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    INTRO_PHRASES.forEach((_, i) => {
      timers.push(setTimeout(() => setPhraseIndex(i), i * PHRASE_INTERVAL));
    });

    const afterPhrases = INTRO_PHRASES.length * PHRASE_INTERVAL;
    timers.push(setTimeout(() => setWelcome(true), afterPhrases));
    timers.push(
      setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        setShow(false);
        document.body.style.overflow = "";
      }, afterPhrases + 1500),
    );

    return () => timers.forEach(clearTimeout);
  }, [show]);

  return (
    <AnimatePresence>
      {show === true && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* ambient radial glow */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_45%,rgba(61,90,254,0.18),transparent_55%)]" />

          {/* Logo: pulses, then scales up to "reveal" the home. */}
          <motion.div
            className="relative"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={
              welcome
                ? { scale: 1.35, opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: welcome ? 1.4 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className="absolute inset-0 -z-10 rounded-full bg-glow/40 blur-3xl"
              style={{ animation: "pulse-glow 2.2s ease-in-out infinite" }}
            />
            <Logo size={84} withWordmark={false} />
          </motion.div>

          <div className="mt-10 h-7 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              {!welcome ? (
                <motion.p
                  key={phraseIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-display text-sm font-medium tracking-[0.2em] text-muted uppercase sm:text-base"
                >
                  {INTRO_PHRASES[phraseIndex]}
                </motion.p>
              ) : (
                <motion.p
                  key="welcome"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl"
                >
                  Bem-vindo à{" "}
                  <span className="text-gradient-brand">GenMek</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
