import { ChartIcon, HistoryIcon, LayersIcon, UsersIcon, WorkflowIcon, SparkIcon } from "./Icons";
import { Reveal } from "./Reveal";

const features = [
  { title: "FluxOS", body: "Transforme processos em etapas claras e acompanhe a evolução do trabalho.", icon: WorkflowIcon, visual: "flow" },
  { title: "Projetos", body: "Organize entregas, responsáveis, prazos e progresso em um só lugar.", icon: LayersIcon, visual: "bars" },
  { title: "Equipe e tarefas", body: "Distribua trabalho, acompanhe prioridades e mantenha o contexto acessível.", icon: UsersIcon, visual: "people" },
  { title: "Acompanhamento", body: "Veja status, pendências e próximos passos sem depender de atualizações manuais.", icon: ChartIcon, visual: "chart" },
  { title: "Histórico", body: "Mantenha decisões e movimentações registradas para reduzir retrabalho.", icon: HistoryIcon, visual: "history" },
  { title: "Gestão operacional", body: "Centralize a rotina da equipe e crie uma forma consistente de trabalhar.", icon: SparkIcon, visual: "ops" },
];

function MiniVisual({ type }: { type: string }) {
  if (type === "flow") return <div className="mini-flow"><i/><b/><b/><em/></div>;
  if (type === "bars") return <div className="mini-bars"><span style={{width:'84%'}}/><span style={{width:'66%'}}/><span style={{width:'92%'}}/></div>;
  if (type === "people") return <div className="mini-people"><span>D</span><span>M</span><span>J</span><i/></div>;
  if (type === "chart") return <div className="mini-chart"><span/><span/><span/><span/></div>;
  if (type === "history") return <div className="mini-history"><i/><b/><em/></div>;
  return <div className="mini-ops"><span/><span/><span/></div>;
}

export function Features() {
  return (
    <section className="section features-section" id="funcionalidades">
      <div className="container surface features-surface">
        <Reveal>
          <div className="section-head split-head"><div><span className="eyebrow">Funcionalidades</span><h2>Tudo conectado ao trabalho.</h2></div><p>O Dr. Tasks reúne as informações que a equipe precisa para executar, acompanhar e concluir com menos ruído.</p></div>
        </Reveal>
        <div className="features-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return <Reveal key={feature.title} delay={i*55}><article className="feature-card"><div className="feature-icon"><Icon /></div><h3>{feature.title}</h3><p>{feature.body}</p><MiniVisual type={feature.visual}/></article></Reveal>
          })}
        </div>
      </div>
    </section>
  );
}
