import Link from "next/link";
import styles from "./OriginStory.module.css";

export function OriginStory(){
  return <section className={styles.section} data-home-motion="origin" data-home-replay="true" aria-labelledby="origin-title">
    <div className={styles.inner}>
      <div className={styles.originStatement}>
        <h2 id="origin-title">O Dr. Tasks nasceu porque a obra real não cabe em uma coleção de ferramentas soltas.</h2>
        <p>A rotina já tinha orçamento, OS, medição, documento, aprovação, pagamento e equipe. O produto foi construído para manter essas partes conectadas em vez de obrigar alguém a reconstruir o contexto em planilhas e mensagens.</p>
      </div>

      <div className={styles.originPath} aria-label="Do problema operacional ao produto conectado">
        <div><span>01</span><small>ROTINA REAL</small><strong>Orçamento, OS, medição, documento, aprovação, pagamento.</strong></div>
        <i aria-hidden="true"/>
        <div><span>02</span><small>ATRITO</small><strong>Contexto reconstruído entre planilha, mensagem e sistema.</strong></div>
        <i aria-hidden="true"/>
        <div><span>03</span><small>DR.TASKS</small><strong>O mesmo contexto atravessa o processo.</strong></div>
      </div>

      <Link className={styles.originLink} href="/sobre">Ver por que o Dr. Tasks foi criado <span>↗</span></Link>
    </div>
  </section>;
}
