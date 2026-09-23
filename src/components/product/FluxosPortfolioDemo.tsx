"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { fluxDemoStages } from "@/lib/fluxCycle";
import { OperationalItemDetail } from "./OperationalItemDetail";
import styles from "./FluxosPortfolioDemo.module.css";

export function FluxosPortfolioDemo() {
  const [activeStage, setActiveStage] = useState(1);
  const [activeOrder, setActiveOrder] = useState(0);
  const reducedMotion = useReducedMotion();

  const stage = fluxDemoStages[activeStage];
  const order = stage.orders[Math.min(activeOrder, stage.orders.length - 1)];
  const totals = useMemo(
    () => ({
      orders: fluxDemoStages.reduce((sum, item) => sum + item.osCount, 0),
      risk: fluxDemoStages.reduce((sum, item) => sum + item.riskCount, 0),
    }),
    [],
  );

  const selectStage = (index: number) => {
    setActiveStage(index);
    setActiveOrder(0);
  };

  return (
    <div className={styles.demo}>
      <div className={styles.demoTop}>
        <div>
          <span className={styles.demoLabel}>Demonstração com dados de exemplo</span>
          <strong>Uma carteira, vários estágios, um próximo passo por vez.</strong>
        </div>
        <div className={styles.portfolioStats} aria-label="Resumo da carteira demonstrativa">
          <span><strong>{totals.orders}</strong> OS na carteira</span>
          <span><strong>{totals.risk}</strong> em atenção</span>
        </div>
      </div>

      <div className={styles.stageRail} role="tablist" aria-label="Estágios do FluxOS">
        {fluxDemoStages.map((item, index) => {
          const selected = index === activeStage;
          return (
            <button
              key={item.id}
              className={`${styles.stageButton} ${selected ? styles.stageButtonActive : ""}`}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectStage(index)}
            >
              <span className={styles.stageIndex}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
              <small>{item.osCount} OS · {item.riskCount} em risco · aging {item.agingDays}d</small>
            </button>
          );
        })}
      </div>

      <div className={styles.demoWorkspace}>
        <aside className={styles.orderColumn}>
          <div className={styles.orderColumnHead}>
            <span>OS em {stage.label}</span>
            <strong>Escolha uma OS para abrir o contexto.</strong>
          </div>
          <div className={styles.orderList}>
            {stage.orders.map((item, index) => {
              const selected = index === activeOrder;
              return (
                <button
                  key={`${stage.id}-${item.id}`}
                  type="button"
                  className={`${styles.orderButton} ${selected ? styles.orderButtonActive : ""}`}
                  aria-pressed={selected}
                  onClick={() => setActiveOrder(index)}
                >
                  <span className={styles.orderIdentity}>
                    <span>{item.id}</span>
                    <strong>{item.title}</strong>
                    <small>{item.responsible} · {item.status}</small>
                  </span>
                  <span className={item.risk ? styles.riskDot : styles.okDot} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </aside>

        <div className={styles.detailColumn}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${stage.id}-${order.id}`}
              initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <OperationalItemDetail stage={stage} order={order} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
