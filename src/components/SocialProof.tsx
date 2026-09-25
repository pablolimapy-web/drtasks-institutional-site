import { Reveal } from "./Reveal";

export function SocialProof() {
  return <section className="section social-section beta-section"><div className="container beta-shell"><Reveal><div><span className="eyebrow">Prova real, quando existir</span><h2>Programa beta em construção.</h2><p>As primeiras histórias serão publicadas com autorização, contexto, método e resultados verificáveis.</p></div></Reveal><Reveal delay={80}><div className="beta-card"><span className="beta-dot"/><strong>Sem depoimentos inventados.</strong><p>Enquanto os primeiros casos não forem autorizados, o site não usa logos, avaliações, métricas de ROI ou frases atribuídas a clientes.</p></div></Reveal></div></section>;
}
