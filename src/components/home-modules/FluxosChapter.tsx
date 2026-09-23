import Image from "next/image";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./FluxosChapter.module.css";

const signals = ["Estágio", "Aging", "Bloqueio", "Próxima ação"];

export function FluxosChapter() {
  const module = getModuleShowcaseModule("fluxos");

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="fluxos-title">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <AnimatedContent className={styles.copy} distance={44} threshold={0.16}>
          <div className={styles.kicker}><span />O coração do Dr. Tasks</div>
          <h2 id="fluxos-title">Cada OS mostra onde está, quem precisa agir e o que vem depois.</h2>
          <p>Estágio, aging, bloqueio e próxima ação permanecem visíveis no mesmo contexto. Menos busca por status; mais leitura operacional.</p>
          <div className={styles.signals} aria-label="Sinais operacionais visíveis no FluxOS">
            {signals.map((signal) => <span key={signal}>{signal}</span>)}
          </div>
        </AnimatedContent>

        <div className={styles.visual} aria-label="Telas reais do FluxOS">
          <div className={styles.screenFrame}>
            <Image
              src="/hero/fluxos-overview.png"
              alt="Visão geral do FluxOS com ordens de serviço, estágios e indicadores operacionais"
              width={1846}
              height={923}
              className={styles.overview}
              sizes="(max-width: 1040px) 94vw, 62vw"
              priority={false}
            />
          </div>
          <div className={styles.drawerFrame}>
            <Image
              src="/hero/fluxos-drawer.png"
              alt="Detalhe de uma ordem de serviço aberto sobre o FluxOS"
              width={1846}
              height={923}
              className={styles.drawer}
              sizes="(max-width: 720px) 78vw, 31vw"
            />
          </div>
          <div className={`${styles.annotation} ${styles.annotationOne}`}>Próxima ação</div>
          <div className={`${styles.annotation} ${styles.annotationTwo}`}>Leitura do estágio</div>
        </div>

        <div className={styles.chapterCta}>
          <ModuleChapterLink href={module.href} dark>Saiba mais sobre FluxOS</ModuleChapterLink>
        </div>
      </div>
    </section>
  );
}
