"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, staggerContainer, staggerItem } from "@/components/ui/Reveal";

const PHOTOS = [
  {
    src: "/image/midia/fundadores-corredor.jpg",
    alt: "Evandro Castro Marques e Marlon Santana de Oliveira, fundadores da GenMek, sorrindo no corredor do Senac em Campo Grande",
  },
  {
    src: "/image/midia/fundadores-codando.jpg",
    alt: "Os fundadores da GenMek trabalhando juntos em um notebook no laboratório de informática",
  },
  {
    src: "/image/midia/fundadores-laboratorio.webp",
    alt: "Os fundadores da GenMek posando no laboratório de informática onde fizeram o curso",
  },
];

const FEATURED = [
  {
    outlet: "TOP Mídia News",
    date: "01 jul 2026",
    title:
      "Formados em curso gratuito, jovens criam startup focada em soluções inteligentes para empresas em MS",
    excerpt:
      "A reportagem conta como a formação técnica gratuita virou o ponto de partida da GenMek e o foco em automatizar processos de empresas.",
    href: "https://www.topmidianews.com.br/cidades/formados-em-curso-gratuito-jovens-criam-startup-focada-em-solucoes/242714/",
  },
  {
    outlet: "IDEST",
    date: "30 jun 2026",
    title:
      "Qualificação, tecnologia e empreendedorismo: jovens transformam formação do Governo de MS em startup de inovação",
    excerpt:
      "Sites, sistemas, aplicativos e automações com IA para pequenas e médias empresas: a trajetória de Evandro e Marlon até a GenMek.",
    href: "https://idest.com.br/variedade/qualificacao-tecnologia-e-empreendedorismo-jovens-transformam-formacao-do-governo-de-ms-em-startup-de-inovacao",
  },
  {
    outlet: "BNC Notícias",
    date: "30 jun 2026",
    title:
      "Qualificação, tecnologia e empreendedorismo: Governo de MS prepara jovens para liderar a nova economia digital",
    excerpt:
      "Ex-alunos do Voucher Desenvolvedor, os fundadores da GenMek aparecem como exemplo de jovens liderando a economia digital de MS.",
    href: "https://bncnoticias.com.br/noticia/952/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital",
  },
];

const ALSO_IN = [
  {
    outlet: "Agência de Notícias do Governo de MS",
    href: "https://agenciadenoticias.ms.gov.br/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital/",
  },
  {
    outlet: "Fátima News",
    href: "https://www.fatimanews.com.br/tecnologia/qualificacao-tecnologia-e-empreendedorismo-governo-prepara-jovens/236627/",
  },
  {
    outlet: "O Progresso",
    href: "https://progresso.com.br/index.php/2026/06/30/ms-prepara-jovens-para-liderar-a-economia-digital/",
  },
  {
    outlet: "Pantanal News",
    href: "https://www.pantanalnews.com.br/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital/",
  },
  {
    outlet: "A Gazeta News",
    href: "https://www.agazetanews.com.br/2026/06/30/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital/",
  },
  {
    outlet: "Amambai Notícias",
    href: "https://www.amambainoticias.com.br/2026/06/30/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital/",
  },
  {
    outlet: "Rota Bioceânica",
    href: "https://rotabioceanica.com.br/2026/07/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital/",
  },
  {
    outlet: "Corumbá MS",
    href: "https://corumbams.com/qualificacao-tecnologia-e-empreendedorismo-governo-de-ms-prepara-jovens-para-liderar-a-nova-economia-digital/",
  },
];

export function Media() {
  return (
    <section id="midia" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Na mídia"
          title="GenMek na mídia"
          description="Do Voucher Desenvolvedor à nossa própria startup: a trajetória da GenMek contada pela imprensa de Mato Grosso do Sul."
        />

        <Reveal className="mt-14">
          <figure>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2">
              {PHOTOS.map((p, i) => (
                <div
                  key={p.src}
                  className={`group relative overflow-hidden rounded-2xl border border-line bg-bg-soft sm:rounded-3xl ${
                    i === 0
                      ? "col-span-2 aspect-[3/2] lg:row-span-2 lg:aspect-auto"
                      : "aspect-[4/3] lg:aspect-auto lg:min-h-56"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={
                      i === 0
                        ? "(max-width: 1024px) 100vw, 66vw"
                        : "(max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>
            <figcaption className="mt-3 text-right text-xs text-muted/70">
              Fotos: Bruno Rezende / Governo de MS
            </figcaption>
          </figure>
        </Reveal>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {FEATURED.map((a) => (
            <motion.li key={a.href} variants={staggerItem}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="surface group flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-glow/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-glow">
                    <Newspaper className="size-3.5" />
                    {a.outlet}
                  </span>
                  <span className="text-xs text-muted">{a.date}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">
                  {a.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {a.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Ler matéria
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="mt-10 flex flex-col items-center gap-4">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            Também repercutiu em
          </span>
          <ul className="flex flex-wrap justify-center gap-2">
            {ALSO_IN.map((o) => (
              <li key={o.href}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="inline-flex items-center gap-1 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-glow/40 hover:text-ink"
                >
                  {o.outlet}
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
