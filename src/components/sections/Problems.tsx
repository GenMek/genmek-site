"use client";

import { motion } from "motion/react";
import {
  AlarmClockOff,
  MousePointerClick,
  Workflow,
  MessageSquareWarning,
  WifiOff,
  Map,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/components/ui/Reveal";

const PROBLEMS = [
  {
    icon: AlarmClockOff,
    title: "Site desatualizado",
    text: "Uma presença antiga passa a impressão errada e afasta clientes.",
  },
  {
    icon: MousePointerClick,
    title: "Baixa conversão",
    text: "Visitantes chegam, mas não viram clientes. Algo trava no caminho.",
  },
  {
    icon: WifiOff,
    title: "Falta de presença digital",
    text: "Quem não é encontrado online, simplesmente não existe para o mercado.",
  },
  {
    icon: Workflow,
    title: "Processos manuais",
    text: "Tarefas repetitivas consomem tempo que deveria gerar receita.",
  },
  {
    icon: MessageSquareWarning,
    title: "Atendimento desorganizado",
    text: "Leads se perdem entre mensagens, planilhas e respostas atrasadas.",
  },
  {
    icon: Map,
    title: "Ausência de estratégia digital",
    text: "Sem direção, cada ação online vira esforço desperdiçado.",
  },
];

export function Problems() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="O diagnóstico"
          title="Seu negócio está perdendo oportunidades?"
          description="A maioria das empresas perde clientes por falhas silenciosas na sua estrutura digital. Reconhece alguma delas?"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROBLEMS.map((p) => (
            <motion.article
              key={p.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className="surface group relative overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-glow/40"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x,50%)_var(--y,0%),rgba(61,90,254,0.12),transparent_60%)]" />
              <span className="relative inline-flex size-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-glow transition-all duration-300 group-hover:border-glow/40 group-hover:shadow-[0_0_20px_-4px_var(--color-glow)]">
                <p.icon className="size-5" />
              </span>
              <h3 className="relative mt-4 font-display text-lg font-semibold text-ink">
                {p.title}
              </h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted">
                {p.text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
