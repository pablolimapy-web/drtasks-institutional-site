import Link from "next/link";
import styles from "./OriginStory.module.css";

export function OriginStory() {
  return (
    <section className={styles.section} aria-labelledby="origin-title">
      <div className={styles.inner}>
        <span className={styles.eyebrow}>ORIGEM</span>
        <h2 id="origin-title">O Dr. Tasks nasceu de operação real, não de uma abstração de produtividade.</h2>
        <p>Planilhas, contratos, obras, aprovações e execução já existiam antes do produto. O sistema nasceu tentando preservar o contexto entre essas partes para que a equipe saiba o que aconteceu, quem responde e qual é a próxima ação.</p>
        <Link href="/sobre">Conheça a história do Dr. Tasks <span>↗</span></Link>
      </div>
    </section>
  );
}
