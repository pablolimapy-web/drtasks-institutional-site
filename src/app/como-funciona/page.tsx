import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "../institutional.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Como funciona — Do contexto à próxima ação',
  'Entenda como o Dr. Tasks organiza instituição, workspace, projeto, estágio e tarefa e transforma essa estrutura em uma visão operacional no FluxOS.',
  '/como-funciona',
);

const steps = [
  ["01", "Cadastre o contexto", "Instituição, cliente, workspace, projeto e equipe formam a base que identifica de onde vem o trabalho."],
  ["02", "Configure o caminho", "Crie os estágios que representam o processo real da empresa, sem forçar a operação a caber em um fluxo genérico."],
  ["03", "Faça o trabalho avançar", "Registre tarefas, responsáveis, prazos, bloqueios e próxima ação para que o status deixe de depender de perguntas."],
] as const;

const hierarchy = [
  ["01", "Instituição", "Cliente, órgão ou contexto que origina o trabalho."],
  ["02", "Workspace", "Ambiente que reúne uma frente ou estrutura operacional."],
  ["03", "Projeto", "Resultado que a empresa quer alcançar."],
  ["04", "Estágio", "Fase do caminho até o resultado."],
  ["05", "Tarefa", "Ação concreta que faz o projeto avançar."],
] as const;

const journey = [
  "Escolha o contexto inicial",
  "Crie instituição ou cliente",
  "Crie um workspace",
  "Crie o projeto",
  "Configure ou escolha os estágios",
  "Crie a primeira tarefa",
  "Defina responsável, prazo e próxima ação",
  "Abra o FluxOS",
  "Mova uma OS de estágio",
  "Consulte o histórico da alteração",
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Como funciona</span>
              <h1>O trabalho nasce no contexto. O FluxOS mostra o que precisa acontecer agora.</h1>
              <p>
                O Dr. Tasks mantém cliente, obra, projeto, etapa e tarefa relacionados. O FluxOS transforma essa estrutura em leitura operacional: onde está, quem responde, o que bloqueia e qual é o próximo passo.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="/produto/fluxos" className="button button-secondary">
                  Conhecer o FluxOS
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroDiagram} aria-label="Hierarquia do trabalho no Dr. Tasks">
                {hierarchy.map(([number, label, description]) => (
                  <div className={styles.heroDiagramRow} key={label}>
                    <span>{number}</span>
                    <strong>{label}</strong>
                    <em>{description}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.soft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Três movimentos</span>
                <h2>Organize o contexto, represente o processo real e deixe a execução visível.</h2>
              </div>
              <p>
                A proposta não é configurar todos os módulos antes de enxergar valor. A operação deve chegar a uma
                primeira visão útil rapidamente.
              </p>
            </header>

            <div className={styles.threeSteps}>
              {steps.map(([number, title, description]) => (
                <article className={styles.stepCard} key={number}>
                  <span className={styles.number}>{number}</span>
                  <h3>{title}</h3>
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
                <span className="eyebrow">O modelo do produto</span>
                <h2>Projeto é resultado. Estágio é fase. Tarefa é ação.</h2>
              </div>
              <p>
                A hierarquia preserva contexto sem transformar o FluxOS em mais um nível. O FluxOS é a visão que
                permite trabalhar a operação inteira.
              </p>
            </header>

            <div className={styles.hierarchy}>
              {hierarchy.map(([number, label, description]) => (
                <article className={styles.hierarchyItem} key={label}>
                  <span>{number}</span>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className={styles.fluxosNote}>
              <strong>FluxOS:</strong> consolida essa hierarquia em uma visão operacional por estágios, com
              responsável, prazo, situação, bloqueio, próxima ação, aging e histórico.
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={`${styles.section} ${styles.soft}`}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Uma primeira operação útil</span>
                <h2>O onboarding começa com um exemplo, não com uma tela vazia.</h2>
              </div>
              <p>
                A sequência abaixo mostra o caminho recomendado para chegar rapidamente a uma carteira que já faz
                sentido para quem executa e para quem acompanha.
              </p>
            </header>

            <div className={styles.journey}>
              {journey.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item}</strong>
                    <p>{index < 7 ? "Construa o contexto mínimo necessário para executar." : "Use a visão operacional para acompanhar e aprender com a movimentação."}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.section}>
          <div className={`container ${styles.storyGrid}`}>
            <div className={styles.storyCopy}>
              <span className="eyebrow">Da estrutura à leitura operacional</span>
              <h2>Quando o trabalho muda, o contexto continua.</h2>
              <p>
                Uma tarefa pode avançar, uma OS pode mudar de estágio e um bloqueio pode surgir. O objetivo é que a
                equipe não precise reconstruir o status em mensagens, reuniões e planilhas paralelas.
              </p>
              <Link href="/produto/fluxos" className="button button-primary">
                Ver FluxOS em detalhe <ArrowRightIcon />
              </Link>
            </div>
            <div className={styles.heroVisual}>
              <Image
                src="/hero/fluxos-overview.png"
                alt="Tela real do FluxOS mostrando a carteira operacional por estágios"
                width={1844}
                height={760}
              />
            </div>
          </div>
        </section>

        <section data-site-reveal="scale" className={styles.cta}>
          <div className={`container ${styles.ctaBox}`}>
            <div>
              <h2>Quer ver esse modelo aplicado à sua operação?</h2>
              <p>Na demonstração, partimos do processo real da empresa e mostramos como ele pode virar um fluxo visível.</p>
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
