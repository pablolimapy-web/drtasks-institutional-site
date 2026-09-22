"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { ArrowRightIcon } from "./Icons";
import { fluxDemoStages, nextFluxStep } from "@/lib/fluxCycle";
import styles from "./FluxOS.module.css";

const HOLD_MS = 4600;

export function FluxOS() {
  const [activeStage, setActiveStage] = useState(3);
  const [activeOrder, setActiveOrder] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const stage = fluxDemoStages[activeStage];
  const order = stage.orders[Math.min(activeOrder, stage.orders.length - 1)];

  const progress = useMemo(() => {
    if (fluxDemoStages.length <= 1) return 0;
    return (activeStage / (fluxDemoStages.length - 1)) * 100;
  }, [activeStage]);

  useEffect(() => {
    if (paused || reducedMotion) return;

    const timer = window.setTimeout(() => {
      setActiveStage(current => nextFluxStep(current, fluxDemoStages.length));
      setActiveOrder(0);
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [activeStage, paused, reducedMotion]);

  const selectStage = (index: number) => {
    setActiveStage(index);
    setActiveOrder(0);
    setPaused(true);
  };

  const selectOrder = (index: number) => {
    setActiveOrder(index);
    setPaused(true);
  };

  return (
    <section className={`section flux-section ${styles.section}`} id="fluxos">
      <div className={`container ${styles.shell}`}>
        <header className={styles.header}>
          <div>
            <span className="eyebrow">O coração do Dr. Tasks</span>
            <h2>Cada OS tem um caminho. A equipe precisa enxergar o próximo passo.</h2>
          </div>
          <p>
            Veja a carteira inteira por estágios e abra o contexto de uma OS sem perder a visão da operação.
          </p>
        </header>

        <div
          className={styles.experience}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.topline}>
            <div className={styles.demoLabel}>
              <span />
              Demonstração com dados de exemplo
            </div>
            <button
              className={styles.pauseButton}
              type="button"
              onClick={() => setPaused(value => !value)}
              aria-pressed={paused}
            >
              {paused ? "Retomar" : "Pausar"}
            </button>
          </div>

          <div className={styles.journey}>
            <div className={styles.track} aria-hidden="true">
              <motion.span
                animate={{ width: `${progress}%` }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className={styles.stageRow} role="tablist" aria-label="Estágios demonstrativos da carteira">
              {fluxDemoStages.map((item, index) => {
                const active = activeStage === index;
                const complete = index < activeStage;

                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`${styles.stage} ${active ? styles.stageActive : ""} ${complete ? styles.stageComplete : ""}`}
                    onClick={() => selectStage(index)}
                    role="tab"
                    aria-selected={active}
                  >
                    <span className={styles.stageNode}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.stageLabel}>{item.label}</span>
                    <span className={styles.stageCount}>{item.osCount} OS</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.stageSummary}>
            <div>
              <span className={styles.summaryEyebrow}>Etapa selecionada</span>
              <strong>{stage.label}</strong>
            </div>
            <dl className={styles.summaryMetrics}>
              <div>
                <dt>Na etapa</dt>
                <dd>{stage.osCount} OS</dd>
              </div>
              <div>
                <dt>Em risco</dt>
                <dd className={stage.riskCount ? styles.warningValue : ""}>{stage.riskCount}</dd>
              </div>
              <div>
                <dt>Aging médio</dt>
                <dd>{stage.agingDays} dias</dd>
              </div>
            </dl>
          </div>

          <div className={styles.workspace}>
            <aside className={styles.orderPane} aria-label={`OS no estágio ${stage.label}`}>
              <div className={styles.orderPaneHead}>
                <div>
                  <span>OS em {stage.label}</span>
                  <strong>Escolha uma OS para abrir o contexto.</strong>
                </div>
                <span className={styles.listCount}>{stage.orders.length} exemplos</span>
              </div>

              <div className={styles.orderList}>
                {stage.orders.map((item, index) => {
                  const selected = activeOrder === index;
                  return (
                    <button
                      type="button"
                      key={`${stage.id}-${item.id}`}
                      className={`${styles.orderItem} ${selected ? styles.orderItemActive : ""}`}
                      onClick={() => selectOrder(index)}
                      aria-pressed={selected}
                    >
                      <span className={styles.orderAccent} />
                      <span className={styles.orderMain}>
                        <span className={styles.orderId}>{item.id}</span>
                        <strong>{item.title}</strong>
                        <span className={styles.orderMeta}>
                          {item.responsible} · {item.status}
                        </span>
                      </span>
                      <span className={item.risk ? styles.riskPill : styles.okPill}>
                        {item.risk ? "Atenção" : "No fluxo"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className={styles.detailPane}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={`${stage.id}-${order.id}`}
                  className={styles.detailCard}
                  initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.detailHead}>
                    <div>
                      <span className={styles.detailKicker}>{stage.label}</span>
                      <h3>{order.id} · {order.title}</h3>
                    </div>
                    <span className={order.risk ? styles.detailRisk : styles.detailOk}>
                      {order.risk ? "Requer atenção" : "Dentro do fluxo"}
                    </span>
                  </div>

                  <div className={styles.detailFields}>
                    <div>
                      <span>Responsável</span>
                      <strong>{order.responsible}</strong>
                    </div>
                    <div>
                      <span>Prazo</span>
                      <strong>{order.deadline}</strong>
                    </div>
                    <div>
                      <span>Situação</span>
                      <strong>{order.status}</strong>
                    </div>
                  </div>

                  <div className={styles.actionBlock}>
                    <span className={styles.blockLabel}>Próxima ação</span>
                    <strong>{order.nextAction}</strong>
                    <span className={styles.actionLine} aria-hidden="true" />
                  </div>

                  <div className={`${styles.blockerBlock} ${!order.blocker ? styles.blockerClear : ""}`}>
                    <span className={styles.blockLabel}>Bloqueio</span>
                    <strong>{order.blocker || "Nenhum bloqueio registrado"}</strong>
                    <span className={styles.blockerDot} aria-hidden="true" />
                  </div>

                  <div className={styles.detailFooter}>
                    <span>Última movimentação</span>
                    <strong>{order.lastMovement}</strong>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <a href="#como-funciona" className={`text-link ${styles.moreLink}`}>
          Entender o modelo do produto <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}
