import Link from "next/link";
import { Logo } from "./Logo";

export function InstitutionalPlaceholder({ eyebrow, title, text, primaryLabel = "Voltar para a Home", primaryHref = "/" }: { eyebrow: string; title: string; text: string; primaryLabel?: string; primaryHref?: string }) {
  return <main className="placeholder-page"><div className="placeholder-nav"><Link href="/"><Logo/></Link></div><div className="placeholder-glow"/><section><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="hero-actions"><Link href={primaryHref} className="button button-primary">{primaryLabel}</Link><Link href="/" className="button button-secondary">Voltar para a Home</Link></div></section></main>
}
