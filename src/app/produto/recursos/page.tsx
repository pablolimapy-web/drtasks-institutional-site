import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRightIcon } from "@/components/Icons";
import { ResourceShowcase } from "@/components/product/ResourceShowcase";
import styles from "./ResourcesPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Recursos operacionais — Arquivos e localização',
  'Mantenha arquivos próximos do contexto do trabalho e acompanhe tarefas georreferenciadas quando a operação usa localização no Dr. Tasks.',
  '/produto/recursos',
);

const principles = [
  ["01", "Contexto", "O recurso complementa o trabalho existente em vez de criar uma operação paralela."],
  ["02", "Consulta", "Pastas, busca e filtros ajudam a chegar à referência necessária com menos troca de ambiente."],
  ["03", "Campo", "Quando a tarefa tem georreferenciamento, localização passa a fazer parte da leitura operacional."],
] as const;

export default function ResourcesProductPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className="eyebrow">Recursos operacionais · contexto próximo do trabalho</span>
              <h1>Arquivos e localização sem tirar a equipe do contexto da operação.</h1>
              <p>
                O Dr. Tasks reúne recursos de apoio para que documento, pasta e localização possam acompanhar a
                estrutura em que projetos e tarefas já são gerenciados.
              </p>
              <div className={styles.actions}>
                <Link href="/demo" className="button button-primary">
                  Agendar demonstração <ArrowRightIcon />
                </Link>
                <Link href="#recursos" className="button button-secondary">
                  Explorar recursos
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <Image
                src="/product/resources/files.jpg"
                alt="Área real de Arquivos do Dr. Tasks com dados demonstrativos protegidos"
                width={1728}
                height={891}
                priority
              />
              <span>Interface real · dados demonstrativos protegidos quando necessário</span>
            </div>
          </div>
        </section>

        <section className={styles.principles} aria-label="Princípios dos recursos operacionais">
          <div className={`container ${styles.principlesGrid}`}>
            {principles.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`} id="recursos">
          <div className="container">
            <header className={styles.sectionHead}>
              <div>
                <span className="eyebrow">Arquivos · Localização</span>
                <h2>Do documento à tarefa em campo, o apoio fica perto da execução.</h2>
              </div>
              <p>
                Os dois recursos cumprem papéis diferentes, mas seguem a mesma ideia: manter referências úteis no
                ambiente em que a equipe já acompanha o trabalho.
              </p>
            </header>
            <ResourceShowcase />
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <div className={styles.splitGrid}>
              <article className={styles.splitCard}>
                <span>Arquivos</span>
                <h2>Uma estrutura de documentos dentro do Dr. Tasks.</h2>
                <p>
                  Pastas e busca ajudam a organizar referências do trabalho. A demonstração pública usa dados
                  protegidos para não expor nomes operacionais reais.
                </p>
                <ul>
                  <li>Pastas e subpastas</li>
                  <li>Busca no contexto atual</li>
                  <li>Acesso pelo próprio ambiente do produto</li>
                </ul>
              </article>

              <article className={styles.splitCard}>
                <span>Localização</span>
                <h2>Uma leitura adicional para tarefas que acontecem em campo.</h2>
                <p>
                  Quando tarefas usam georreferenciamento, a área de Localização permite consultar o período e
                  filtrar por projeto, responsável e status antes de abrir a visualização correspondente.
                </p>
                <ul>
                  <li>Período</li>
                  <li>Projeto e responsável</li>
                  <li>Status</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={`container ${styles.finalCard}`}>
            <div>
              <span className="eyebrow">Recursos no contexto certo</span>
              <h2>Veja como Arquivos e Localização se encaixam na estrutura que sua equipe já usa.</h2>
              <p>
                A demonstração mostra o que está disponível hoje e evita transformar recurso de apoio em uma
                promessa maior do que o produto realmente entrega.
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
