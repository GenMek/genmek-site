"use client";

import { MessageCircle, Camera, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, SOCIAL, whatsappUrl } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={32} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Construímos estruturas digitais para empresas crescerem através de
              tecnologia, design e estratégia.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink">
              Navegação
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ink">
              Contato
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <MessageCircle className="size-4 text-glow" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Camera className="size-4 text-glow" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SOCIAL.email}`}
                  className="inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  <Mail className="size-4 text-glow" />
                  {SOCIAL.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 hairline" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted/70 sm:flex-row">
          <p>© {year} GenMek. Todos os direitos reservados.</p>
          <p className="font-display tracking-tight">
            Construindo a próxima fase do seu negócio.
          </p>
        </div>
      </div>
    </footer>
  );
}
