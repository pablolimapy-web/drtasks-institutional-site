"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./HowItWorks.module.css";

type StepIconName = "context" | "flow" | "work" | "next";

const steps = [
  {
    title: "Contexto",
    body: "Instituição, cliente, workspace e projeto dão o contexto.",
    icon: "context" as StepIconName,
  },
  {
    title: "Fluxo",
    body: "Os estágios organizam o processo como ele realmente funciona.",
    icon: "flow" as StepIconName,
  },
  {
    title: "Trabalho",
    body: "Tarefas e responsáveis deixam claro quem faz o que e em qual prazo.",
    icon: "work" as StepIconName,
  },
  {
    title: "Próxima ação",
    body: "A leitura termina no que precisa acontecer agora.",
    icon: "next" as StepIconName,
  },
] as const;

function StepIcon({ name }: { name: StepIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "context") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="m4.5 6.2 5-2.2 5 2.2 5-2.2v13.8l-5 2.2-5-2.2-5 2.2z" />
        <path {...common} d="M9.5 4v13.8M14.5 6.2V20" />
        <circle {...common} cx="12" cy="10.5" r="1.5" />
      </svg>
    );
  }

  if (name === "flow") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path {...common} d="m12 3.8 8 4.1-8 4.1-8-4.1z" />
        <path {...common} d="m4 12 8 4.1 8-4.1M4 16.2l8 4 8-4" />
      </svg>
    );
  }

  if (name === "work") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect {...common} x="5" y="4" width="14" height="16" rx="2" />
        <path {...common} d="m8.3 9.2 1.3 1.3 2.1-2.3M13.5 9.5h2.7M8.3 14.2l1.3 1.3 2.1-2.3M13.5 14.5h2.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path {...common} d="M5 12h13M13 6.5 18.5 12 13 17.5" />
    </svg>
  );
}

type HowPresentationPhaseId =
  | "section-opening"
  | "headline"
  | "intro"
  | "path"
  | "context"
  | "flow"
  | "work"
  | "next"
  | "hierarchy"
  | "cta"
  | "settled";

const HOW_PRESENTATION_SEQUENCE: readonly { id: HowPresentationPhaseId; durationMs: number }[] = [
  { id: "section-opening", durationMs: 2600 },
  { id: "headline", durationMs: 650 },
  { id: "intro", durationMs: 550 },
  { id: "path", durationMs: 1250 },
  { id: "context", durationMs: 650 },
  { id: "flow", durationMs: 650 },
  { id: "work", durationMs: 650 },
  { id: "next", durationMs: 650 },
  { id: "hierarchy", durationMs: 650 },
  { id: "cta", durationMs: 650 },
  { id: "settled", durationMs: 0 },
] as const;

function getNextHowPresentationPhaseIndex(current: number) {
  return Math.min(current + 1, HOW_PRESENTATION_SEQUENCE.length - 1);
}

export function HowItWorks() {
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasOutside = useRef(true);
  const [isVisible, setIsVisible] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(reducedMotion ? HOW_PRESENTATION_SEQUENCE.length - 1 : 0);

  const phase = HOW_PRESENTATION_SEQUENCE[phaseIndex] ?? HOW_PRESENTATION_SEQUENCE[0];
  const opening = phase.id === "section-opening";
  const headlineVisible = phaseIndex >= 1;
  const introVisible = phaseIndex >= 2;
  const pathVisible = phaseIndex >= 3;
  const hierarchyVisible = phaseIndex >= 8;
  const ctaVisible = phaseIndex >= 9;

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
          setPhaseIndex(reducedMotion ? HOW_PRESENTATION_SEQUENCE.length - 1 : 0);
        }
      },
      { threshold: [0, 0.18] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !isVisible || phase.id === "settled") return;

    const timer = window.setTimeout(() => {
      setPhaseIndex((current) => getNextHowPresentationPhaseIndex(current));
    }, phase.durationMs);

    return () => window.clearTimeout(timer);
  }, [isVisible, phase.durationMs, phase.id, reducedMotion]);

  return (
    <section ref={sectionRef} className={styles.section} id="como-funciona" aria-labelledby="how-it-works-title">
      <span className={styles.backgroundArc} aria-hidden="true" />
      <span className={styles.backgroundGlow} aria-hidden="true" />

      <AnimatePresence initial={false}>
        {opening ? (
          <motion.div
            key="how-opening"
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
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
            >
              DR.TASKS / CAPÍTULO 06
            </motion.span>

            <div className={styles.openingTitleRow}>
              <motion.span
                className={styles.openingIndex}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.82, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                06
              </motion.span>

              <motion.div
                className={styles.openingTitle}
                initial={reducedMotion ? false : { opacity: 0, x: 30, filter: "blur(9px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: reducedMotion ? 0 : 0.78, delay: reducedMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <strong>COMO</strong>
                <span>FUNCIONA</span>
              </motion.div>
            </div>

            <motion.div
              className={styles.openingBridge}
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.18 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                ["01", "CONTEXTO"],
                ["02", "FLUXO"],
                ["03", "TRABALHO"],
                ["04", "AÇÃO"],
              ].map(([index, label]) => (
                <span className={styles.openingBridgeNode} key={label}>
                  <i>{index}</i>
                  <b>{label}</b>
                </span>
              ))}
              <span className={styles.openingBridgeLine}><i /></span>
            </motion.div>

            <motion.p
              className={styles.openingStatement}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.72 }}
            >
              Não é uma sequência de telas. É um caminho operacional.
            </motion.p>
            <span className={styles.openingGlow} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className={`${styles.inner} ${opening ? styles.innerOpening : ""}`}
        animate={opening && !reducedMotion
          ? { opacity: 0.14, scale: 0.988, filter: "blur(10px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className={styles.header}>
          <motion.div
            className={styles.headingBlock}
            initial={false}
            animate={headlineVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0 0 0)" }
              : { opacity: 0, y: 24, filter: "blur(9px)", clipPath: "inset(0 0 35% 0)" }}
            transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.kicker}>06 / COMO FUNCIONA</span>
            <h2 id="how-it-works-title">
              Não é uma sequência<br />
              de telas. <em>É um caminho<br />operacional.</em>
            </h2>
          </motion.div>

          <motion.p
            className={styles.intro}
            initial={false}
            animate={introVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(7px)" }}
            transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            Do contexto à próxima ação, cada nível existe para responder uma pergunta diferente sem perder a ligação com o trabalho real.
          </motion.p>
        </header>

        <div className={styles.pathStage}>
          <svg className={styles.operationalPath} viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              className={styles.pathBase}
              d="M125 58 C215 90 286 26 375 58 C468 90 534 27 625 58 C718 88 788 29 875 58 C924 73 954 63 985 40"
            />
            <motion.path
              className={styles.pathGlow}
              d="M125 58 C215 90 286 26 375 58 C468 90 534 27 625 58 C718 88 788 29 875 58 C924 73 954 63 985 40"
              initial={false}
              animate={{ pathLength: pathVisible ? 1 : 0, opacity: pathVisible ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 1.22, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <div className={styles.stepsGrid}>
            {steps.map((step, index) => {
              const stepPhaseIndex = 4 + index;
              const visible = phaseIndex >= stepPhaseIndex;
              const active = phaseIndex === stepPhaseIndex;
              const complete = phaseIndex > stepPhaseIndex;

              return (
                <motion.article
                  className={`${styles.node} ${active ? styles.nodeActive : ""} ${complete ? styles.nodeComplete : ""}`}
                  key={step.title}
                  initial={false}
                  animate={visible
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 18, filter: "blur(8px)" }}
                  transition={{ duration: reducedMotion ? 0 : 0.54, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className={styles.nodeIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <motion.span
                    className={styles.nodeIcon}
                    animate={visible
                      ? { scale: active ? 1.055 : 1, opacity: 1 }
                      : { scale: 0.72, opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StepIcon name={step.icon} />
                    <i aria-hidden="true" />
                  </motion.span>
                  <div className={styles.nodeBody}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          className={styles.footerBand}
          initial={false}
          animate={hierarchyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.hierarchy} aria-label="Hierarquia operacional">
            {["Instituição", "Workspace", "Projeto", "Estágio", "Tarefa"].map((item, index, items) => (
              <motion.span
                className={styles.hierarchyItem}
                key={item}
                initial={false}
                animate={hierarchyVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.36, delay: reducedMotion ? 0 : index * 0.055 }}
              >
                <b>{item}</b>
                {index < items.length - 1 ? <i aria-hidden="true">→</i> : null}
              </motion.span>
            ))}
          </div>

          <div className={styles.footerActions}>
            <motion.div
              initial={false}
              animate={ctaVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link className={styles.cta} href="/como-funciona">
                <span>Entender como o Dr. Tasks organiza o trabalho</span>
                <i aria-hidden="true">→</i>
              </Link>
            </motion.div>
            <motion.span
              className={styles.signature}
              initial={false}
              animate={ctaVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.44, delay: reducedMotion ? 0 : 0.08 }}
            >
              FluxOS visão operacional
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
