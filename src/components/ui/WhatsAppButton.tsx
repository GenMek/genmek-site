"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappUrl } from "@/lib/site";

type Variant = "primary" | "ghost" | "solid";

type WhatsAppButtonProps = {
  children: ReactNode;
  /** Optional custom prefilled message for this specific CTA. */
  message?: string;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow/60";

const variants: Record<Variant, string> = {
  // Brand-filled, glowing — the main conversion button.
  primary:
    "bg-brand text-white shadow-[0_0_0_1px_rgba(61,90,254,0.4),0_8px_30px_-6px_rgba(11,14,232,0.7)] hover:bg-glow",
  // Bright white solid (used on dark glow backgrounds).
  solid:
    "bg-ink text-bg hover:bg-white",
  // Outlined / quiet.
  ghost:
    "border border-line bg-white/[0.02] text-ink hover:border-glow/50 hover:bg-white/[0.05]",
};

/** The single conversion primitive — every WhatsApp CTA routes through here. */
export function WhatsAppButton({
  children,
  message,
  variant = "primary",
  className = "",
  withArrow = true,
}: WhatsAppButtonProps) {
  return (
    <motion.a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {/* sheen sweep on hover */}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -inset-x-10 -top-10 h-24 rotate-12 bg-white/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
      )}
      <span className="relative">{children}</span>
      {withArrow && (
        <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </motion.a>
  );
}
