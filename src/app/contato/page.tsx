import { DemoForm } from "@/components/DemoForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import styles from "../demo/DemoPage.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  'Contato',
  'Fale com a equipe do Dr. Tasks sobre sua operação, produto ou demonstração.',
  '/contato',
);

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.contactHero}>
          <div className={`container ${styles.contactHead}`}>
            <div>
              <span className="eyebrow">Contato</span>
              <h1>Conte onde a operação perde contexto. A conversa começa daí.</h1>
            </div>
            <p>
              Conte o cenário que você quer organizar. O mesmo formulário é usado para preparar uma conversa comercial
              ou uma demonstração contextual do produto.
            </p>
          </div>
        </section>
        <section data-site-reveal="scale" className={styles.contactForm}>
          <div className="container">
            <DemoForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
