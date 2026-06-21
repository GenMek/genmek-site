"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Entendemos o seu negócio, suas metas e onde estão os gargalos digitais.",
  },
  {
    n: "02",
    title: "Planejamento",
    text: "Desenhamos a estrutura ideal e o caminho mais curto até o resultado.",
  },
  {
    n: "03",
    title: "Construção",
    text: "Desenvolvemos com tecnologia moderna, design afiado e foco em conversão.",
  },
  {
    n: "04",
    title: "Lançamento",
    text: "Colocamos no ar com performance, testes e tudo pronto para escalar.",
  },
  {
    n: "05",
    title: "Evolução",
    text: "Acompanhamos, medimos e otimizamos continuamente para crescer mais.",
  },
];

export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Progress line fills as the section scrolls through the viewport.
      gsap.to(".process-line-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-track",
          start: "top 70%",
          end: "bottom 70%",
          scrub: reduce ? false : 0.5,
        },
      });

      // Each step lights up + slides in when reached.
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 80%" },
        });

        ScrollTrigger.create({
          trigger: step,
          start: "top 65%",
          end: "bottom 35%",
          onToggle: (self) =>
            step.classList.toggle("is-active", self.isActive),
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="processo" className="relative py-24 sm:py-32">
      <div ref={root} className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Processo"
          title="Como trabalhamos"
          description="Um método claro, etapa por etapa — como uma máquina sendo construída peça a peça."
        />

        <div className="process-track relative mx-auto mt-16 max-w-3xl">
          {/* Rail */}
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-line sm:left-[31px]" />
          <div className="process-line-fill absolute left-[27px] top-2 bottom-2 w-px origin-top scale-y-0 bg-gradient-to-b from-glow to-brand shadow-[0_0_12px_0_var(--color-glow)] sm:left-[31px]" />

          <ul className="flex flex-col gap-10 sm:gap-12">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="process-step group relative flex items-start gap-6 pl-0"
              >
                <span className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-bg-soft font-display text-sm font-semibold text-muted transition-all duration-500 group-[.is-active]:border-glow group-[.is-active]:text-ink group-[.is-active]:shadow-[0_0_28px_-4px_var(--color-glow)]">
                  {s.n}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-300 sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
