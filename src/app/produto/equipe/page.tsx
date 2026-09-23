import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import { TeamShowcase } from "@/components/product/TeamShowcase";
import styles from "./TeamPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Equipe e produtividade — Chat, usuários e tempo',
  'Veja Chat, gestão de usuários e Gestão de Tempo no Dr. Tasks para apoiar comunicação, responsabilidade e acompanhamento da execução.',
  '/produto/equipe',
);

const pillars = [
  ["Chat", "Conversa", "Uma área própria para iniciar, buscar e acompanhar conversas abertas ou arquivadas."],
  ["Usuários", "Responsabilidade", "Cadastros, funções, status e ações administrativas reunidos em uma visão de equipe."],
  ["Gestão de tempo", "Acompanhamento", "Timer, registros, aprovações e leituras de tempo faturável e não faturável."],
] as const;

export default function TeamProductPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Equipe e produtividade · execução com contexto</span>
              <h1>Comunicação, responsabilidade e tempo mais próximos do trabalho.</h1>
              <p>
                Chat, Usuários e Gestão de Tempo apoiam a rotina da equipe sem substituir a estrutura central de
                projetos, tarefas e FluxOS que organiza a operação.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="#equipe" className="button button-secondary">
                  Explorar a equipe
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <Image
                src="/product/team/time.jpg"
                alt="Tela real de Gestão de Tempo do Dr. Tasks com dados demonstrativos protegidos"
                width={1728}
                height={891}
                priority
              />
              <span>Interface real · dados demonstrativos protegidos quando necessário</span>
            </div>
          </div>
        </section>

        <section className={styles.pillarStrip} aria-label="Áreas de equipe e produtividade">
          <div className={`container ${styles.pillarGrid}`}>
            {pillars.map(([label, title, description]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} id="equipe">
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Chat · Usuários · Gestão de tempo</span>
                <h2>Três áreas de apoio para uma equipe que precisa executar e prestar conta do trabalho.</h2>
              </div>
              <p>
                A página mostra o que o produto exibe hoje: conversas, cadastros de equipe e acompanhamento de tempo,
                sem extrapolar para automações ou métricas que ainda não foram validadas.
              </p>
            </header>
            <TeamShowcase />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Responsabilidade visível</span>
                <h2>O trabalho ganha contexto quando pessoas e tempo também ficam legíveis.</h2>
              </div>
              <p>
                O Dr. Tasks não precisa transformar cada apoio em um módulo isolado da operação. A utilidade aparece
                quando equipe, conversa e registro de tempo permanecem próximos dos projetos e tarefas.
              </p>
            </header>

            <div className={styles.outcomes}>
              <article>
                <span>01</span>
                <h3>Quem faz parte da operação?</h3>
                <p>Usuários, funções e status ajudam a manter a estrutura da equipe visível.</p>
              </article>
              <article>
                <span>02</span>
                <h3>Onde a conversa acontece?</h3>
                <p>O Chat oferece um espaço próprio para novas conversas, busca e arquivo.</p>
              </article>
              <article>
                <span>03</span>
                <h3>Quanto tempo foi registrado?</h3>
                <p>Gestão de Tempo reúne timers, registros, aprovações e classificações disponíveis na interface.</p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalCard}`}>
            <div>
              <span className="eyebrow">Equipe dentro da operação</span>
              <h2>Veja como os recursos de equipe aparecem junto da estrutura real de trabalho.</h2>
              <p>
                A demonstração mostra os módulos disponíveis e como eles convivem com Projetos, Tarefas e FluxOS.
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
