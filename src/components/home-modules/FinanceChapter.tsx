import Image from "next/image";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./FinanceChapter.module.css";

const supports = [
  ["Solicitações", "O pedido nasce no mesmo contexto que será acompanhado depois."],
  ["Cotações", "Comparação e decisão ficam próximas da execução que originou a demanda."],
  ["Leitura consolidada", "A visão financeira não precisa viver separada da operação."],
] as const;

export function FinanceChapter() {
  const module = getModuleShowcaseModule("finance");

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="finance-title">
      <div className={`container ${styles.inner}`}>
        <AnimatedContent className={styles.copy} distance={46} threshold={0.14}>
          <div className={styles.kicker}><span />Financeiro</div>
          <h2 id="finance-title">O financeiro acompanha a operação que gerou o valor.</h2>
          <p>Solicitações, cotações, compromissos e leitura consolidada permanecem dentro do mesmo raciocínio operacional — sem transformar o financeiro em um universo paralelo.</p>

          <div className={styles.supports}>
            {supports.map(([title, description]) => (
              <SpotlightCard className={styles.supportCard} key={title} spotlightColor="rgba(28, 85, 201, 0.12)">
                <span className={styles.supportMarker} aria-hidden="true" />
                <strong>{title}</strong>
                <small>{description}</small>
              </SpotlightCard>
            ))}
          </div>

        </AnimatedContent>

        <div className={styles.visual} aria-label="Telas reais do módulo Financeiro">
          <div className={styles.backScreenOne}>
            <Image src="/product/finance/requests.jpg" alt="Tela de solicitações financeiras" width={1851} height={926} sizes="(max-width: 1040px) 76vw, 32vw" />
          </div>
          <div className={styles.backScreenTwo}>
            <Image src="/product/finance/quotes.jpg" alt="Tela de cotações financeiras" width={1851} height={926} sizes="(max-width: 1040px) 76vw, 32vw" />
          </div>
          <div className={styles.mainScreen}>
            <Image src="/product/pillars/finance.jpg" alt="Visão consolidada do Financeiro no Dr. Tasks" width={1851} height={926} className={styles.mainImage} sizes="(max-width: 1040px) 94vw, 58vw" />
            <div className={styles.screenCaption}>Leitura financeira conectada à operação</div>
          </div>
        </div>

        <div className={styles.chapterCta}>
          <ModuleChapterLink href={module.href}>Saiba mais sobre Financeiro</ModuleChapterLink>
        </div>
      </div>
    </section>
  );
}
