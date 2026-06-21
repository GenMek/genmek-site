"use client";

import { motion } from "motion/react";
import {
  Zap,
  Layers,
  Gauge,
  Sparkles,
  HeartHandshake,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const ITEMS = [
  {
    icon: Zap,
    title: "Design focado em conversão",
    text: "Cada elemento existe para guiar o visitante até a ação.",
  },
  {
    icon: Layers,
    title: "Tecnologia moderna",
    text: "Stack atual, segura e preparada para escalar com você.",
  },
  {
    icon: Gauge,
    title: "Performance e velocidade",
    text: "Carregamento rápido que retém usuários e agrada o Google.",
  },
  {
    icon: Sparkles,
    title: "Experiência do usuário",
    text: "Navegação fluida e intuitiva em qualquer dispositivo.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento próximo",
    text: "Você fala direto com quem constrói. Sem intermediários.",
  },
  {
    icon: Wrench,
    title: "Soluções sob medida",
    text: "Nada de templates engessados — feito para o seu contexto.",
  },
];

export function Differentials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que escolher a GenMek"
          description="Não entregamos só um produto. Entregamos uma vantagem competitiva."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ITEMS.map((it) => (
            <motion.div
              key={it.title}
              variants={staggerItem}
              data-cursor="hover"
              className="surface group flex items-start gap-4 rounded-2xl p-6 transition-colors duration-300 hover:border-glow/40"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.02] text-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <it.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {it.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {it.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
