"use client";

import { DemoShell } from "./DemoShell";
import { DemoTourCue, type DemoTourStep } from "./DemoTourCue";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./ProjectsModuleDemo.module.css";

const DURATIONS = [1500, 1400, 1600, 1900, 2100] as const;
const TOUR_STEPS: readonly DemoTourStep[] = [
  {
    label: "Abrindo a carteira de projetos",
    left: "82%",
    top: "11%",
    placement: "top-right",
    block: { variant: "metric", eyebrow: "Carteira ativa", icon: "◍", title: "Projetos ativos", value: "282", meta: "197 em andamento" },
  },
  {
    label: "Lendo os projetos que exigem atenção",
    left: "48%",
    top: "25%",
    placement: "bottom-left",
    click: true,
    block: { variant: "split", eyebrow: "Saúde da carteira", icon: "◫", left: { label: "Atrasados", value: "85" }, right: { label: "Hoje", value: "1" }, meta: "4 frentes exigem decisão" },
  },
  {
    label: "Entrando no Kanban da operação",
    left: "23%",
    top: "43%",
    placement: "top-right",
    click: true,
    block: { variant: "context", eyebrow: "Visualização", icon: "⌘", title: "Kanban operacional", description: "Prioridades, atrasos e próximos passos organizados por contexto.", metrics: [{ label: "Colunas", value: "4" }, { label: "Cards críticos", value: "12" }] },
  },
  {
    label: "Abrindo o projeto com maior atraso",
    left: "26%",
    top: "65%",
    placement: "right-center",
    click: true,
    block: { variant: "context", eyebrow: "Projeto crítico", icon: "◆", title: "Projeto 129 · Obra externa", description: "Existem três pendências bloqueando a próxima etapa da execução.", metrics: [{ label: "Saúde", value: "Atenção" }, { label: "Atraso", value: "+12 dias" }] },
  },
  {
    label: "Priorizando a próxima ação do projeto",
    left: "82%",
    top: "70%",
    placement: "bottom-right",
    click: true,
    block: { variant: "checklist", eyebrow: "Próxima ação", icon: "✓", title: "Plano imediato do projeto", items: [{ label: "Pendências revisadas", state: "done" }, { label: "Equipe avisada", state: "done" }, { label: "Executar hoje", state: "active" }] },
  },
];

const kpis = [
  ["Total de projetos", "282"],
  ["Em andamento", "197"],
  ["Atrasados", "85"],
  ["Concluídos", "0"],
  ["Valor de venda", "R$ 8,7 mi"],
  ["Resultado total", "R$ 380 mil"],
] as const;

const columns = [
  { title: "Em Atraso", count: 85, tone: "danger", cards: ["Projeto 129 · Obra externa", "Projeto 154 · Reforma"] },
  { title: "Para Hoje", count: 1, tone: "today", cards: ["Projeto 146 · Inspeção"] },
  { title: "Em breve", count: 119, tone: "upcoming", cards: ["Projeto 137 · Manutenção", "Projeto 140 · Adequação"] },
  { title: "Aguardando Aprovação", count: 62, tone: "approval", cards: ["Projeto 102 · Serviço técnico"] },
] as const;

export function ProjectsModuleDemo({ paused, reducedMotion, loop }: { paused: boolean; reducedMotion: boolean; loop: boolean }) {
  const activeSceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 4, speed: 1, loop });
  const selectedProjectOpen = activeSceneIndex >= 3;
  const prioritized = activeSceneIndex >= 4;

  return (
    <DemoShell activeNav="Projetos" ariaLabel="Demonstração da carteira de projetos em Kanban">
      <div
        className={styles.page}
        data-scene={activeSceneIndex}
        data-paused={paused ? "true" : "false"}
        data-reduced-motion={reducedMotion ? "true" : "false"}
      >
        <header className={styles.heading}>
          <div>
            <span className={styles.kicker}>CARTEIRA</span>
            <h3>Projetos</h3>
          </div>
          <span className={styles.primaryAction}>+ Novo projeto</span>
        </header>

        <section className={styles.kpis} aria-label="Resumo da carteira">
          {kpis.map(([label, value], index) => (
            <article
              className={label === "Atrasados" && activeSceneIndex >= 1 ? styles.attentionKpi : undefined}
              key={label}
              style={{ "--i": index } as React.CSSProperties}
            >
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <div className={styles.toolbar}>
          <nav aria-label="Visualização de projetos">
            <b>Kanban</b><span>Tabela</span><span>Calendário</span><span>Gantt</span><span>Relatórios</span>
          </nav>
          <div className={styles.search}>⌕ <span>Procure um projeto...</span></div>
        </div>

        <section className={`${styles.board} ${selectedProjectOpen ? styles.boardWithDrawer : ""}`} aria-label="Kanban de projetos">
          {columns.map((column, columnIndex) => (
            <article className={`${styles.column} ${styles[column.tone]}`} key={column.title} style={{ "--column": columnIndex } as React.CSSProperties}>
              <header><i /><strong>{column.title}</strong><span>{column.count}</span></header>
              <div className={styles.cards}>
                {column.cards.map((card, cardIndex) => {
                  const focused = columnIndex === 0 && cardIndex === 0;
                  return (
                    <div className={`${styles.projectCard} ${focused ? styles.focused : ""}`} key={card}>
                      <div className={styles.cardTop}><span>{focused ? "Prioridade alta" : "Projeto ativo"}</span><b>{focused ? "+12d" : "No prazo"}</b></div>
                      <strong>{card}</strong>
                      <p>Unidade operacional · execução técnica</p>
                      <footer><span>◷ {focused ? "Hoje" : "Próx. semana"}</span><span>◉ {focused ? "3" : "2"}</span></footer>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}

          <aside className={styles.projectDrawer} aria-hidden={!selectedProjectOpen}>
            <div className={styles.drawerHead}>
              <span>PROJETO 129</span>
              <i>{prioritized ? "Priorizado" : "+12 dias"}</i>
            </div>
            <strong>Obra externa · frente operacional</strong>
            <p>O prazo foi ultrapassado e existem três pendências bloqueando a próxima etapa.</p>
            <dl>
              <div><dt>Responsável</dt><dd>Equipe técnica</dd></div>
              <div><dt>Próxima ação</dt><dd>{prioritized ? "Executar hoje" : "Revisar pendências"}</dd></div>
              <div><dt>Saúde</dt><dd className={styles.risk}>{prioritized ? "Em acompanhamento" : "Atenção"}</dd></div>
            </dl>
            <span className={`${styles.drawerAction} ${prioritized ? styles.drawerActionDone : ""}`}>
              {prioritized ? "✓ Prioridade atualizada para hoje" : "Priorizar próxima ação →"}
            </span>
          </aside>
        </section>

        <DemoTourCue
          module="projects"
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
