"use client";

import { motion } from "motion/react";
import {
  Globe,
  Rocket,
  Bot,
  Server,
  Plug,
  Compass,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const SOLUTIONS = [
  {
    icon: Globe,
    title: "Sites Institucionais",
    text: "Presença sólida e profissional que transmite autoridade à sua marca.",
  },
  {
    icon: Rocket,
    title: "Landing Pages",
    text: "Páginas de alta conversão desenhadas para um único objetivo: vender.",
  },
  {
    icon: Bot,
    title: "Automações",
    text: "Fluxos que eliminam tarefas manuais e liberam o seu time para crescer.",
  },
  {
    icon: Server,
    title: "Sistemas Web",
    text: "Plataformas sob medida para operar e escalar o seu negócio.",
  },
  {
    icon: Plug,
    title: "Integrações",
    text: "Conectamos suas ferramentas em um ecossistema que funciona sozinho.",
  },
  {
    icon: Compass,
    title: "Consultoria Digital",
    text: "Direção estratégica para cada decisão tecnológica da sua empresa.",
  },
];

export function Solutions() {
  return (
    <section id="solucoes" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-[30rem] max-w-5xl -translate-y-1/2 rounded-full bg-brand/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Soluções"
          title="O que construímos"
          description="Cada serviço é uma peça da sua estrutura digital — projetadas para se conectar e crescer com você."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((s, i) => (
            <motion.article
              key={s.title}
              variants={staggerItem}
              data-cursor="hover"
              className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-bg-soft sm:p-8"
            >
              {/* connecting node */}
              <span className="absolute right-7 top-7 font-mono text-xs text-muted/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-glow transition-all duration-300 group-hover:-translate-y-1 group-hover:border-glow/50 group-hover:shadow-[0_0_24px_-4px_var(--color-glow)]">
                <s.icon className="size-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {s.text}
              </p>
              <span className="mt-5 inline-block h-px w-10 bg-glow/40 transition-all duration-300 group-hover:w-20" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
