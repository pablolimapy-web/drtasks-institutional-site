"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { getNextTabIndex } from "@/lib/accessibility";
import styles from "./FinanceFlow.module.css";

type FinanceMode = {
  id: "track" | "buy" | "compare" | "analyze";
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  modules: readonly string[];
};

const modes: readonly FinanceMode[] = [
  {
    id: "track",
    label: "Acompanhe",
    eyebrow: "Leitura financeira",
    title: "Veja entradas, saídas e resultado sem separar o financeiro da operação.",
    description:
      "Receitas, despesas, bancos, resumo e relatórios ajudam a acompanhar o impacto financeiro do trabalho mantendo o contexto do projeto e da OS por perto.",
    image: "/product/pillars/finance.jpg",
    imageAlt: "Central financeira do Dr. Tasks com dados operacionais protegidos",
    modules: ["Receitas", "Despesas", "Bancos", "Resumo"],
  },
  {
    id: "buy",
    label: "Compre",
    eyebrow: "Origem da demanda",
    title: "A solicitação nasce onde a necessidade operacional aparece.",
    description:
      "Pedidos de compra podem ser acompanhados por status e contexto da OS, reduzindo a distância entre quem solicita e quem precisa organizar a compra.",
    image: "/product/finance/requests.jpg",
    imageAlt: "Tela real de solicitações de compra do Dr. Tasks",
    modules: ["Solicitações", "Status", "Custo por OS", "Acompanhamento"],
  },
  {
    id: "compare",
    label: "Compare",
    eyebrow: "Cotação no contexto",
    title: "Compare fornecedores sem perder de vista o trabalho que originou a compra.",
    description:
      "A área de cotações organiza propostas, status e acompanhamento dentro do mesmo ambiente em que o projeto e a OS já existem.",
    image: "/product/finance/quotes.jpg",
    imageAlt: "Tela real de cotações do Dr. Tasks",
    modules: ["Cotações", "Fornecedores", "Status", "Histórico"],
  },
  {
    id: "analyze",
    label: "Analise",
    eyebrow: "Visão consolidada",
    title: "Saia do lançamento isolado e volte para a leitura da carteira.",
    description:
      "Resumo, overhead e relatórios ajudam a consolidar o que aconteceu financeiramente sem apagar a relação com obras, projetos e compromissos operacionais.",
    image: "/product/pillars/finance.jpg",
    imageAlt: "Resumo financeiro consolidado no Dr. Tasks com dados operacionais protegidos",
    modules: ["Resumo", "Overhead", "Relatórios", "Resultado"],
  },
];

const ROTATION_MS = 7200;

export function FinanceFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = modes[activeIndex];
  const paused = manualPaused || interactionPaused;

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(index, modes.length, event.key);
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % modes.length);
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, reducedMotion]);

  return (
    <div
      className={styles.shell}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
      }}
    >
      <div className={styles.controls}>
        <span>Exploração automática do fluxo financeiro</span>
        <button
          type="button"
          aria-pressed={manualPaused}
          disabled={Boolean(reducedMotion)}
          onClick={() => setManualPaused((value) => !value)}
        >
          {reducedMotion ? "Movimento reduzido" : manualPaused ? "Retomar" : "Pausar"}
        </button>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Etapas da rotina financeira no Dr. Tasks">
        {modes.map((mode, index) => {
          const selected = activeIndex === index;
          return (
            <button
              key={mode.id}
              type="button"
              id={`finance-tab-${mode.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`finance-panel-${mode.id}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.activeTab : ""}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{mode.label}</strong>
            </button>
          );
        })}
      </div>

      <div
        className={styles.stage}
        id={`finance-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`finance-tab-${active.id}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${active.id}-visual`}
            className={styles.visual}
            initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.995 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={active.image}
              alt={active.imageAlt}
              width={1728}
              height={891}
              sizes="(max-width: 960px) 100vw, 66vw"
              className={styles.image}
            />
            <span className={styles.realBadge}>Interface real do Dr. Tasks</span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.aside
            key={`${active.id}-copy`}
            className={styles.detail}
            initial={reducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.eyebrow}>{active.eyebrow}</span>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <div className={styles.moduleList}>
              {active.modules.map((module) => <span key={module}>{module}</span>)}
            </div>
          </motion.aside>
        </AnimatePresence>
      </div>
    </div>
  );
}
