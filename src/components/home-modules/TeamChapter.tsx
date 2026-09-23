"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./TeamChapter.module.css";

type TeamScreenId = "time" | "chat" | "users";

const screens: readonly { id: TeamScreenId; label: string; src: string; alt: string; note: string }[] = [
  { id: "time", label: "Tempo", src: "/product/team/time.jpg", alt: "Tela de gestão de tempo do Dr. Tasks", note: "Timers, registros e aprovações no contexto do trabalho." },
  { id: "chat", label: "Chat", src: "/product/team/chat.jpg", alt: "Tela de chat do Dr. Tasks", note: "Comunicação próxima da operação, sem perder o assunto." },
  { id: "users", label: "Usuários", src: "/product/team/users.jpg", alt: "Tela de usuários e equipe do Dr. Tasks", note: "Equipe, acesso e responsabilidade visíveis em um só lugar." },
];

export function TeamChapter() {
  const module = getModuleShowcaseModule("team");
  const reducedMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState<TeamScreenId>("time");
  const activeIndex = screens.findIndex((screen) => screen.id === active);
  const activeScreen = screens[activeIndex] ?? screens[0];
  const backgroundScreens = screens.filter((screen) => screen.id !== active);

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="team-title">
      <div className={`container ${styles.inner}`}>
        <AnimatedContent className={styles.copy} distance={42} threshold={0.16}>
          <div className={styles.kicker}><span />Equipe e Tempo</div>
          <h2 id="team-title">Tempo registrado vira leitura operacional, não uma planilha paralela.</h2>
          <p>Timers, lançamentos, comunicação e usuários permanecem próximos do trabalho executado pela equipe.</p>

          <div className={styles.selector} role="group" aria-label="Escolher interface de Equipe e Tempo">
            {screens.map((item) => (
              <button
                type="button"
                key={item.id}
                className={styles.selectorButton}
                aria-pressed={active === item.id}
                onClick={() => setActive(item.id)}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="team-active-indicator"
                    className={styles.activeIndicator}
                    transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={styles.selectorLabel}>{item.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.activeNote} aria-live="polite">
            <span>{activeScreen.label}</span>
            <p>{activeScreen.note}</p>
          </div>

        </AnimatedContent>

        <div className={styles.visual} aria-label="Telas reais de Equipe e Tempo">
          {backgroundScreens.map((screen, index) => (
            <div key={screen.id} className={`${styles.backScreen} ${index === 0 ? styles.backOne : styles.backTwo}`} aria-hidden="true">
              <Image src={screen.src} alt="" width={1851} height={926} sizes="(max-width: 1040px) 86vw, 50vw" />
            </div>
          ))}

          <motion.div
            key={activeScreen.id}
            layout="position"
            className={styles.primaryScreen}
            transition={reducedMotion ? { duration: 0 } : { layout: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: .2 } }}
            initial={reducedMotion ? false : { opacity: .72, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Image src={activeScreen.src} alt={activeScreen.alt} width={1851} height={926} className={styles.primaryImage} sizes="(max-width: 1040px) 94vw, 58vw" />
            <div className={styles.primaryBadge}><span />{activeScreen.label}</div>
          </motion.div>
        </div>

        <div className={styles.chapterCta}>
          <ModuleChapterLink href={module.href}>Saiba mais sobre Equipe e Tempo</ModuleChapterLink>
        </div>
      </div>
    </section>
  );
}
