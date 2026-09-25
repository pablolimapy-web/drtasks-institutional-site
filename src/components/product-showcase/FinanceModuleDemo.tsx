"use client";

import { DemoShell } from "./DemoShell";
import { DemoTourCue, type DemoTourStep } from "./DemoTourCue";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./FinanceModuleDemo.module.css";

const DURATIONS = [1500, 1500, 1600, 1900, 2100] as const;
const TOUR_STEPS: readonly DemoTourStep[] = [
  {
    label: "Abrindo o resumo financeiro",
    left: "81%",
    top: "11%",
    placement: "bottom-left",
    block: { variant: "metric", eyebrow: "Resumo", icon: "◌", title: "Saldo consolidado", value: "R$ 378 mil", meta: "carteira conciliada" },
  },
  {
    label: "Conferindo emitido, recebido e saldo",
    left: "79%",
    top: "31%",
    placement: "top-right",
    click: true,
    block: { variant: "split", eyebrow: "Leitura principal", icon: "◫", left: { label: "Emitido", value: "R$ 466 mil" }, right: { label: "Recebido", value: "R$ 362 mil" }, meta: "Saldo atual: R$ 104 mil" },
  },
  {
    label: "Filtrando recebimentos pendentes",
    left: "70%",
    top: "47%",
    placement: "bottom-left",
    click: true,
    block: { variant: "progress", eyebrow: "Filtro aplicado", icon: "◇", title: "Recebimentos pendentes", progress: 62, meta: "3 linhas com maior impacto" },
  },
  {
    label: "Abrindo a linha com maior saldo",
    left: "82%",
    top: "68%",
    placement: "right-center",
    click: true,
    block: { variant: "context", eyebrow: "Projeto em foco", icon: "◆", title: "Projeto 146", description: "Maior saldo em aberto dentro do período filtrado.", metrics: [{ label: "Emitido", value: "R$ 38 mil" }, { label: "Saldo", value: "R$ 38 mil" }] },
  },
  {
    label: "Consolidando a margem da carteira",
    left: "78%",
    top: "31%",
    placement: "bottom-right",
    click: true,
    block: { variant: "metric", eyebrow: "Resultado", icon: "◎", title: "Margem consolidada", value: "62,6%", meta: "operação conciliada" },
  },
];

const financeAreas = ["Receitas", "Despesas", "Bancos", "Resumo", "Overhead", "Relatórios"] as const;
const summary = [
  ["Obras", "566"],
  ["Emitido", "R$ 466 mil"],
  ["Recebido", "R$ 362 mil"],
  ["Saldo", "R$ 378 mil"],
] as const;

const rows = [
  { project: "Projeto 130", status: "Recebido", month: "Set/26", emitted: "R$ 84 mil", received: "R$ 76 mil", balance: "R$ 8 mil" },
  { project: "Projeto 102", status: "Parcial", month: "Set/26", emitted: "R$ 61 mil", received: "R$ 42 mil", balance: "R$ 19 mil" },
  { project: "Projeto 146", status: "A faturar", month: "Out/26", emitted: "R$ 38 mil", received: "R$ 0", balance: "R$ 38 mil" },
  { project: "Projeto 154", status: "Recebido", month: "Ago/26", emitted: "R$ 27 mil", received: "R$ 27 mil", balance: "R$ 0" },
] as const;

export function FinanceModuleDemo({ paused, reducedMotion, loop }: { paused: boolean; reducedMotion: boolean; loop: boolean }) {
  const activeSceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 4, speed: 1, loop });
  const filtered = activeSceneIndex >= 2;
  const consolidated = activeSceneIndex >= 4;

  return (
    <DemoShell activeNav="Financeiro" ariaLabel="Demonstração da gestão financeira do Dr. Tasks">
      <div
        className={styles.page}
        data-scene={activeSceneIndex}
        data-paused={paused ? "true" : "false"}
        data-reduced-motion={reducedMotion ? "true" : "false"}
      >
        <header className={styles.identity}>
          <div>
            <span>GESTÃO FINANCEIRA</span>
            <h3>Financeiro</h3>
            <p>Entradas, saídas e resultado consolidados no contexto da operação.</p>
          </div>
          <span className={styles.primaryAction}>+ Novo lançamento</span>
        </header>

        <nav className={styles.areaNav} aria-label="Áreas financeiras">
          {financeAreas.map((area, index) => <span className={index === 3 ? styles.active : undefined} key={area}>{area}</span>)}
        </nav>

        <section className={styles.summary}>
          {summary.map(([label, value], index) => (
            <article
              className={label === "Saldo" ? `${styles.balanceCard} ${activeSceneIndex >= 1 ? styles.summaryFocus : ""}` : undefined}
              key={label}
              style={{ "--i": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <strong>{label === "Saldo" && consolidated ? "R$ 397 mil" : value}</strong>
              {label === "Saldo" && consolidated && <small>+5,0% após conciliação</small>}
            </article>
          ))}
        </section>

        <div className={styles.filters}>
          <span>Ano <b>2026</b></span>
          <span>Status <b>{filtered ? "Pendente" : "Todos"}</b></span>
          <span>Competência <b>Setembro</b></span>
          <span className={`${styles.filterAction} ${filtered ? styles.filterActive : ""}`}>⌕ {filtered ? "2 projetos encontrados" : "Filtrar projetos"}</span>
        </div>

        <section className={styles.grid} aria-label="Resumo financeiro por projeto">
          <div className={styles.gridHead}><span>Projeto</span><span>Status</span><span>Mês</span><span>Emitido</span><span>Recebido</span><span>Saldo</span></div>
          {rows.map((row, index) => {
            const hiddenByFilter = filtered && !(index === 1 || index === 2);
            return (
              <div
                className={`${styles.gridRow} ${index === 2 ? styles.focused : ""} ${hiddenByFilter ? styles.filteredOut : ""}`}
                key={row.project}
                style={{ "--row": index } as React.CSSProperties}
              >
                <strong>{row.project}</strong><span className={styles.status}>{row.status}</span><span>{row.month}</span><span>{row.emitted}</span><span>{row.received}</span><b>{row.balance}</b>
              </div>
            );
          })}
        </section>

        <div className={`${styles.marginResult} ${consolidated ? styles.marginResultVisible : ""}`} aria-hidden={!consolidated}>
          <span>Margem consolidada</span><strong>62,6%</strong><i>Operação conciliada</i>
        </div>

        <DemoTourCue
          module="finance"
          step={TOUR_STEPS[activeSceneIndex] ?? TOUR_STEPS[0]}
          sceneIndex={activeSceneIndex}
          totalScenes={TOUR_STEPS.length}
          paused={paused}
          reducedMotion={reducedMotion}
        />
      </div>
    </DemoShell>
  );
}
