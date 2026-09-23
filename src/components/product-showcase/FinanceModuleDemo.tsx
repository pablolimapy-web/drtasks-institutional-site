"use client";

import { DemoShell } from "./DemoShell";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./FinanceModuleDemo.module.css";

const DURATIONS = [650, 900, 1100, 1450] as const;
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
  const sceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 3, speed: 0.65, loop });

  return (
    <DemoShell activeNav="Financeiro" ariaLabel="Demonstração da gestão financeira do Dr. Tasks">
      <div className={styles.page} data-scene={sceneIndex}>
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
            <article className={label === "Saldo" ? styles.balanceCard : undefined} key={label} style={{ "--i": index } as React.CSSProperties}>
              <span>{label}</span><strong>{value}</strong>
            </article>
          ))}
        </section>

        <div className={styles.filters}>
          <span>Ano <b>2026</b></span><span>Status <b>Todos</b></span><span>Competência <b>Setembro</b></span><span className={styles.filterAction}>⌕ Filtrar projetos</span>
        </div>

        <section className={styles.grid} aria-label="Resumo financeiro por projeto">
          <div className={styles.gridHead}><span>Projeto</span><span>Status</span><span>Mês</span><span>Emitido</span><span>Recebido</span><span>Saldo</span></div>
          {rows.map((row, index) => (
            <div className={`${styles.gridRow} ${index === 1 ? styles.focused : ""}`} key={row.project}>
              <strong>{row.project}</strong><span className={styles.status}>{row.status}</span><span>{row.month}</span><span>{row.emitted}</span><span>{row.received}</span><b>{row.balance}</b>
            </div>
          ))}
        </section>
      </div>
    </DemoShell>
  );
}
