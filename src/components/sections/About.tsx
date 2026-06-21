"use client";

import { motion } from "motion/react";
import { Cpu, Palette, Target, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const PILLARS = [
  {
    icon: Cpu,
    title: "Tecnologia",
    text: "Stack moderna e performática como base de tudo que construímos.",
  },
  {
    icon: Palette,
    title: "Design",
    text: "Interfaces sofisticadas pensadas para guiar e converter.",
  },
  {
    icon: Target,
    title: "Estratégia",
    text: "Cada decisão alinhada aos objetivos reais do seu negócio.",
  },
  {
    icon: TrendingUp,
    title: "Resultados",
    text: "Soluções medidas pelo crescimento que geram, não pela estética.",
  },
];

export function About() {
  return (
    <section id="quem-somos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="Quem Somos"
            title="Mais que desenvolvimento. Construção digital."
            description="A GenMek nasceu para ajudar empresas a crescer através de tecnologia, design estratégico e soluções digitais que geram resultados reais."
          />

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {PILLARS.map((p) => (
              <motion.li
                key={p.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                data-cursor="hover"
                className="surface group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-glow/40"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-glow/0 blur-2xl transition-all duration-500 group-hover:bg-glow/20" />
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-glow transition-colors duration-300 group-hover:border-glow/40">
                  <p.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {p.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
