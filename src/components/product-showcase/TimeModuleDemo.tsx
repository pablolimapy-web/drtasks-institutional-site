"use client";

import { DemoShell } from "./DemoShell";
import { DemoTourCue, type DemoTourStep } from "./DemoTourCue";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./TimeModuleDemo.module.css";

const DURATIONS = [1500, 1400, 1700, 1900, 2100] as const;
const TOUR_STEPS: readonly DemoTourStep[] = [
  {
    label: "Abrindo a gestão de tempo",
    left: "82%",
    top: "11%",
    placement: "top-left",
    block: { variant: "metric", eyebrow: "Painel do dia", icon: "◷", title: "Horas hoje", value: "00:42:18", meta: "timer pronto para iniciar" },
  },
  {
    label: "Iniciando o timer no projeto",
    left: "82%",
    top: "18%",
    placement: "top-right",
    click: true,
    block: { variant: "context", eyebrow: "Timer ativo", icon: "▶", title: "Projeto 130 · inspeção técnica", description: "O tempo passa a ser capturado diretamente no contexto da atividade.", metrics: [{ label: "Tempo", value: "00:42:18" }, { label: "Tipo", value: "Faturável" }] },
  },
  {
    label: "Atualizando horas do dia e da semana",
    left: "48%",
    top: "35%",
    placement: "bottom-left",
    click: true,
    block: { variant: "split", eyebrow: "Indicadores", icon: "◫", left: { label: "Hoje", value: "00:42:18" }, right: { label: "Semana", value: "31:26:40" }, meta: "produtividade atualizada em tempo real" },
  },
  {
    label: "Conferindo onde o tempo foi usado",
    left: "70%",
    top: "65%",
    placement: "right-center",
    click: true,
    block: { variant: "context", eyebrow: "Registro em foco", icon: "◆", title: "Projeto 130", description: "A maior parte do tempo registrado está concentrada na inspeção técnica.", metrics: [{ label: "Tempo", value: "01:18:24" }, { label: "Status", value: "Faturável" }] },
  },
  {
    label: "Fechando a leitura de produtividade",
    left: "76%",
    top: "83%",
    placement: "bottom-right",
    click: true,
    block: { variant: "metric", eyebrow: "Leitura final", icon: "◎", title: "Capacidade faturável", value: "88%", meta: "31h 26m de 40h semanais" },
  },
];

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

export function TimeModuleDemo({ paused, reducedMotion, loop }: { paused: boolean; reducedMotion: boolean; loop: boolean }) {
  const activeSceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 4, speed: 1, loop });
  const timerActive = activeSceneIndex >= 1;

  return (
    <DemoShell activeNav="Equipe" ariaLabel="Demonstração da gestão de tempo e produtividade">
      <div
        className={styles.page}
        data-scene={activeSceneIndex}
        data-paused={paused ? "true" : "false"}
        data-reduced-motion={reducedMotion ? "true" : "false"}
      >
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
            <article className={(activeSceneIndex >= 2 && (label === "Hoje" || label === "Esta semana")) || (activeSceneIndex >= 4 && label === "Faturável") ? styles.pulse : undefined} key={label} style={{ "--i": index } as React.CSSProperties}>
              <span>{label}</span><strong>{activeSceneIndex < 2 && (label === "Hoje" || label === "Esta semana") ? "00:00:00" : value}</strong>
            </article>
          ))}
        </section>

        <div className={styles.filters}>
          <span>Usuário <b>Todos</b></span><span>Projeto <b>{activeSceneIndex >= 3 ? "Projeto 130" : "Todos"}</b></span><span>Período <b>Esta semana</b></span>
        </div>

        <section className={styles.records}>
          <div className={styles.recordsHead}><span>Contexto</span><span>Atividade</span><span>Tempo</span><span>Tipo</span></div>
          {records.map((record, index) => (
            <div className={`${styles.record} ${activeSceneIndex >= 3 && index === 0 ? styles.recordFocus : ""}`} key={record[0]} style={{ "--row": index } as React.CSSProperties}>
              <strong>{record[0]}</strong><span>{record[1]}</span><b>{record[2]}</b><em>{record[3]}</em>
            </div>
          ))}
        </section>

        <div className={styles.goal}>
          <span><b style={{ width: activeSceneIndex >= 4 ? "79%" : "48%" }} /></span>
          <p><strong>31h 26m</strong> de 40h semanais · <b>88%</b> do tempo registrado é faturável</p>
        </div>

        <DemoTourCue
          module="time"
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
