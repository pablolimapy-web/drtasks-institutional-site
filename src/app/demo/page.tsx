import Link from "next/link";
import { DemoForm } from "@/components/DemoForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "./DemoPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Demonstração',
  'Conte como sua operação acompanha projetos, OS, estágios, responsáveis e bloqueios e prepare uma demonstração contextual do Dr. Tasks.',
  '/demo',
);

const demoPoints = [
  "Mapa de estágios e carteira",
  "OS em risco ou bloqueadas",
  "Responsável e próxima ação",
  "Projetos, compras e contexto financeiro",
] as const;

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.copy}>
              <span className="eyebrow">Demonstração contextual</span>
              <h1>Veja o Dr. Tasks aplicado à sua operação.</h1>
              <p>
                A conversa parte do processo que sua equipe já executa: projetos, OS, estágios, responsáveis, prazos,
                bloqueios e compras. Depois mostramos onde FluxOS e os demais módulos entram nesse contexto.
              </p>
              <div className={styles.points} aria-label="Assuntos da demonstração">
                {demoPoints.map((point) => <span key={point}>{point}</span>)}
              </div>
              <div className="hero-actions">
                <Link className="button button-secondary" href="/produto/fluxos">
                  Ver o FluxOS primeiro <ArrowRightIcon />
                </Link>
              </div>
            </div>
            <DemoForm />
          </div>
        </section>

        <section className="container" aria-label="Como preparamos a demonstração">
          <div className={styles.note}>
            <article>
              <span>01</span>
              <strong>Entendemos o processo atual.</strong>
              <p>Sem presumir que toda operação trabalha com os mesmos estágios, papéis ou controles.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Conectamos o problema ao produto.</strong>
              <p>Mostramos somente os módulos que fazem sentido para o cenário apresentado.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Deixamos o escopo claro.</strong>
              <p>Disponibilidade, limites e próximos passos são apresentados sem promessas comerciais inventadas.</p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
