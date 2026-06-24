# GenMek — Landing Page

Premium, highly interactive landing page for **GenMek**, built to convert visitors into WhatsApp leads.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion (`motion`)**, **GSAP + ScrollTrigger**, and **lucide-react**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint
```

## ⚠️ Before going live — swap these

All editable content lives in **`src/lib/site.ts`**:

| What | Constant | Notes |
| --- | --- | --- |
| **WhatsApp numbers** | `WHATSAPP_NUMBERS` | The two numbers leads are distributed between via round robin. Country code + DDD + number, digits only. |
| Default WhatsApp message | `WHATSAPP_MESSAGE` | Prefilled text for the deep link. |
| Instagram / email | `SOCIAL` | Footer links. |
| Nav items | `NAV_LINKS` | |

### Lead distribution (round robin)

Every WhatsApp CTA points to `/api/whatsapp`, a Route Handler that atomically
increments a shared counter and 302-redirects to the next number
(Lead 1 → A, Lead 2 → B, Lead 3 → A, …). The counter lives in **Upstash Redis**
(`INCR`), so it's exact and concurrency-safe even across serverless instances.

**Setup:** add the **Upstash for Redis** integration on Vercel (this is what
"Vercel KV" provisions now). It injects `KV_REST_API_URL` and
`KV_REST_API_TOKEN` automatically. For local dev, run `vercel env pull`.
Without these vars the route falls back to an in-memory counter (single
instance only — **not** exact in production).

## Structure

```
src/
  app/
    layout.tsx        # fonts (Space Grotesk + Inter), SEO metadata
    page.tsx          # composes all sections (server component)
    globals.css       # Tailwind v4 theme + brand palette + utilities
  lib/site.ts         # 👈 single source of truth for content & WhatsApp
  components/
    IntroScreen.tsx   # cinematic brand intro (once per session)
    ScrollProgress.tsx
    CursorGlow.tsx    # custom cursor (desktop only)
    Header.tsx        # transparent → glass on scroll
    sections/         # Hero, About, Problems, Solutions, Process,
                      # Differentials, Projects, FinalCTA, Footer
    ui/               # Logo, WhatsAppButton, Reveal, SectionHeading
```

## Notes

- **Intro screen** plays once per browser session (`sessionStorage`); reloads skip straight to the hero.
- **Custom cursor** only activates on fine-pointer (desktop) devices.
- All motion respects `prefers-reduced-motion`.
- The **Process** timeline uses GSAP ScrollTrigger; all other animations use `motion`.
- **Projects** are placeholder cases in `src/components/sections/Projects.tsx` — structured so real cases drop straight in.
