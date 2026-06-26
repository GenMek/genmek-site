/**
 * Central configuration for the GenMek site.
 *
 * ─────────────────────────────────────────────────────────────
 *  Leads are distributed between these numbers via round robin
 *  (Lead 1 → A, Lead 2 → B, Lead 3 → A, …). The atomic counter
 *  lives server-side — see `src/app/api/whatsapp/route.ts`.
 *  Format: country code + DDD + number, digits only.
 * ─────────────────────────────────────────────────────────────
 */
export const WHATSAPP_NUMBERS = [
  "5567991942022", // Número A
  "5567992264043", // Número B
] as const;

export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da GenMek e gostaria de solicitar um diagnóstico.";

/**
 * Client-side CTA link. Routes every WhatsApp click through the round-robin
 * distributor instead of pointing at a fixed number, so the assignment is
 * decided atomically on the server at click time.
 */
export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `/api/whatsapp?m=${encodeURIComponent(message)}`;
}

/** Builds a wa.me deep link for a specific number. (Used server-side.) */
export function whatsappUrl(
  number: string,
  message: string = WHATSAPP_MESSAGE,
): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL = {
  instagram: "https://instagram.com/agenciagenmek",
  email: "contato@genmek.com.br",
};

export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Processo", href: "#processo" },
  // { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;
