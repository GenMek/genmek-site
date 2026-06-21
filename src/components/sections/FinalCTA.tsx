"use client";

import { motion } from "motion/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

// Lines converging toward the center — the "structure assembling" motif.
const RAYS = Array.from({ length: 12 }, (_, i) => i);

export function FinalCTA() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      {/* Intense central glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[26rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/20 blur-[100px]" />

      {/* Converging rays */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {RAYS.map((i) => (
          <motion.span
            key={i}
            className="absolute h-px w-1/2 origin-right bg-gradient-to-l from-glow/40 to-transparent"
            style={{ rotate: `${(360 / RAYS.length) * i}deg` }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-30" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="text-gradient">Pronto para transformar</span>
          <br />
          <span className="text-gradient-brand">sua presença digital?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
        >
          Vamos entender o seu negócio e construir a solução ideal para o
          próximo nível.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <WhatsAppButton
            className="px-8 py-4 text-base"
            message="Olá GenMek! Quero transformar minha presença digital. Podemos conversar?"
          >
            Falar com a GenMek
          </WhatsAppButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-xs text-muted/70"
        >
          Resposta rápida pelo WhatsApp · Diagnóstico sem compromisso
        </motion.p>
      </div>
    </section>
  );
}
