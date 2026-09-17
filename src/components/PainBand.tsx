"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { HistoryIcon, UsersIcon, WorkflowIcon } from "./Icons";
import {
  diagnosticQuestions,
  diagnosticStages,
  operationalCase,
} from "@/lib/operationalDiagnostic";
import styles from "./PainBand.module.css";

const questionIcons = [WorkflowIcon, UsersIcon, HistoryIcon] as const;
const AUTOPLAY_MS = 4800;

export function PainBand() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const activeQuestion = diagnosticQuestions[activeIndex];
  const ActiveIcon = questionIcons[activeIndex];
  const activeStageIndex = diagnosticStages.indexOf(operationalCase.currentStage);

  useEffect(() => {
    if (reducedMotion || isInteracting) return;

    const interval = window.setInterval(() => {
      setActiveIndex(current => (current + 1) % diagnosticQuestions.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [reducedMotion, isInteracting]);

  return (
    <section className={`pain-band section ${styles.section}`} id="dor">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">Clareza operacional</span>
            <h2>Feito para quem já perdeu tempo perguntando pelo status.</h2>
          </div>
          <p>
            O Dr. Tasks transforma dúvidas operacionais em respostas visíveis —
            sem depender de mensagens soltas, planilhas paralelas ou reuniões de status.
          </p>
        </div>

        <motion.div
          className={styles.diagnosticShell}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          <div className={styles.questionRail}>
            <div className={styles.railLabel}>
              <span>Diagnóstico operacional</span>
              <i aria-hidden="true" />
            </div>

            <div className={styles.questionList} role="tablist" aria-label="Perguntas operacionais">
              {diagnosticQuestions.map((item, index) => {
                const Icon = questionIcons[index];
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="operational-diagnostic-panel"
                    className={`${styles.questionButton} ${isActive ? styles.questionButtonActive : ""}`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => {
                      setActiveIndex(index);
                      setIsInteracting(true);
                    }}
                    onBlur={() => setIsInteracting(false)}
                  >
                    <span className={styles.questionNumber}>{item.number}</span>
                    <span className={styles.questionIcon}><Icon /></span>
                    <span className={styles.questionCopy}>
                      <strong>{item.question}</strong>
                      <small>{item.hint}</small>
                    </span>
                    <span className={styles.questionArrow} aria-hidden="true">↗</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.railFooter}>
            </div>
          </div>

          <div className={styles.casePanel} id="operational-diagnostic-panel" role="tabpanel">
            <div className={styles.caseHeader}>
              <div>
                <span className={styles.caseCode}>{operationalCase.code}</span>
                <strong>{operationalCase.title}</strong>
              </div>
              <span className={styles.caseStatus}>
                <i aria-hidden="true" />
                {operationalCase.status}
              </span>
            </div>

            <div className={styles.stageMap} aria-label="Caminho da ordem de serviço">
              <div className={styles.stageLine} aria-hidden="true">
                <motion.span
                  animate={{ width: `${(activeStageIndex / (diagnosticStages.length - 1)) * 100}%` }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              {diagnosticStages.map((stage, index) => {
                const isDone = index < activeStageIndex;
                const isCurrent = index === activeStageIndex;
                return (
                  <div
                    className={`${styles.stage} ${isDone ? styles.stageDone : ""} ${isCurrent ? styles.stageCurrent : ""}`}
                    key={stage}
                  >
                    <span className={styles.stageNode}>{isDone ? "✓" : index + 1}</span>
                    <small>{stage}</small>
                  </div>
                );
              })}
            </div>

            <div className={styles.answerArea} data-tone={activeQuestion.id === "blocker" ? "warning" : "brand"}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuestion.id}
                  className={styles.answerContent}
                  initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.answerIcon}><ActiveIcon /></div>
                  <div className={styles.answerCopy}>
                    <span>{activeQuestion.label}</span>
                    <strong>{activeQuestion.value}</strong>
                    <p>{activeQuestion.detail}</p>
                  </div>
                  <div className={styles.answerSignal} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.caseDetails}>
              <div className={`${styles.detailCard} ${activeQuestion.id === "stage" ? styles.detailCardActive : ""}`}>
                <span>Estágio</span>
                <strong>{operationalCase.currentStage}</strong>
                <small>{operationalCase.aging}</small>
              </div>
              <div className={`${styles.detailCard} ${activeQuestion.id === "owner" ? styles.detailCardActive : ""}`}>
                <span>Responsável</span>
                <strong className={styles.ownerLine}><i>MA</i>{operationalCase.owner}</strong>
                <small>Próxima ação definida</small>
              </div>
              <div className={styles.detailCard}>
                <span>Prazo</span>
                <strong>{operationalCase.deadline}</strong>
                <small>Dentro do acompanhamento</small>
              </div>
              <div className={`${styles.detailCard} ${styles.blockerCard} ${activeQuestion.id === "blocker" ? styles.detailCardActive : ""}`}>
                <span>Bloqueio</span>
                <strong>{operationalCase.blocker}</strong>
                <small>{operationalCase.lastMovement}</small>
              </div>
            </div>

            <div className={styles.nextAction}>
              <div>
                <span>Próxima ação</span>
                <strong>{operationalCase.nextAction}</strong>
              </div>
              <div className={styles.nextActionMeta}>
                <span>Responsável</span>
                <strong>{operationalCase.owner}</strong>
              </div>
            </div>

            <div className={styles.closingLine}>
              <span className={styles.closingPulse} aria-hidden="true" />
              <strong>O status deixa de ser uma pergunta.</strong>
              <span>Ele vira contexto para agir.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
