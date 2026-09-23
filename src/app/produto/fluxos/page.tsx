import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import { FluxosPortfolioDemo } from "@/components/product/FluxosPortfolioDemo";
import styles from "./FluxosPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'FluxOS — Gestão operacional por estágios',
  'Veja a carteira por estágios, identifique risco, aging, bloqueios, responsáveis e a próxima ação de cada OS com o FluxOS do Dr. Tasks.',
  '/produto/fluxos',
);

const answers = [
  ["01", "Onde está?", "O estágio atual fica visível sem depender de mensagens paralelas."],
  ["02", "Quem precisa agir?", "Responsável, situação e próxima ação aparecem no mesmo contexto."],
  ["03", "O que está bloqueado?", "Bloqueios deixam de ficar escondidos em conversas, memória ou planilhas."],
  ["04", "O que está envelhecendo?", "Aging ajuda a perceber etapas paradas antes que o atraso vire surpresa."],
] as const;

export default function FluxosProductPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">FluxOS · visão operacional</span>
              <h1>Cada OS tem um caminho. Veja onde está e o que precisa acontecer agora.</h1>
              <p>
                O FluxOS organiza a carteira por estágios e mantém o contexto de execução visível: responsável,
                prazo, situação, aging, bloqueio, próxima ação e última movimentação sem perder a visão do todo.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="#demonstracao" className="button button-secondary">
                  Explorar o FluxOS
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroFrame}>
                <Image
                  src="/hero/fluxos-overview.png"
                  alt="Tela real do FluxOS com carteira operacional por estágios"
                  width={1844}
                  height={760}
                  priority
                />
              </div>
              <div className={styles.heroNote}>
                <span>Uma OS, sem ruído</span>
                <strong>A linha sai do quadro e vira contexto: prazo, estágio, valor e responsável.</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.answerStrip} aria-label="Perguntas que o FluxOS ajuda a responder">
          <div className={`container ${styles.answerGrid}`}>
            {answers.map(([number, title, description]) => (
              <article className={styles.answerCard} key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} id="demonstracao">
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Carteira → estágio → OS</span>
                <h2>Veja o todo. Abra o detalhe. Volte para a operação sem perder contexto.</h2>
              </div>
              <p>
                A visão por estágios mostra volume, risco e aging. Ao selecionar uma OS, o detalhe operacional
                aparece sem transformar o acompanhamento em outra planilha ou outra tela isolada.
              </p>
            </header>
            <FluxosPortfolioDemo />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Modelo do trabalho</span>
                <h2>Projeto, Estágio e Tarefa organizam a execução. O FluxOS organiza a leitura.</h2>
              </div>
              <p>
                O FluxOS não cria um nível paralelo. Ele usa a estrutura existente do trabalho para mostrar onde
                cada item está, o que exige atenção e qual é o próximo passo.
              </p>
            </header>

            <div className={styles.modelGrid}>
              <div className={styles.modelFlow}>
                <strong>Estrutura operacional</strong>
                <div className={styles.flowSteps}>
                  <div className={styles.flowStep}>
                    <span>01</span>
                    <strong>Projeto</strong>
                    <p>Reúne o contexto maior do trabalho, contrato, cliente ou frente operacional.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span>02</span>
                    <strong>Estágio</strong>
                    <p>Representa o ponto real do processo: orçamento, aprovação, execução, medição ou entrega.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span>03</span>
                    <strong>Tarefa</strong>
                    <p>Transforma o próximo passo em execução com responsável, prazo e histórico.</p>
                  </div>
                </div>
              </div>

              <aside className={styles.modelLens}>
                <div>
                  <span>FluxOS</span>
                  <h3>A lente operacional sobre a estrutura.</h3>
                </div>
                <p>
                  Em vez de navegar projeto por projeto para descobrir o que está acontecendo, a equipe enxerga
                  a carteira por estágios e abre somente o contexto que precisa investigar.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Um modelo, diferentes operações</span>
                <h2>Começa em obras e contratos. Continua onde existe trabalho por etapas.</h2>
              </div>
              <p>
                Construção e operações técnicas são a entrada comercial inicial do Dr. Tasks, mas o modelo do
                FluxOS é útil sempre que o trabalho precisa avançar por estágios claros.
              </p>
            </header>

            <div className={styles.useCases}>
              <article className={styles.useCase}>
                <span>Construção e contratos</span>
                <h3>Do orçamento à entrega.</h3>
                <p>
                  Acompanhe uma carteira que passa por orçamento, aprovação, compra, execução, medição e entrega,
                  mantendo responsáveis, bloqueios e próximos passos visíveis.
                </p>
                <ul>
                  <li>Orçamento</li><li>Aprovação</li><li>Compras</li><li>Execução</li><li>Medição</li><li>Entrega</li>
                </ul>
              </article>

              <article className={styles.useCase}>
                <span>Operações técnicas</span>
                <h3>O mesmo princípio em outros fluxos.</h3>
                <p>
                  Manutenção, serviços por projeto e operações com aprovações recorrentes podem usar estágios
                  próprios sem perder a leitura central da carteira.
                </p>
                <ul>
                  <li>Solicitação</li><li>Análise</li><li>Aprovação</li><li>Execução</li><li>Validação</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalCard}`}>
            <div>
              <span className="eyebrow">Aplicado à sua operação</span>
              <h2>Veja como o FluxOS ficaria com os estágios que sua equipe já usa.</h2>
              <p>
                A demonstração parte do processo atual da sua operação e mostra como tornar estágio, responsável,
                risco, bloqueio e próxima ação mais visíveis.
              </p>
            </div>
            <div className={styles.actions}>
              <Link href="/demo" className="button button-primary">
                Agendar demonstração <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
