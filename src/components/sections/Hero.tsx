"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { ArrowDown } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

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

const TITLE_PART_ONE = "Construindo a próxima".split(" ");
const TITLE_PART_TWO = "fase do seu negócio.".split(" ");

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

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      {/* Tech grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60" />

      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />

      {/* Ambient corner glows */}
      <div className="pointer-events-none absolute -left-40 top-10 size-[40rem] rounded-full bg-brand/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-glow/10 blur-[120px]" />

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

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-glow opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-glow" />
            </span>
            Estruturas digitais para empresas crescerem
          </motion.div>

          <h1 className="font-display text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            <motion.span
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              initial="hidden"
              animate="show"
              className="block text-gradient"
            >
              {TITLE_PART_ONE.map((w, i) => (
                <motion.span key={i} variants={word} className="inline-block">
                  {w}&nbsp;
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              variants={{ show: { transition: { delayChildren: 0.3, staggerChildren: 0.08 } } }}
              initial="hidden"
              animate="show"
              className="block text-gradient-brand"
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
            Criamos sites, landing pages, automações e soluções digitais
            projetadas para transformar visitantes em clientes.
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 text-muted"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Role</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
