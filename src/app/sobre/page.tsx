import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "../institutional.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Sobre — Origem e propósito',
  'Conheça a origem do Dr. Tasks, nascido de uma operação real com obras, contratos, planilhas e a necessidade de tornar o próximo passo visível.',
  '/sobre',
);

const timeline = [
  ["01", "A dor apareceu na operação", "Projetos, contratos e obras exigiam acompanhar muitos contextos ao mesmo tempo. O status acabava espalhado entre planilhas, mensagens e reuniões."],
  ["02", "A pergunta ficou mais importante que a ferramenta", "Em vez de começar por uma lista de recursos, o produto passou a priorizar uma pergunta: o que está acontecendo agora e qual é a próxima ação?"],
  ["03", "Os estágios viraram a linguagem comum", "Projeto, estágio e tarefa deram uma estrutura simples para representar caminhos diferentes sem perder responsável, prazo e histórico."],
  ["04", "O produto deixou de ser só sobre obras", "A origem continua na construção, mas o modelo foi desenhado para operações por projeto, contrato, manutenção e serviços de campo."],
] as const;

const principles = [
  ["Clareza antes de volume", "Mostrar o que muda a decisão é mais importante do que exibir todos os módulos ao mesmo tempo."],
  ["Contexto antes de cobrança", "Responsável, prazo, bloqueio e próxima ação precisam aparecer antes de alguém cobrar status por fora do sistema."],
  ["Produto real como prova", "A interface e a rotina operacional devem sustentar a narrativa comercial, sem depender de promessas ou números inventados."],
] as const;

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Origem e propósito</span>
              <h1>Nascido de uma operação real. Construído para tornar o trabalho visível.</h1>
              <p>
                O Dr. Tasks nasceu da experiência com planilhas, contratos, obras e controle operacional. A ideia
                central não era criar mais um lugar para guardar informação, mas reduzir o tempo perdido tentando
                descobrir o que está acontecendo e qual é a próxima ação.
              </p>
              <div className={styles.actions}>
                <Link href="/como-funciona" className="button button-primary">
                  Entender como funciona <ArrowRightIcon />
                </Link>
                <Link href="/demo" className="button button-secondary">
                  Agendar demonstração
                </Link>
              </div>
            </div>

            <div className={styles.statement}>
              <span>Decisão de produto</span>
              <blockquote>
                “O Dr. Tasks nasceu em uma operação de construção, mas foi desenhado para empresas que precisam
                conduzir trabalho por estágios, responsáveis, prazos e próximas ações.”
              </blockquote>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.soft}`}>
          <div className={`container ${styles.storyGrid}`}>
            <div className={styles.storyCopy}>
              <span className="eyebrow">A origem</span>
              <h2>Antes de existir um produto, existia uma rotina difícil de enxergar.</h2>
              <p>
                Várias frentes aconteciam ao mesmo tempo. Contratos, obras, tarefas, aprovações e compras tinham
                contexto próprio, mas o acompanhamento dependia de juntar informação que estava espalhada.
              </p>
              <p>
                A escolha foi transformar essa dificuldade em uma estrutura simples: representar o caminho por
                estágios, manter a execução em tarefas e dar uma visão operacional para acompanhar o conjunto.
              </p>
            </div>

            <div className={styles.storyTimeline}>
              {timeline.map(([number, title, body]) => (
                <article key={number}>
                  <span className={styles.number}>{number}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Escolhas que orientam o produto</span>
                <h2>Menos caminhos para procurar status. Mais contexto para decidir e executar.</h2>
              </div>
              <p>
                O objetivo não é reunir o maior número possível de funcionalidades na comunicação. Os módulos devem
                aumentar a clareza da operação e reforçar a leitura do FluxOS.
              </p>
            </header>

            <div className={styles.principles}>
              {principles.map(([title, body], index) => (
                <article className={styles.principleCard} key={title}>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.soft}`}>
          <div className="container">
            <div className={styles.statement}>
              <span>Uma pergunta central</span>
              <blockquote>O que está acontecendo agora e qual é a próxima ação?</blockquote>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.cta}>
          <div className={`container ${styles.ctaBox}`}>
            <div>
              <h2>Veja o produto dentro de um processo real.</h2>
              <p>A demonstração conecta estágios, tarefas, responsáveis, bloqueios, compras e contexto financeiro.</p>
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
