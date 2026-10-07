import Link from "next/link";
import { primaryCta } from "@/lib/commercial";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  return (
    <section className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.inner}>
        <span className={styles.eyebrow}>PRÓXIMO PASSO</span>
        <h2 id="final-cta-title">Pare de reconstruir o contexto. Comece a conduzir a operação.</h2>
        <p>Veja como projetos, aprovações, financeiro, equipe e campo podem continuar conectados do problema à próxima ação.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href={primaryCta.href}>{primaryCta.label}<span>↗</span></Link>
          <Link className={styles.secondary} href="/#modulos">Rever os módulos<span>↑</span></Link>
        </div>
      </div>
    </section>
  );
}
