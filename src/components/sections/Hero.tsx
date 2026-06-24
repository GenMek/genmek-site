"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: (i * 53) % 100,
  top: (i * 37 + 11) % 100,
  delay: (i % 6) * 0.7,
  duration: 6 + (i % 5),
  size: 1 + (i % 3),
}));

const word = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const TITLE_PART_ONE = "Sua empresa está preparada para ser".split(" ");
const TITLE_PART_TWO = "encontrada, lembrada e escolhida?".split(" ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Glow that follows the cursor across the hero.
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const glow = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(61,90,254,0.18), transparent 60%)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // GSAP: scroll-scrubbed parallax depth + continuous ambient drift.
  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      // Background layers leave the viewport at different speeds as you scroll,
      // creating depth. The content lifts and fades for a cinematic exit.
      const parallax = (selector: string, y: number, scale = 1) =>
        gsap.to(selector, {
          yPercent: y,
          scale,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

      parallax(".hero-grid", 28, 1.12);
      parallax(".hero-orb-1", 55);
      parallax(".hero-orb-2", -40);

      gsap.to(".hero-content", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // Living glows: slow, looping drift so the hero never feels static.
      gsap.to(".hero-orb-1", {
        x: 60,
        y: 40,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".hero-orb-2", {
        x: -50,
        y: -30,
        duration: 11,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Tech grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />

      {/* Ambient corner glows */}
      <div className="hero-orb-1 pointer-events-none absolute -left-40 top-10 size-[40rem] rounded-full bg-brand/10 blur-[120px]" />
      <div className="hero-orb-2 pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-glow/10 blur-[120px]" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-glow/70"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{ y: [0, -26, 0], opacity: [0, 0.8, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      <div className="hero-content relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-4xl">
          <h1 className="font-display text-balance text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
            <motion.span
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              initial="hidden"
              animate="show"
              className="block"
            >
              {TITLE_PART_ONE.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block">
                  {w}&nbsp;
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              variants={{ show: { transition: { delayChildren: 0.2, staggerChildren: 0.06 } } }}
              initial="hidden"
              animate="show"
              className="block"
            >
              {TITLE_PART_TWO.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block">
                  {w}&nbsp;
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
          >
            Criamos estruturas digitais que ajudam negócios a crescer com
            tecnologia e estratégia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <WhatsAppButton message="Olá! Quero solicitar um diagnóstico do meu negócio com a GenMek.">
              Solicitar Diagnóstico
            </WhatsAppButton>
            <a
              href="#solucoes"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/[0.02] px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-glow/50 hover:bg-white/[0.05]"
            >
              Conhecer Soluções
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
