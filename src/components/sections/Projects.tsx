"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Sparkles, X } from "lucide-react";
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
  /** Optional mockup/screenshot shown over the gradient header. */
  image?: string;
  /** Optional live project URL — when set, the case becomes clickable. */
  liveUrl?: string;
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
    image: "/image/landing.png",
    liveUrl: "https://resort-website-six.vercel.app/",
  },
  {
    id: "p2",
    title: "Site profissional completo",
    category: "Website",
    summary:
      "Site completo e responsivo para apresentar seu negócio com profissionalismo.",
    detail:
      "Várias páginas (início, serviços, sobre e contato), design responsivo que fica perfeito no celular e otimização para aparecer no Google. A presença online que todo negócio precisa para ser levado a sério.",
    tags: ["Responsivo", "SEO", "Multi-páginas"],
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
    image: "/image/automacao.png",
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
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-soft">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`Mockup — ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Light bottom fade only — keeps badges legible. */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          </>
        ) : (
          <>
            {/* Dark base with only a faint accent glow. */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-[0.18]`}
            />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/20" />
          </>
        )}
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

/**
 * Open brief field — a free-form input so any lead can describe whatever they
 * need (idea, demand or specific project) without being boxed into the cases
 * above. The text becomes the prefilled WhatsApp message, routed through the
 * same round-robin distributor as every other CTA.
 */
function OpenBrief() {
  const [idea, setIdea] = useState("");
  const trimmed = idea.trim();

  const message = trimmed
    ? `Olá! Tenho uma ideia/demanda para a GenMek:\n\n"${trimmed}"\n\nConsegue me ajudar com isso?`
    : "Olá! Tenho uma ideia/demanda e gostaria de conversar com a GenMek sobre ela.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="surface mt-16 overflow-hidden rounded-3xl p-6 sm:p-10"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
            <Sparkles className="size-3.5 text-glow" />
            Sua ideia
          </span>
          <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Tem um projeto em mente?
          </h3>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted sm:text-base">
            Não importa se está na lista acima ou não. Descreva qualquer ideia,
            demanda ou desafio do seu negócio a gente avalia e te responde
            como podemos transformar isso em realidade.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full lg:max-w-md"
        >
          <label htmlFor="open-brief" className="sr-only">
            Descreva sua ideia, demanda ou projeto
          </label>
          <textarea
            id="open-brief"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            rows={4}
            placeholder="Ex.: Preciso de um site que integre com meu sistema de estoque e gere relatórios automáticos…"
            className="w-full resize-none rounded-2xl border border-line bg-white/[0.02] px-4 py-3.5 text-sm leading-relaxed text-ink placeholder:text-muted/60 transition-colors focus:border-glow/50 focus:outline-none focus:ring-2 focus:ring-glow/30"
          />
          <WhatsAppButton className="mt-4 w-full" message={message}>
            Enviar minha ideia
          </WhatsAppButton>
        </form>
      </div>
    </motion.div>
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

        <OpenBrief />
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
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-soft">
                {active.image ? (
                  <>
                    <Image
                      src={active.image}
                      alt={`Mockup — ${active.title}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 512px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-soft/60 via-transparent to-transparent" />
                  </>
                ) : (
                  <>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${active.accent} opacity-[0.18]`}
                    />
                    <div className="absolute inset-0 bg-grid opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-soft via-bg-soft/50 to-bg-soft/20" />
                  </>
                )}
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
                <div className="mt-7 flex flex-col gap-3">
                  <WhatsAppButton
                    className="w-full"
                    message={`Olá! Vi o case "${active.title}" no site e quero algo parecido para o meu negócio.`}
                  >
                    Quero um projeto assim
                  </WhatsAppButton>
                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white/[0.02] px-6 py-3 text-sm font-semibold tracking-tight text-ink transition-colors duration-300 hover:border-glow/50 hover:bg-white/[0.05]"
                    >
                      Ver projeto ao vivo
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
