/**
 * Central configuration for the GenMek site.
 *
 * ─────────────────────────────────────────────────────────────
 *  ⚠️  SWAP ME: Replace WHATSAPP_NUMBER with the real number.
 *      Format: country code + DDD + number, digits only.
 *      Example (Brazil): "5511999999999"
 * ─────────────────────────────────────────────────────────────
 */
export const WHATSAPP_NUMBER = "5500000000000"; // <-- PLACEHOLDER

export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da GenMek e gostaria de solicitar um diagnóstico.";

/** Builds a wa.me deep link with the prefilled message. */
export function whatsappUrl(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL = {
  instagram: "https://instagram.com/genmek",
  email: "contato@genmek.com.br",
};

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Processo", href: "#processo" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;

export const INTRO_PHRASES = [
  "Criando experiências digitais",
  "Construindo soluções",
  "Automatizando processos",
  "Impulsionando negócios",
  "Transformando ideias",
  "Gerando resultados",
] as const;
