import { Reveal } from "./Reveal";

export function SocialProof() {
  return (
    <section className="section social-section">
      <div className="container social-grid">
        <Reveal><div><span className="eyebrow">Para quem faz acontecer</span><h2>Construído para quem precisa fazer o trabalho acontecer.</h2><div className="audience-chips"><span>Operações</span><span>Projetos</span><span>Equipes</span></div></div></Reveal>
        <Reveal delay={100}><blockquote className="quote-card"><span className="quote-mark">“</span><p>O Dr. Tasks deixa claro o que está acontecendo, quem está cuidando e qual é o próximo passo.</p><footer>Espaço reservado para um depoimento real.</footer></blockquote></Reveal>
      </div>
    </section>
  );
}
