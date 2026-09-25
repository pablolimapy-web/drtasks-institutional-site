import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import { Reveal } from "./Reveal";

const segments = [
  { title: "Construção e obras", body: "Acompanhe OS, contratos, etapas de orçamento, aprovação, compra, execução, medição e entrega.", tag: "Entrada principal", example: "Ex.: reforma, obra, contrato ou frente simultânea", modules: "FluxOS · Tarefas · Financeiro" },
  { title: "Manutenção e serviços de campo", body: "Organize solicitações, responsáveis, prazos, bloqueios e retorno da equipe de campo sem perder o histórico.", tag: "Expansão próxima", example: "Ex.: manutenção predial e atendimento técnico", modules: "FluxOS · Tarefas · Auditoria" },
  { title: "Operações por projeto ou contrato", body: "Conduza trabalhos que passam por etapas, aprovações e entregas com uma próxima ação sempre visível.", tag: "Produto horizontal", example: "Ex.: engenharia, contratos e serviços técnicos", modules: "FluxOS · Projetos · Tarefas" },
];

export function Segments() {
  return (
    <section className="section segments-section" id="segmentos">
      <div className="container">
        <Reveal>
          <div className="section-head section-head-wide">
            <span className="eyebrow">Para quem é</span>
            <h2>Começamos onde a dor é mais reconhecível.</h2>
            <p>O produto foi desenhado para operações por estágios, mas a entrada comercial prioriza construção e contextos técnicos próximos.</p>
          </div>
        </Reveal>
        <div className="segments-grid segments-grid-three">
          {segments.map((item, i) => (
            <Reveal delay={i * 70} key={item.title}>
              <article className="segment-card segment-card-v18">
                <span className="segment-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="segment-example">{item.example}</div>
                <small>{item.modules}</small>
                <span className="segment-arrow">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
        <Link href="/segmentos/construcao" className="text-link section-deep-link">
          Saiba mais sobre construção e obras <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
