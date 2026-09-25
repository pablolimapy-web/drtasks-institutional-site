"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import {
  TEAM_PRESENTATION_SEQUENCE,
  getNextTeamPresentationPhaseIndex,
  getTeamPresentationSceneIndex,
} from "@/lib/teamPresentationSequence";
import { ModuleChapterLink } from "./ModuleChapterLink";
import { TEAM_PRESENTATION_SCENES, TeamProductPresentation } from "./TeamProductPresentation";
import styles from "./TeamChapter.module.css";

export function TeamChapter() {
  const module = getModuleShowcaseModule("team");
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasOutside = useRef(true);
  const [isVisible, setIsVisible] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(reducedMotion ? 2 : 0);

  const phase = TEAM_PRESENTATION_SEQUENCE[phaseIndex] ?? TEAM_PRESENTATION_SEQUENCE[0];
  const activeScene = getTeamPresentationSceneIndex(phase.id);
  const opening = phase.id === "section-opening";
  const storyStarted = !opening;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (!entry.isIntersecting) {
          wasOutside.current = true;
          setIsVisible(false);
          return;
        }

        setIsVisible(true);
        if (wasOutside.current) {
          wasOutside.current = false;
          setPhaseIndex(reducedMotion ? 2 : 0);
        }
      },
      { threshold: [0, 0.18] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;

    const timer = window.setTimeout(() => {
      setPhaseIndex((current) => getNextTeamPresentationPhaseIndex(current));
    }, phase.durationMs);

    return () => window.clearTimeout(timer);
  }, [isVisible, phase.durationMs, reducedMotion]);

  return (
    <section ref={sectionRef} id={module.anchor} className={styles.section} aria-labelledby="team-title">
      <AnimatePresence initial={false}>
        {opening ? (
          <motion.div
            key="section-opening"
            className={styles.sectionOpening}
            initial={reducedMotion ? false : { opacity: 0, filter: "blur(16px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025, filter: "blur(14px)" }}
            transition={{ duration: reducedMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <motion.span
              className={styles.openingEyebrow}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.12 }}
            >
              DR.TASKS / MÓDULO 04
            </motion.span>

            <div className={styles.openingTitleRow}>
              <motion.span
                className={styles.openingIndex}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.82, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                04
              </motion.span>

              <motion.div
                className={styles.openingTitle}
                initial={reducedMotion ? false : { opacity: 0, x: 34, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <strong>EQUIPE</strong>
                <span>&amp; TEMPO</span>
              </motion.div>
            </div>

            <motion.div
              className={styles.openingBridge}
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.15 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.44, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.bridgeNode}><i /><b>PESSOAS</b></span>
              <span className={styles.bridgeLine}><i /></span>
              <span className={styles.bridgeNode}><i /><b>TEMPO</b></span>
            </motion.div>

            <motion.p
              className={styles.openingStatement}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : 0.72 }}
            >
              Um dia de trabalho deixa rastros.
            </motion.p>
            <span className={styles.openingGlow} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className={`${styles.inner} ${opening ? styles.innerOpening : ""}`}
        animate={opening && !reducedMotion ? { opacity: 0.2, scale: 0.985, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.layout}>
          <motion.div
            className={styles.copyColumn}
            initial={reducedMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.74, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.kicker}>04 / EQUIPE E TEMPO</span>
            <h2 id="team-title">
              Um dia de trabalho deixa rastros.
              <em>O sistema precisa conectá-los.</em>
            </h2>
            <p>Timers, apontamentos, usuários e acessos deixam de ser telas isoladas e viram uma leitura contínua do trabalho.</p>
            <div className={styles.ctaWrap}>
              <ModuleChapterLink href={module.href}>Conheça Equipe e Tempo</ModuleChapterLink>
            </div>
          </motion.div>

          <div className={styles.experience}>
            <motion.div
              className={styles.timeline}
              aria-label="Progresso da apresentação operacional da equipe"
              initial={reducedMotion ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : 0.08 }}
            >
              <span className={styles.timelineLine} aria-hidden="true"><i /></span>
              {TEAM_PRESENTATION_SCENES.map((item, index) => {
                const active = storyStarted && activeScene === index;
                const completed = storyStarted && activeScene > index;
                return (
                  <div
                    key={`${item.time}-${item.title}`}
                    data-progress-step={index}
                    className={`${styles.event} ${active ? styles.eventActive : ""} ${completed ? styles.eventComplete : ""}`}
                    aria-current={active ? "step" : undefined}
                  >
                    <time>{item.time}</time>
                    <span className={styles.eventDot}>{active || completed ? <i /> : null}</span>
                    <div className={styles.eventCard}>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <TeamProductPresentation
              activeScene={activeScene}
              phaseId={phase.id}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
