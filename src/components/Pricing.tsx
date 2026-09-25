import Link from "next/link";
import { ArrowRightIcon } from "./Icons";

export function Pricing() {
  return <section className="section pricing-section" id="precos"><div className="container surface pricing-surface pricing-beta"><div><span className="eyebrow">Condição comercial</span><h2>Estamos validando os primeiros planos comerciais.</h2><p>Solicite uma demonstração e receba a condição de lançamento adequada ao seu perfil de operação. Valores, limites, implantação e condições serão publicados quando estiverem formalmente definidos.</p></div><div className="pricing-beta-side"><span>Sem preço inventado</span><span>Sem promessa de desconto</span><span>Sem condição de teste não aprovada</span><Link href="/demo" className="button button-primary">Agendar demonstração <ArrowRightIcon /></Link></div></div></section>;
}
