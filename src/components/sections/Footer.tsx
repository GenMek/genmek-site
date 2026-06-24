"use client";

import { MessageCircle, Camera, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SOCIAL, whatsappLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden border-t border-line bg-bg-soft/40">
      {/* Texto gigante no fundo */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="whitespace-nowrap text-[20vw] font-bold tracking-tighter text-ink opacity-[0.04]">
          GENMEK
        </span>
      </div>

      {/* Conteúdo */}
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Marca */}
          <div className="space-y-4">
            {/* <Image src="/image/logo-transparente-genmek.png" alt="genmek" width={60} height={60}/> */}
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Construímos estruturas digitais para empresas crescerem através de
              tecnologia, design e estratégia.
            </p>
          </div>

          {/* Navegação */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-ink">
              Navegação
            </h4>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-ink">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
              >
                <MessageCircle className="size-4 text-glow" />
                WhatsApp
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
              >
                <Camera className="size-4 text-glow" />
                Instagram
              </a>
              <span className="inline-flex items-center gap-2.5 text-sm text-muted">
                <Mail className="size-4 text-glow" />
                {SOCIAL.email}
              </span>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-8 text-xs text-muted/70 md:flex-row">
          <span>© {year} GenMek. Todos os direitos reservados.</span>
          <span className="font-display tracking-tight">
            Construindo a próxima fase do seu negócio.
          </span>
        </div>
      </div>
    </footer>
  );
}
