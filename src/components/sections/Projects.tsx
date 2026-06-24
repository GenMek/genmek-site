"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  detail: string;
  tags: string[];
  accent: string;
};

// Placeholder cases — structured so real projects drop straight in.
const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Landing de alta conversão",
    category: "Landing Page",
    summary:
      "Página única desenhada para capturar e qualificar leads em escala.",
    detail:
      "Estrutura de copy persuasiva, prova social e um único CTA dominante. Construída para velocidade e otimizada para campanhas de tráfego pago.",
    tags: ["Next.js", "Copywriting", "Tráfego pago"],
    accent: "from-[#0b0ee8] to-[#3d5afe]",
  },
  {
    id: "p2",
    title: "Site institucional premium",
    category: "Site Institucional",
    summary: "Presença digital sólida que transmite autoridade de marca.",
    detail:
      "Identidade visual consistente, animações sutis e arquitetura de conteúdo pensada para SEO e credibilidade.",
    tags: ["Design", "SEO", "Branding"],
    accent: "from-[#3d5afe] to-[#7c3aed]",
  },
  {
    id: "p3",
    title: "Automação de atendimento",
    category: "Automação",
    summary: "Fluxo que organiza leads e responde automaticamente.",
    detail:
      "Integração entre formulários, WhatsApp e CRM, eliminando trabalho manual e garantindo que nenhum lead seja perdido.",
    tags: ["Automação", "Integrações", "CRM"],
    accent: "from-[#0ea5e9] to-[#3d5afe]",
  },
  {
    id: "p4",
    title: "Sistema web sob medida",
    category: "Sistema Web",
    summary: "Plataforma interna para operar e escalar o negócio.",
    detail:
      "Dashboard personalizado, controle de acessos e relatórios em tempo real, tudo construído para o fluxo específico do cliente.",
    tags: ["Dashboard", "Auth", "Tempo real"],
    accent: "from-[#6366f1] to-[#0b0ee8]",
  },
];

function ParallaxCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Alternate parallax direction for a layered feel.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [40, -40] : [20, -60],
  );

  return (
    <motion.button
      ref={ref}
      style={{ y }}
      onClick={onOpen}
      data-cursor="hover"
      whileHover={{ scale: 1.015 }}
      className="group surface relative block w-full overflow-hidden rounded-3xl text-left"
    >
      {/* Visual header (gradient placeholder for future imagery) */}
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br ${project.accent}`}
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
          {project.category}
        </span>
        <span className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
      </div>
    </motion.button>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projetos"
          title="Construções em destaque"
          description="Uma amostra do tipo de estrutura digital que entregamos. Novos cases em breve."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ParallaxCard
              key={p.id}
              project={p}
              index={i}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Fechar"
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="surface relative w-full max-w-lg overflow-hidden rounded-t-3xl sm:rounded-3xl"
            >
              <div
                className={`relative aspect-[16/9] w-full bg-gradient-to-br ${active.accent}`}
              >
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-soft to-transparent" />
                <button
                  onClick={() => setActive(null)}
                  aria-label="Fechar"
                  className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-glow">
                  {active.category}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {active.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <WhatsAppButton
                    className="w-full"
                    message={`Olá! Vi o case "${active.title}" no site e quero algo parecido para o meu negócio.`}
                  >
                    Quero um projeto assim
                  </WhatsAppButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
