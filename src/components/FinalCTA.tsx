import Link from "next/link";
import { primaryCta } from "@/lib/commercial";
import styles from "./FinalCTA.module.css";

export function FinalCTA(){
  return <section className={styles.section} data-home-motion="close" data-home-replay="true" aria-labelledby="final-cta-title">
    <div className={styles.inner}>
      <header className={styles.copy}><h2 id="final-cta-title">Mostre seu processo. Não o nosso menu.</h2><p>Pegamos um processo da sua operação, percorremos o mesmo caminho no Dr. Tasks e mostramos onde desaparecem digitação, cobrança de status e reconstrução de contexto.</p></header>

      <div className={styles.diagnosticLine}>
        <span className={styles.step}><b>01</b><strong>Seu processo real</strong><small>pedido, obra, aprovação ou financeiro</small></span>
        <i aria-hidden="true"/>
        <span className={styles.step}><b>02</b><strong>Mapa do desperdício</strong><small>trocas, repetições e perda de contexto</small></span>
        <i aria-hidden="true"/>
        <span className={styles.step}><b>03</b><strong>Demonstração no fluxo</strong><small>o mesmo processo dentro do Dr. Tasks</small></span>
        <Link className={styles.primary} href={primaryCta.href} data-eva-trigger="final">Falar ao vivo com especialista<span>↗</span></Link>
      </div>

      <Link className={styles.secondary} href="/#comparativo">Comparar plataformas <span>↓</span></Link>
    </div>
  </section>;
}
