import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "./ConstructionPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Construção civil — Obras e contratos com o próximo passo visível',
  'Organize obras, contratos e OS por estágios, conectando projeto, tarefa, responsável, prazo, compras, financeiro e documentos no Dr. Tasks.',
  '/segmentos/construcao',
);

const constructionStages = [
  ["01", "Empenho", "O contexto contratual e a origem da demanda entram antes da execução."],
  ["02", "Orçamento", "Custos, escopo e próximos passos ficam vinculados ao trabalho correto."],
  ["03", "Compra", "Solicitações e cotações mantêm a ligação com projeto ou OS."],
  ["04", "Execução", "Responsável, prazo, situação e tarefas mostram o que precisa avançar."],
  ["05", "Medição", "A etapa fica visível como parte do fluxo, com aging e bloqueios."],
  ["06", "NF", "A documentação financeira pode acompanhar o contexto da operação."],
  ["07", "Entrega", "O histórico continua disponível até o fechamento do trabalho."],
] as const;

const questions = [
  ["01", "Onde a OS está?", "Veja o estágio atual sem interromper a equipe para pedir status."],
  ["02", "Quem precisa agir?", "Responsável, prazo e próxima ação aparecem no mesmo contexto."],
  ["03", "O que está travando?", "Bloqueios e aging ajudam a perceber onde a operação perdeu ritmo."],
  ["04", "Qual é o impacto?", "Compras e financeiro permanecem próximos do projeto ou contrato que originou o custo."],
] as const;

const productConnections = [
  {
    eyebrow: "FluxOS",
    title: "A carteira inteira por estágios.",
    body: "Enxergue volume, risco, aging, bloqueios e próxima ação sem abrir projeto por projeto.",
    href: "/produto/fluxos",
    cta: "Conhecer o FluxOS",
    image: "/hero/fluxos-overview.png",
    alt: "FluxOS do Dr. Tasks mostrando uma carteira operacional por estágios",
  },
  {
    eyebrow: "Projetos e tarefas",
    title: "Do contrato à ação executável.",
    body: "Instituições, workspaces, projetos e tarefas preservam o contexto que sustenta cada frente de trabalho.",
    href: "/produto/projetos-e-tarefas",
    cta: "Ver projetos e tarefas",
    image: "/product/pillars/projects.jpg",
    alt: "Tela real de projetos do Dr. Tasks em visualização Kanban",
  },
  {
    eyebrow: "Financeiro e compras",
    title: "A compra continua ligada à OS.",
    body: "Solicitações, cotações e leitura financeira ficam próximas da operação que gerou a necessidade.",
    href: "/produto/financeiro",
    cta: "Explorar financeiro e compras",
    image: "/product/finance/requests.jpg",
    alt: "Tela real de solicitações de compra do Dr. Tasks",
  },
  {
    eyebrow: "Arquivos",
    title: "Evidências e documentos no mesmo contexto.",
    body: "Arquivos de apoio podem permanecer organizados junto à estrutura operacional, sem virar uma trilha paralela.",
    href: "/produto/recursos",
    cta: "Conhecer recursos operacionais",
    image: "/product/resources/files.jpg",
    alt: "Tela real do módulo de arquivos do Dr. Tasks com dados protegidos",
  },
] as const;

export default function ConstructionPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Construção civil · obras e contratos</span>
              <h1>Obras e contratos com o próximo passo visível.</h1>
              <p>
                Organize ordens de serviço, contratos e projetos por estágios e mantenha responsável, prazo,
                bloqueio, compras, financeiro e documentos próximos da mesma operação.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="#fluxo-da-obra" className="button button-secondary">
                  Ver o fluxo da obra
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroFrame}>
                <Image
                  src="/hero/fluxos-overview.png"
                  alt="FluxOS do Dr. Tasks com visão operacional de obras e contratos"
                  width={1844}
                  height={760}
                  priority
                />
              </div>
              <div className={styles.heroStats}>
                <span>Carteira</span>
                <strong>estágio · risco · responsável · próxima ação</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.questionStrip} aria-label="Perguntas operacionais em obras e contratos">
          <div className={`container ${styles.questionGrid}`}>
            {questions.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} id="fluxo-da-obra">
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Um fluxo configurável</span>
                <h2>Da origem do contrato à entrega, cada etapa deixa um próximo passo.</h2>
              </div>
              <p>
                Empenho, Orçamento, Compra, Execução, Medição, NF e Entrega formam um exemplo de template inicial.
                Os estágios devem refletir o processo real da empresa, não um roteiro rígido imposto pelo sistema.
              </p>
            </header>

            <div className={styles.stageRail}>
              {constructionStages.map(([number, title, description], index) => (
                <article className={styles.stageCard} key={title}>
                  <div className={styles.stageTop}>
                    <span>{number}</span>
                    {index < constructionStages.length - 1 ? <b aria-hidden="true">→</b> : null}
                  </div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>

            <div className={styles.templateNote}>
              <span>Template inicial</span>
              <p>
                O fluxo acima é demonstrativo. A implantação deve traduzir as etapas, responsáveis e regras que a
                operação já usa hoje.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Uma obra, quatro contextos conectados</span>
                <h2>A operação não termina no Kanban. O contexto continua entre execução, compra e evidência.</h2>
              </div>
              <p>
                O Dr. Tasks aproxima as leituras mais importantes da rotina sem apresentar cada módulo como uma
                ilha separada.
              </p>
            </header>

            <div className={styles.connectionStack}>
              {productConnections.map((item, index) => (
                <article className={styles.connectionCard} key={item.eyebrow}>
                  <div className={styles.connectionCopy}>
                    <span>{String(index + 1).padStart(2, "0")} · {item.eyebrow}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <Link href={item.href} className={styles.textLink}>
                      {item.cta} <ArrowRightIcon />
                    </Link>
                  </div>
                  <div className={styles.connectionVisual}>
                    <Image src={item.image} alt={item.alt} width={1728} height={891} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Compras dentro da operação</span>
                <h2>Quando a necessidade nasce na obra, a compra não precisa perder a origem.</h2>
              </div>
              <p>
                Solicitações e cotações podem permanecer ligadas ao projeto ou OS que motivou a demanda, tornando a
                conversa financeira mais próxima do que está acontecendo no campo.
              </p>
            </header>

            <div className={styles.procurementGrid}>
              <article>
                <div>
                  <span>Solicitações</span>
                  <h3>Da necessidade ao acompanhamento.</h3>
                  <p>Pedidos, aprovações, recebimentos e custo por OS aparecem em uma rotina própria de compras.</p>
                </div>
                <Image
                  src="/product/finance/requests.jpg"
                  alt="Tela real de solicitações de compra no Dr. Tasks"
                  width={1728}
                  height={891}
                />
              </article>
              <article>
                <div>
                  <span>Cotações</span>
                  <h3>Compare sem separar a compra da obra.</h3>
                  <p>Fornecedores, propostas e status ficam próximos da demanda que originou a cotação.</p>
                </div>
                <Image
                  src="/product/finance/quotes.jpg"
                  alt="Tela real de cotações no Dr. Tasks"
                  width={1728}
                  height={891}
                />
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.boundaryGrid}>
              <div className={styles.boundaryIntro}>
                <span className="eyebrow">Escopo claro</span>
                <h2>Clareza operacional sem fingir ser todos os sistemas da obra.</h2>
                <p>
                  O Dr. Tasks concentra execução, contexto e leitura operacional. A proposta é conectar o trabalho,
                  não substituir ferramentas especializadas que já cumprem outros papéis na empresa.
                </p>
              </div>

              <div className={styles.boundaries}>
                <article>
                  <span>O que organiza</span>
                  <strong>Projetos, estágios, tarefas, compras, responsáveis e histórico operacional.</strong>
                </article>
                <article>
                  <span>O que não promete</span>
                  <strong>O Dr. Tasks não substitui ERP, contabilidade ou todos os sistemas especializados de obra.</strong>
                </article>
                <article>
                  <span>Como entra</span>
                  <strong>Com um template configurável que acompanha a linguagem e as etapas da operação.</strong>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalCard}`}>
            <div>
              <span className="eyebrow">Aplicado à sua obra</span>
              <h2>Veja como o Dr. Tasks pode representar o fluxo que sua equipe já executa hoje.</h2>
              <p>
                A demonstração parte de contratos, OS, estágios, compras e responsáveis para mostrar como a
                operação pode ganhar mais visibilidade sem perder o contexto real do trabalho.
              </p>
            </div>
            <Link href="/demo" className="button button-primary">
              Agendar demonstração <ArrowRightIcon />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
