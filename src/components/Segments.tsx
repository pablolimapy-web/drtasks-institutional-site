import { Reveal } from "./Reveal";

const segments = [
  ["Escritórios e operações", "Centralize demandas, aprovações e prazos sem depender de planilhas e mensagens soltas.", "Operação administrativa"],
  ["Prestadores de serviço", "Acompanhe o que foi solicitado, quem está executando, o que falta e quando entregar.", "Serviços"],
  ["Construção e operação", "Organize atividades de campo e escritório, responsáveis e acompanhamento de ponta a ponta.", "Campo + escritório"],
  ["Times de projetos", "Conecte tarefas, etapas, entregas e decisões para que o projeto continue avançando.", "Projetos"],
  ["Comercial e backoffice", "Crie processos claros entre atendimento, operação e áreas de apoio, reduzindo perda de contexto.", "Handoffs"],
  ["Pequenas e médias empresas", "Estruture a operação sem transformar a gestão em mais uma camada de complexidade.", "Crescimento"],
];

export function Segments() {
  return (
    <section className="section segments-section" id="segmentos">
      <div className="container">
        <Reveal><div className="section-head section-head-wide"><span className="eyebrow">Para quem é</span><h2>Feito para equipes que precisam organizar e executar melhor.</h2><p>O Dr. Tasks se adapta à operação sem exigir que a equipe transforme a rotina em um sistema complicado.</p></div></Reveal>
        <div className="segments-grid">
          {segments.map(([title, body, tag], i) => <Reveal delay={i*55} key={title}><article className="segment-card"><span className="segment-tag">{tag}</span><h3>{title}</h3><p>{body}</p><span className="segment-arrow">↗</span></article></Reveal>)}
        </div>
      </div>
    </section>
  );
}
