import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import { FinanceFlow } from "@/components/product/FinanceFlow";
import styles from "./FinancePage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Financeiro e compras — Contexto da operação',
  'Acompanhe receitas, despesas, solicitações, cotações e resultado financeiro sem perder o vínculo com projetos e OS no Dr. Tasks.',
  '/produto/financeiro',
);

const operatingModes = [
  ["01", "Acompanhe", "Receitas, despesas, bancos e resumo deixam a leitura financeira mais próxima da operação."],
  ["02", "Compre", "Solicitações organizam a demanda antes que ela vire apenas mais um lançamento financeiro."],
  ["03", "Compare", "Cotações ajudam a acompanhar fornecedores, propostas e status dentro do mesmo contexto."],
  ["04", "Analise", "Resumo, overhead e relatórios ajudam a voltar do detalhe para a visão consolidada."],
] as const;

const journey = ["Projeto / OS", "Solicitação", "Cotação", "Compromisso", "Despesa / Receita", "Resultado"] as const;

export default function FinanceProductPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Financeiro e compras · contexto da operação</span>
              <h1>Da necessidade ao resultado, o financeiro continua ligado à obra.</h1>
              <p>
                Saiba o que foi previsto, comprometido, realizado e recebido sem separar a leitura financeira do
                projeto ou da OS que deu origem à movimentação.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="#rotina-financeira" className="button button-secondary">
                  Explorar o financeiro
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroFrame}>
                <Image
                  src="/product/pillars/finance.jpg"
                  alt="Central financeira real do Dr. Tasks com dados operacionais protegidos"
                  width={1728}
                  height={891}
                  priority
                />
              </div>
              <div className={styles.heroNote}>
                <span>Do operacional ao resultado</span>
                <strong>O contexto da OS continua visível quando a conversa chega ao financeiro.</strong>
              </div>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.modeStrip} aria-label="Quatro formas de trabalhar o financeiro no Dr. Tasks">
          <div className={`container ${styles.modeGrid}`}>
            {operatingModes.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.sectionSoft}`} id="rotina-financeira">
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Acompanhe · Compre · Compare · Analise</span>
                <h2>Uma rotina financeira que começa antes do lançamento e termina na leitura da carteira.</h2>
              </div>
              <p>
                Em vez de apresentar o financeiro como uma ilha, o Dr. Tasks aproxima compra, acompanhamento e
                análise do contexto operacional que já existe no sistema.
              </p>
            </header>
            <FinanceFlow />
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Da necessidade ao resultado</span>
                <h2>A compra não começa no financeiro. Ela começa na operação.</h2>
              </div>
              <p>
                Quando a necessidade surge em um projeto ou OS, solicitação e cotação podem carregar esse contexto
                até a leitura financeira, sem transformar a origem da demanda em uma informação perdida.
              </p>
            </header>

            <div className={styles.journey}>
              {journey.map((step, index) => (
                <div className={styles.journeyStep} key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                  {index < journey.length - 1 ? <b aria-hidden="true">→</b> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.sectionSoft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Compras com contexto</span>
                <h2>Solicitar e comparar sem desconectar a compra da OS.</h2>
              </div>
              <p>
                Solicitações e cotações aparecem como partes da mesma operação. A equipe consegue localizar a
                demanda, acompanhar status e chegar à decisão com menos troca de contexto.
              </p>
            </header>

            <div className={styles.procurementGrid}>
              <article className={styles.screenCard}>
                <div className={styles.screenCopy}>
                  <span>Solicitações</span>
                  <h3>Organize a demanda antes da compra.</h3>
                  <p>
                    Acompanhe pedidos, aprovações, recebimentos e custo por OS em uma área própria para a rotina de
                    compras.
                  </p>
                </div>
                <div className={styles.screenFrame}>
                  <Image
                    src="/product/finance/requests.jpg"
                    alt="Tela real de solicitações de compra no Dr. Tasks"
                    width={1728}
                    height={891}
                  />
                </div>
              </article>

              <article className={styles.screenCard}>
                <div className={styles.screenCopy}>
                  <span>Cotações</span>
                  <h3>Compare propostas no mesmo ambiente.</h3>
                  <p>
                    Fornecedores, status e acompanhamento de cotações ficam próximos da operação que motivou a
                    compra.
                  </p>
                </div>
                <div className={styles.screenFrame}>
                  <Image
                    src="/product/finance/quotes.jpg"
                    alt="Tela real de cotações no Dr. Tasks"
                    width={1728}
                    height={891}
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.section}>
          <div className="container">
            <div className={styles.consolidatedGrid}>
              <div className={styles.consolidatedCopy}>
                <span className="eyebrow">Do detalhe à visão consolidada</span>
                <h2>Volte para o todo sem apagar a origem do número.</h2>
                <p>
                  A Central Financeira reúne diferentes leituras para acompanhar o que entra, o que sai e como a
                  carteira se comporta, preservando a proximidade com obras e projetos.
                </p>
                <div className={styles.moduleCloud} aria-label="Áreas da Central Financeira">
                  {[
                    "Receitas",
                    "Despesas",
                    "Bancos",
                    "Resumo",
                    "Overhead",
                    "Relatórios",
                  ].map((module) => <span key={module}>{module}</span>)}
                </div>
              </div>
              <div className={styles.consolidatedVisual}>
                <Image
                  src="/product/pillars/finance.jpg"
                  alt="Visão consolidada da Central Financeira do Dr. Tasks com dados protegidos"
                  width={1728}
                  height={891}
                />
                <span>Interface real · dados operacionais protegidos quando necessário</span>
              </div>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.finalCta}>
          <div className={`container ${styles.finalCard}`}>
            <div>
              <span className="eyebrow">Financeiro conectado à sua rotina</span>
              <h2>Veja como compras e financeiro podem acompanhar o contexto que sua equipe já gerencia.</h2>
              <p>
                A demonstração parte da estrutura atual de projetos, OS e compras para mostrar onde o Dr. Tasks
                pode dar mais continuidade à leitura operacional e financeira.
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
