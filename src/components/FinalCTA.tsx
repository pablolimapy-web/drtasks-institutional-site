import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import { primaryCta, secondaryCta } from "@/lib/commercial";

export function FinalCTA() {
  return <section className="section final-section"><div className="container final-cta final-cta-v18"><div className="final-glow"/><div><span className="eyebrow eyebrow-dark">Próximo passo</span><h2>Pare de procurar o status. Comece a conduzir o próximo passo.</h2><p>Veja como o FluxOS organiza OS, estágios, responsáveis, prazos, bloqueios e próximas ações em uma leitura operacional.</p></div><div className="final-actions"><Link href={primaryCta.href} className="button button-primary">{primaryCta.label} <ArrowRightIcon /></Link><a href={secondaryCta.href} className="button button-dark-secondary">{secondaryCta.label}</a></div><div className="final-flow" aria-hidden="true"><span/><span/><span/><span className="done"/></div></div></section>;
}
