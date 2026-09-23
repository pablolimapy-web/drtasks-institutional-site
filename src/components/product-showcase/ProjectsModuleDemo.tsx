"use client";

import { DemoShell } from "./DemoShell";
import { useShowcaseSequence } from "./useShowcaseSequence";
import styles from "./ProjectsModuleDemo.module.css";

const DURATIONS = [650, 900, 1150, 1400] as const;

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

export function ProjectsModuleDemo({ paused, reducedMotion }: { paused: boolean; reducedMotion: boolean }) {
  const sceneIndex = useShowcaseSequence({ durations: DURATIONS, paused, reducedMotion, staticScene: 3 });

  return (
    <DemoShell activeNav="Projetos" ariaLabel="Demonstração da carteira de projetos em Kanban">
      <div className={styles.page} data-scene={sceneIndex}>
        <header className={styles.heading}>
          <div>
            <span className={styles.kicker}>CARTEIRA</span>
            <h3>Projetos</h3>
          </div>
          <span className={styles.primaryAction}>+ Novo projeto</span>
        </header>

        <section className={styles.kpis} aria-label="Resumo da carteira">
          {kpis.map(([label, value], index) => (
            <article key={label} style={{ "--i": index } as React.CSSProperties}>
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

        <section className={styles.board} aria-label="Kanban de projetos">
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
        </section>
      </div>
    </DemoShell>
  );
}
