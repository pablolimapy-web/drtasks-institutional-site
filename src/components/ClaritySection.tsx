import { Reveal } from "./Reveal";

const items = [
  ["01", "Veja o que precisa ser feito", "Tarefas, prioridades e prazos em uma visão simples."],
  ["02", "Saiba quem é responsável", "Cada atividade tem dono, contexto e acompanhamento."],
  ["03", "Entenda o próximo movimento", "O fluxo mostra onde o trabalho está e qual é a próxima etapa."],
];

export function ClaritySection() {
  return (
    <section className="section clarity-section">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-narrow">
            <span className="eyebrow">Clareza operacional</span>
            <h2>O essencial fica impossível de ignorar.</h2>
            <p>Quando tudo está espalhado, a equipe perde tempo procurando contexto. O Dr. Tasks concentra o que precisa ser feito, quem está cuidando e o que vem depois.</p>
          </div>
        </Reveal>
        <div className="clarity-list">
          {items.map(([n,t,d], i) => (
            <Reveal key={n} delay={i*80}>
              <article className="clarity-row">
                <span className="row-number">{n}</span><h3>{t}</h3><p>{d}</p><span className="row-arrow">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
