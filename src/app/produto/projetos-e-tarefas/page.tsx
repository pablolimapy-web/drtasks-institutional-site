import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import { HierarchyExplorer } from "@/components/product/HierarchyExplorer";
import styles from "./ProjectsTasksPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Projetos e tarefas — Estruture o trabalho',
  'Conecte instituições, workspaces, projetos, estágios e tarefas em uma estrutura operacional clara, mantendo contexto, responsabilidade e execução no mesmo ambiente.',
  '/produto/projetos-e-tarefas',
);

const hierarchy = [
  ["01", "Instituição", "O contexto da organização, cliente ou unidade que origina o trabalho."],
  ["02", "Workspace", "O ambiente que separa frentes, equipes ou estruturas relacionadas."],
  ["03", "Projeto", "A carteira onde escopo, prazo e execução começam a ganhar forma."],
  ["04", "Estágio", "O ponto real do processo em que o trabalho se encontra."],
  ["05", "Tarefa", "A ação concreta com responsável, prazo e histórico de execução."],
] as const;

export default function ProjectsTasksPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Projetos e tarefas · estrutura do trabalho</span>
              <h1>Cliente, obra, etapa e tarefa continuam ligados até a execução.</h1>
              <p>
                Instituições, workspaces, projetos, estágios e tarefas organizam a operação em camadas claras.
                A equipe sabe onde o trabalho pertence, em que ponto está e o que precisa acontecer depois.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="#estrutura" className="button button-secondary">
                  Ver a estrutura
                </Link>
              </div>
            </div>

            <div className={styles.heroMap} aria-label="Hierarquia operacional do Dr. Tasks">
              <span>Contexto</span>
              {hierarchy.map(([number, label], index) => (
                <div className={styles.heroNode} key={label}>
                  <i>{number}</i>
                  <strong>{label}</strong>
                  {index < hierarchy.length - 1 ? <b aria-hidden="true">↓</b> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.sectionSoft}`} id="estrutura">
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">A estrutura antes do dashboard</span>
                <h2>Organize o trabalho sem perder a relação entre quem pediu, onde acontece e quem executa.</h2>
              </div>
              <p>
                A estrutura do Dr. Tasks não existe para criar burocracia. Ela mantém o contexto que costuma se
                perder quando projeto, tarefa, cliente e execução vivem em ferramentas diferentes.
              </p>
            </header>

            <div className={styles.hierarchyGrid}>
              {hierarchy.map(([number, title, description]) => (
                <article className={styles.hierarchyCard} key={number}>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Produto real, contexto preservado</span>
                <h2>Veja como cada nível aparece no sistema.</h2>
              </div>
              <p>
                As capturas abaixo usam telas reais do Dr. Tasks. Dados operacionais identificáveis foram
                protegidos para uso público, mantendo a estrutura visual e o comportamento do produto.
              </p>
            </header>
            <HierarchyExplorer />
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.sectionSoft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Da estrutura para a leitura operacional</span>
                <h2>Projetos e tarefas organizam a execução. O FluxOS transforma essa estrutura em visão.</h2>
              </div>
              <p>
                Quando o trabalho já está estruturado, o FluxOS consegue mostrar a carteira por estágio, risco,
                aging, bloqueio e próxima ação sem obrigar a equipe a abrir projeto por projeto.
              </p>
            </header>

            <div className={styles.bridge}>
              <div className={styles.bridgeFlow}>
                <span>Instituição</span>
                <b>→</b>
                <span>Workspace</span>
                <b>→</b>
                <span>Projeto</span>
                <b>→</b>
                <span>Estágio</span>
                <b>→</b>
                <span>Tarefa</span>
              </div>
              <div className={styles.bridgeCta}>
                <span>FluxOS</span>
                <strong>A visão transversal sobre o que precisa avançar.</strong>
                <Link href="/produto/fluxos">
                  Conhecer o FluxOS <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Menos contexto perdido</span>
                <h2>Uma estrutura simples para responder perguntas que aparecem todos os dias.</h2>
              </div>
            </header>

            <div className={styles.outcomes}>
              <article>
                <span>01</span>
                <h3>De quem é esse trabalho?</h3>
                <p>Instituição e workspace preservam o contexto antes mesmo da execução começar.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Onde isso está?</h3>
                <p>Projeto e estágio ajudam a localizar o trabalho no processo sem depender de memória.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Quem faz o próximo passo?</h3>
                <p>A tarefa leva a execução para responsável, prazo e histórico verificável.</p>
              </article>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.finalCta}>
          <div className={`container ${styles.finalCard}`}>
            <div>
              <span className="eyebrow">Estrutura aplicada à sua rotina</span>
              <h2>Veja como sua operação pode sair de listas soltas para uma estrutura conectada.</h2>
              <p>
                A demonstração parte da forma como sua equipe já organiza clientes, projetos e tarefas e mostra
                como transformar isso em uma estrutura operacional mais legível.
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
