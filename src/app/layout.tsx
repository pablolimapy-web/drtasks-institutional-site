import type { Metadata } from "next";
import "./globals.css";
import "./site-shell.css";
import "./home.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dr. Tasks — Gestão operacional por estágios",
    template: "%s | Dr. Tasks",
  },
  description: site.description,
  applicationName: "Dr. Tasks",
  keywords: ["gestão de ordens de serviço","gestão operacional por estágios","FluxOS","gestão de projetos","construção civil","manutenção","serviços técnicos","Dr. Tasks"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: "Dr. Tasks",
    title: "Dr. Tasks — Saiba o que está acontecendo em cada OS",
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
