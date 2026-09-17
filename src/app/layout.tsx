import type { Metadata } from "next";
import "./globals.css";
import "./hero-v16.css";
import "./alignment-v17.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr. Tasks — Gestão de trabalho com clareza operacional",
    template: "%s | Dr. Tasks",
  },
  description: site.description,
  applicationName: "Dr. Tasks",
  alternates: { canonical: "/" },
  keywords: ["gestão de tarefas","fluxo de trabalho","gestão de projetos","organização operacional","produtividade da equipe","acompanhamento de tarefas","Dr. Tasks","FluxOS"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "Dr. Tasks",
    title: "Dr. Tasks — O trabalho avança quando todos sabem o próximo passo.",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "Dr. Tasks", description: site.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dr. Tasks",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: site.description,
    url: site.url,
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL", description: "Teste gratuito — condição comercial a confirmar" },
  };
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
