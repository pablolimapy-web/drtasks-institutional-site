"use client";

import { DemoShell } from "./DemoShell";
import { DemoTourCue, type DemoTourStep } from "./DemoTourCue";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./LocationModuleDemo.module.css";

const DURATIONS = [1500, 1400, 1600, 1900, 2100] as const;
const TOUR_STEPS: readonly DemoTourStep[] = [
  {
    label: "Abrindo a visão de localização",
    left: "82%",
    top: "11%",
    placement: "top-left",
    block: { variant: "metric", eyebrow: "Visão de campo", icon: "⌖", title: "Frentes ativas", value: "4", meta: "1 atividade crítica em atraso" },
  },
  {
    label: "Filtrando atividades em atraso",
    left: "84%",
    top: "39%",
    placement: "bottom-left",
    click: true,
    block: { variant: "split", eyebrow: "Filtro", icon: "◫", left: { label: "Status", value: "Em atraso" }, right: { label: "Resultados", value: "1 crítica" }, meta: "visão focada na frente prioritária" },
  },
  {
    label: "Carregando as tarefas no mapa",
    left: "48%",
    top: "59%",
    placement: "top-right",
    block: { variant: "progress", eyebrow: "Mapa operacional", icon: "◇", title: "Posicionando tarefas e equipes", progress: 74, meta: "rotas e pontos carregados" },
  },
  {
    label: "Selecionando a tarefa crítica",
    left: "55%",
    top: "67%",
    placement: "right-center",
    click: true,
    block: { variant: "context", eyebrow: "Atividade em foco", icon: "◆", title: "Tarefa 184 · inspeção em campo", description: "A atividade selecionada está atrasada e precisa de ação imediata.", metrics: [{ label: "Janela", value: "Hoje · 14:30" }, { label: "Status", value: "Em atraso" }] },
  },
  {
    label: "Abrindo responsável, janela e contexto",
    left: "83%",
    top: "65%",
    placement: "bottom-right",
    click: true,
    block: { variant: "checklist", eyebrow: "Contexto imediato", icon: "✓", title: "Leitura operacional", items: [{ label: "Responsável carregado", state: "done" }, { label: "Janela confirmada", state: "done" }, { label: "Abrir contexto", state: "active" }] },
  },
];

const views = ["Kanban", "Tabela", "Gantt", "Calendário", "Localização", "Relatórios"] as const;
const markers = [
  { id: "A", x: 22, y: 36, status: "today" },
  { id: "B", x: 48, y: 24, status: "upcoming" },
  { id: "C", x: 67, y: 55, status: "overdue" },
  { id: "D", x: 78, y: 32, status: "completed" },
] as const;

export function LocationModuleDemo({ paused, reducedMotion, loop }: { paused: boolean; reducedMotion: boolean; loop: boolean }) {
  const activeSceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 4, speed: 1, loop });
  const filtered = activeSceneIndex >= 1;

  return (
    <DemoShell activeNav="Localização" ariaLabel="Demonstração da localização de tarefas">
      <div
        className={styles.page}
        data-scene={activeSceneIndex}
        data-paused={paused ? "true" : "false"}
        data-reduced-motion={reducedMotion ? "true" : "false"}
      >
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
          <label className={filtered ? styles.filterSelected : undefined}>Status <span>{filtered ? "Em atraso" : "Todos"}</span></label>
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

        <DemoTourCue
          module="resources"
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
