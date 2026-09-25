"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ProductPreview } from "@/components/ProductPreview";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./FluxosChapter.module.css";

const stages = ["RECEBIDA", "ANÁLISE", "EXECUÇÃO", "MEDIÇÃO", "NF"] as const;
type Stage = (typeof stages)[number];

const stageDescriptions: Record<Stage, string> = {
  RECEBIDA: "O projeto entra no fluxo e já nasce com contexto, responsável e destino claros.",
  ANÁLISE: "Pendências e informações são conferidas antes de comprometer a execução.",
  EXECUÇÃO: "A equipe atua sabendo o que precisa acontecer e o que bloqueia a entrega.",
  MEDIÇÃO: "O que foi executado vira evidência operacional pronta para conferência.",
  NF: "O ciclo chega ao faturamento com o histórico do projeto preservado desde a origem.",
};

const stageDetails: Record<Stage, { owner: string; time: string; deadline: string }> = {
  RECEBIDA: { owner: "Coordenação", time: "Hoje", deadline: "A iniciar" },
  ANÁLISE: { owner: "Planejamento", time: "1 dia", deadline: "Dentro do previsto" },
  EXECUÇÃO: { owner: "Equipe responsável", time: "6 dias", deadline: "Em andamento" },
  MEDIÇÃO: { owner: "Coordenação técnica", time: "2 dias", deadline: "Dentro do previsto" },
  NF: { owner: "Financeiro", time: "1 dia", deadline: "Fechamento" },
};

function StageCheckIcon({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <svg className={styles.checkIcon} viewBox="0 0 24 24" aria-hidden="true">
      <motion.path
        d="M5 12.5l4.2 4.2L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.38, ease: "easeOut" }}
      />
    </svg>
  );
}

function StageIllustration({ stage, reducedMotion }: { stage: Stage; reducedMotion: boolean }) {
  const draw = {
    initial: reducedMotion ? false : { pathLength: 0, opacity: 0.2 },
    animate: reducedMotion
      ? { pathLength: 1, opacity: 1 }
      : { pathLength: [0, 1, 1, 0], opacity: [0.2, 1, 1, 0.12] },
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 3.6, times: [0, 0.34, 0.76, 1], repeat: Infinity, repeatDelay: 0.55, ease: "easeInOut" as const },
  };

  const path = (d: string, delay = 0) => (
    <motion.path
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={draw.initial}
      animate={draw.animate}
      transition={{ ...draw.transition, delay: reducedMotion ? 0 : delay }}
    />
  );

  switch (stage) {
    case "RECEBIDA":
      return (
        <svg className={styles.stageGlyph} viewBox="0 0 120 120" aria-hidden="true">
          {path("M25 42h70v48H25z", 0)}
          {path("M25 66h20l7 9h16l7-9h20", 0.12)}
          {path("M60 19v34", 0.18)}
          {path("M48 41l12 12 12-12", 0.26)}
        </svg>
      );
    case "ANÁLISE":
      return (
        <svg className={styles.stageGlyph} viewBox="0 0 120 120" aria-hidden="true">
          {path("M52 24a28 28 0 1 0 0 56 28 28 0 0 0 0-56z", 0)}
          {path("M72 72l25 25", 0.12)}
          {path("M41 49h22", 0.2)}
          {path("M41 60h15", 0.28)}
        </svg>
      );
    case "EXECUÇÃO":
      return (
        <svg className={styles.stageGlyph} viewBox="0 0 120 120" aria-hidden="true">
          {path("M68 18L38 63h23l-9 39 31-49H60z", 0)}
          {path("M28 87h19", 0.16)}
          {path("M78 87h14", 0.24)}
        </svg>
      );
    case "MEDIÇÃO":
      return (
        <svg className={styles.stageGlyph} viewBox="0 0 120 120" aria-hidden="true">
          {path("M25 91V27", 0)}
          {path("M25 91h72", 0.08)}
          {path("M36 77l18-19 14 10 22-31", 0.16)}
          {path("M36 91V83", 0.24)}
          {path("M54 91V73", 0.3)}
          {path("M72 91V78", 0.36)}
          {path("M90 91V53", 0.42)}
        </svg>
      );
    case "NF":
      return (
        <svg className={styles.stageGlyph} viewBox="0 0 120 120" aria-hidden="true">
          {path("M34 18h35l18 18v66H34z", 0)}
          {path("M69 18v19h18", 0.12)}
          {path("M46 55h29", 0.2)}
          {path("M46 68h29", 0.28)}
          {path("M46 81h20", 0.36)}
        </svg>
      );
  }
}

export function FluxosChapter() {
  const module = getModuleShowcaseModule("fluxos");
  const reducedMotion = Boolean(useReducedMotion());
  const [activeStage, setActiveStage] = useState(3);
  const interactionPauseUntil = useRef(0);
  const activeStageName = stages[activeStage];

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      if (Date.now() < interactionPauseUntil.current) return;
      setActiveStage((current) => (current + 1) % stages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const selectStage = (index: number) => {
    interactionPauseUntil.current = Date.now() + 9000;
    setActiveStage(index);
  };

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="fluxos-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.lightBandField} aria-hidden="true">
        <span className={`${styles.lightBand} ${styles.lightBandOne}`} />
        <span className={`${styles.lightBand} ${styles.lightBandTwo}`} />
        <span className={`${styles.lightBand} ${styles.lightBandThree}`} />
      </div>
      <div className={styles.inner}>
        <motion.div
          className={styles.cinematicHeader}
          initial={reducedMotion ? false : { opacity: 0, y: 54, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.34 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className={styles.header}>
            <div>
              <motion.span
                className={styles.index}
                initial={reducedMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.7 }}
                transition={{ duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : 0.08 }}
              >
                01 / FLUXOS
              </motion.span>
              <h2 id="fluxos-title">
                Um projeto não é uma linha numa tabela. <em>Ele está indo para algum lugar.</em>
              </h2>
            </div>
            <motion.p
              initial={reducedMotion ? false : { opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.65 }}
              transition={{ duration: reducedMotion ? 0 : 0.72, delay: reducedMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              O FluxOS transforma o processo em uma leitura contínua: onde o projeto está, há quanto tempo, quem precisa agir e qual é a próxima ação.
            </motion.p>
          </header>
        </motion.div>

        <motion.div
          className={styles.cinematicStepper}
          initial={reducedMotion ? false : { opacity: 0, y: 42, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.36 }}
          transition={{ duration: reducedMotion ? 0 : 0.82, delay: reducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className={styles.stageStory} aria-label="Caminho de um projeto">
          {stages.map((stage, index) => {
            const active = index === activeStage;
            const complete = index < activeStage;
            const connectorComplete = activeStage > index;

            return (
              <Fragment key={stage}>
                <button
                  type="button"
                  className={`${styles.stage} ${active ? styles.activeStage : ""} ${complete ? styles.completeStage : ""}`}
                  aria-pressed={active}
                  onClick={() => selectStage(index)}
                >
                  <span className={styles.markerSlot}>
                    <span className={styles.stageDot}>
                      {complete ? <StageCheckIcon reducedMotion={reducedMotion} /> : <span className={styles.dotCore} />}
                      {active && <motion.i className={styles.activeRing} layoutId="fluxos-project-marker" transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 28 }} />}
                    </span>
                  </span>
                  <strong>{stage}</strong>
                  {(active || index === activeStage + 1) && <small>{active ? "estágio atual" : "próximo"}</small>}
                </button>

                {index < stages.length - 1 && (
                  <span className={styles.stageConnector} aria-hidden="true">
                    <motion.span
                      className={styles.connectorFill}
                      initial={false}
                      animate={{ scaleX: connectorComplete ? 1 : 0 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                )}
              </Fragment>
            );
          })}
        </div>
        </motion.div>

        <motion.div
          className={styles.cinematicFocus}
          initial={reducedMotion ? false : { opacity: 0, y: 50, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: reducedMotion ? 0 : 0.86, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
        <div className={styles.stageFocus} aria-live="polite">
          <div className={styles.illustrationShell}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStageName}
                className={styles.stageIllustration}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 1.04, rotate: 3 }}
                transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <StageIllustration stage={activeStageName} reducedMotion={reducedMotion} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.stageReadout}>
            <span className={styles.currentLabel}>ESTÁGIO ATUAL</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStageName}
                initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                <h3>{activeStageName}</h3>
                <p>{stageDescriptions[activeStageName]}</p>
              </motion.div>
            </AnimatePresence>

            <div className={styles.nextAction}>
              <span>Próxima ação</span>
              <strong>{activeStage < stages.length - 1 ? `Avançar para ${stages[activeStage + 1]}` : "Concluir registro"}</strong>
            </div>

            <div className={styles.stageDetails}>
              <div>
                <span>Responsável</span>
                <strong>{stageDetails[activeStageName].owner}</strong>
              </div>
              <div>
                <span>Tempo no estágio</span>
                <strong>{stageDetails[activeStageName].time}</strong>
              </div>
              <div>
                <span>Prazo</span>
                <strong>{stageDetails[activeStageName].deadline}</strong>
              </div>
            </div>
          </div>
        </div>
        </motion.div>

        <div className={styles.visual}>
          <motion.div
            className={styles.productProof}
            initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: reducedMotion ? 0 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.interactiveProduct}>
              <ProductPreview mode="showcase" />
            </div>
          </motion.div>
        </div>

        <div className={styles.cta}><ModuleChapterLink href={module.href} dark>Saiba mais sobre FluxOS</ModuleChapterLink></div>
      </div>
    </section>
  );
}
