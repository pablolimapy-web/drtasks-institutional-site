import { Reveal } from "./Reveal";

export function BeforeAfter() {
  return (
    <section className="section compare-section">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-narrow">
            <span className="eyebrow">Clareza operacional</span>
            <h2>O Dr. Tasks organiza o que hoje está espalhado.</h2>
          </div>
        </Reveal>
        <div className="compare-grid">
          <Reveal><div className="before-panel"><span className="panel-label">ANTES</span>{["Tarefas em conversas","Prazos na memória","Responsáveis indefinidos","Projetos sem visão de andamento"].map(x => <div className="before-item" key={x}><i/>{x}</div>)}</div></Reveal>
          <div className="compare-arrow" aria-hidden="true">→</div>
          <Reveal delay={100}><div className="after-panel"><div className="after-glow"/><span className="panel-label">DEPOIS</span><h3>Um lugar para saber o que acontece agora.</h3><div className="after-track"><span/><span/><span/><span className="done"/></div><div className="after-cards"><div><strong>Revisão técnica</strong><span>João · Hoje</span></div><div><strong>Cliente aprovou</strong><span>Próximo: concluir</span></div></div></div></Reveal>
        </div>
      </div>
    </section>
  );
}
