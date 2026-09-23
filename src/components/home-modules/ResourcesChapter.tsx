"use client";

import Image from "next/image";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./ResourcesChapter.module.css";

type ResourceView = "files" | "location";

export function ResourcesChapter() {
  const module = getModuleShowcaseModule("resources");
  const reducedMotion = Boolean(useReducedMotion());
  const connectorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ResourceView>("files");

  const playConnector = () => {
    if (reducedMotion || !connectorRef.current) return;
    const dots = connectorRef.current.querySelectorAll(`.${styles.connectorDot}`);
    animate(dots, {
      opacity: [0.34, 1, 0.48],
      scale: [0.84, 1.14, 1],
      duration: 520,
      delay: stagger(55),
      ease: "outQuad",
    });
  };

  const selectView = (view: ResourceView) => {
    setActive(view);
    playConnector();
  };

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="resources-title">
      <div className={styles.field} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <AnimatedContent className={styles.copy} distance={40} threshold={0.16}>
          <div className={styles.kicker}><span />Recursos</div>
          <h2 id="resources-title">Arquivos, evidências e campo permanecem dentro do contexto do trabalho.</h2>
          <p>Documentos e localização deixam de ser anexos soltos. A equipe encontra o registro certo e entende onde a atividade acontece.</p>

          <div className={styles.selector} role="group" aria-label="Escolher contexto de Recursos">
            <button type="button" aria-pressed={active === "files"} onClick={() => selectView("files")}>Arquivos</button>
            <button type="button" aria-pressed={active === "location"} onClick={() => selectView("location")}>Localização</button>
          </div>

          <div className={styles.readout} aria-live="polite">
            <span>{active === "files" ? "Evidência organizada" : "Contexto de campo"}</span>
            <p>{active === "files" ? "Arquivos acompanham o trabalho ao qual pertencem." : "A localização ajuda a ler o que está acontecendo fora do escritório."}</p>
          </div>

        </AnimatedContent>

        <div className={styles.visual} aria-label="Arquivos e localização no Dr. Tasks">
          <div className={`${styles.screen} ${styles.filesScreen} ${active === "files" ? styles.activeScreen : ""}`}>
            <Image src="/product/resources/files.jpg" alt="Tela de arquivos do Dr. Tasks" width={1851} height={926} sizes="(max-width: 1040px) 88vw, 46vw" />
            <span>Arquivos</span>
          </div>

          <div className={styles.connector} ref={connectorRef} aria-hidden="true">
            {Array.from({ length: 9 }, (_, index) => <i key={index} className={styles.connectorDot} />)}
          </div>

          <div className={`${styles.screen} ${styles.locationScreen} ${active === "location" ? styles.activeScreen : ""}`}>
            <Image src="/product/resources/location.jpg" alt="Tela de localização do Dr. Tasks" width={1851} height={926} sizes="(max-width: 1040px) 88vw, 46vw" />
            <span>Localização</span>
          </div>
        </div>

        <div className={styles.chapterCta}>
          <ModuleChapterLink href={module.href}>Saiba mais sobre Recursos</ModuleChapterLink>
        </div>
      </div>
    </section>
  );
}
