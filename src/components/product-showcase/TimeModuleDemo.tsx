"use client";

import { DemoShell } from "./DemoShell";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./TimeModuleDemo.module.css";

const DURATIONS = [650, 800, 900, 1050, 1350] as const;
const tabs = ["Gestão", "Meu painel", "Registros", "Aprovações"] as const;
const timeKpis = [
  ["Tempo total", "388:19:24"],
  ["Hoje", "00:42:18"],
  ["Esta semana", "31:26:40"],
  ["Faturável", "352:18:36"],
  ["Não faturável", "36:00:48"],
  ["Meta semanal", "40:00:00"],
] as const;
const records = [
  ["Projeto 130", "Inspeção técnica", "01:18:24", "Faturável"],
  ["Projeto 146", "Revisão documental", "00:46:12", "Faturável"],
  ["Operação interna", "Alinhamento de equipe", "00:32:08", "Não faturável"],
] as const;

export function TimeModuleDemo({ paused, reducedMotion }: { paused: boolean; reducedMotion: boolean }) {
  const sceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 4 });
  const timerActive = sceneIndex >= 1;

  return (
    <DemoShell activeNav="Equipe" ariaLabel="Demonstração da gestão de tempo e produtividade">
      <div className={styles.page} data-scene={sceneIndex}>
        <header className={styles.hero}>
          <div>
            <span>GESTÃO DE TEMPO</span>
            <h3>Tempo e produtividade</h3>
            <p>Timers, lançamentos, aprovações e análise operacional em um só lugar.</p>
          </div>
          <span className={`${styles.timerAction} ${timerActive ? styles.timerActive : ""}`}>
            <i>{timerActive ? "■" : "▶"}</i>{timerActive ? "00:42:18 em andamento" : "Iniciar timer"}
          </span>
        </header>

        <nav className={styles.tabs} aria-label="Seções de Gestão de Tempo">
          {tabs.map((tab, index) => <span className={index === 0 ? styles.active : undefined} key={tab}>{tab}</span>)}
        </nav>

        <section className={styles.kpis}>
          {timeKpis.map(([label, value], index) => (
            <article className={(sceneIndex >= 2 && (label === "Hoje" || label === "Esta semana")) || (sceneIndex >= 4 && label === "Faturável") ? styles.pulse : undefined} key={label} style={{ "--i": index } as React.CSSProperties}>
              <span>{label}</span><strong>{sceneIndex < 2 && (label === "Hoje" || label === "Esta semana") ? "00:00:00" : value}</strong>
            </article>
          ))}
        </section>

        <div className={styles.filters}>
          <span>Usuário <b>Todos</b></span><span>Projeto <b>Todos</b></span><span>Período <b>Esta semana</b></span>
        </div>

        <section className={styles.records}>
          <div className={styles.recordsHead}><span>Contexto</span><span>Atividade</span><span>Tempo</span><span>Tipo</span></div>
          {records.map((record, index) => (
            <div className={styles.record} key={record[0]} style={{ "--row": index } as React.CSSProperties}>
              <strong>{record[0]}</strong><span>{record[1]}</span><b>{record[2]}</b><em>{record[3]}</em>
            </div>
          ))}
        </section>

        <div className={styles.goal}>
          <span><b style={{ width: sceneIndex >= 4 ? "79%" : "48%" }} /></span>
          <p><strong>31h 26m</strong> de 40h semanais · <b>88%</b> do tempo registrado é faturável</p>
        </div>
      </div>
    </DemoShell>
  );
}
