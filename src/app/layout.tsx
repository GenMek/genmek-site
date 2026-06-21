import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://genmek.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GenMek — Construindo a próxima fase do seu negócio",
    template: "%s · GenMek",
  },
  description:
    "A GenMek constrói estruturas digitais para empresas crescerem: sites, landing pages, automações e sistemas web projetados para transformar visitantes em clientes.",
  keywords: [
    "GenMek",
    "desenvolvimento web",
    "landing page",
    "automações",
    "sistemas web",
    "estratégia digital",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "GenMek",
    title: "GenMek — Construindo a próxima fase do seu negócio",
    description:
      "Tecnologia, design e estratégia para transformar visitantes em clientes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GenMek — Construindo a próxima fase do seu negócio",
    description:
      "Tecnologia, design e estratégia para transformar visitantes em clientes.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
