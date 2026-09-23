"use client";

import { DemoShell } from "./DemoShell";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./LocationModuleDemo.module.css";

const DURATIONS = [650, 850, 1000, 1100, 1400] as const;
const views = ["Kanban", "Tabela", "Gantt", "Calendário", "Localização", "Relatórios"] as const;
const markers = [
  { id: "A", x: 22, y: 36, status: "today" },
  { id: "B", x: 48, y: 24, status: "upcoming" },
  { id: "C", x: 67, y: 55, status: "overdue" },
  { id: "D", x: 78, y: 32, status: "completed" },
] as const;

export function LocationModuleDemo({ paused, reducedMotion, loop }: { paused: boolean; reducedMotion: boolean; loop: boolean }) {
  const sceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 4, speed: 0.65, loop });

  return (
    <DemoShell activeNav="Localização" ariaLabel="Demonstração da localização de tarefas">
      <div className={styles.page} data-scene={sceneIndex}>
        <header className={styles.heading}>
          <div>
            <span>RECURSOS</span>
            <h3>Localização de tarefas</h3>
          </div>
          <span className={styles.primaryAction}>+ Nova tarefa</span>
        </header>

        <nav className={styles.views} aria-label="Visualizações de tarefas">
          {views.map((view) => <span className={view === "Localização" ? styles.active : undefined} key={view}>{view}</span>)}
        </nav>

        <section className={styles.filters} aria-label="Filtros da localização">
          <label>Pesquisar <span>⌕ tarefa...</span></label>
          <label>Início <span>01/09</span></label>
          <label>Fim <span>30/09</span></label>
          <label>Projeto <span>Todos</span></label>
          <label>Responsável <span>Todos</span></label>
          <label>Status <span>Todos</span></label>
        </section>

        <section className={styles.locationWorkspace}>
          <div className={styles.map} aria-label="Mapa ilustrativo sem coordenadas reais">
            <div className={styles.gridLines} />
            <span className={`${styles.road} ${styles.roadOne}`} />
            <span className={`${styles.road} ${styles.roadTwo}`} />
            <span className={`${styles.road} ${styles.roadThree}`} />
            {markers.map((marker, index) => (
              <span
                aria-hidden="true"
                key={marker.id}
                className={`${styles.marker} ${styles[marker.status]} ${marker.id === "C" ? styles.focused : ""}`}
                style={{ left: `${marker.x}%`, top: `${marker.y}%`, "--marker": index } as React.CSSProperties}
              >
                {marker.id}
              </span>
            ))}
            <div className={styles.mapLegend}><span><i className={styles.legendToday}/>Hoje</span><span><i className={styles.legendOverdue}/>Em atraso</span><span><i className={styles.legendDone}/>Concluída</span></div>
          </div>

          <aside className={styles.detail}>
            <span className={styles.detailEyebrow}>ATIVIDADE SELECIONADA</span>
            <strong>Tarefa 184 · inspeção em campo</strong>
            <p>Projeto 146 · unidade operacional</p>
            <dl>
              <div><dt>Responsável</dt><dd>Equipe de campo</dd></div>
              <div><dt>Status</dt><dd className={styles.late}>Em atraso</dd></div>
              <div><dt>Janela</dt><dd>Hoje · 14:30</dd></div>
            </dl>
            <span className={styles.detailAction}>Abrir contexto da tarefa →</span>
          </aside>
        </section>
      </div>
    </DemoShell>
  );
}
