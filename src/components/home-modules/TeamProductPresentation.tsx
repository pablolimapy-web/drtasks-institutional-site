"use client";

import { AnimatePresence, motion } from "motion/react";
import type { TeamPresentationPhaseId } from "@/lib/teamPresentationSequence";
import styles from "./TeamProductPresentation.module.css";

export type TeamPresentationScene = {
  time: string;
  title: string;
  detail: string;
  interface: "time" | "users";
  icon: "play" | "filter" | "clock" | "users";
  cursor: { left: string; top: string };
};

export const TEAM_PRESENTATION_SCENES: readonly TeamPresentationScene[] = [
  {
    time: "08:30",
    title: "Atividade iniciada",
    detail: "O timer começa dentro do contexto do trabalho.",
    interface: "time",
    icon: "play",
    cursor: { left: "86%", top: "17%" },
  },
  {
    time: "09:24",
    title: "Contexto filtrado",
    detail: "Usuário, projeto e tarefa ficam visíveis na mesma leitura.",
    interface: "time",
    icon: "filter",
    cursor: { left: "36%", top: "43%" },
  },
  {
    time: "10:48",
    title: "Tempo registrado",
    detail: "O lançamento aparece ligado ao projeto e à tarefa.",
    interface: "time",
    icon: "clock",
    cursor: { left: "55%", top: "72%" },
  },
  {
    time: "12:10",
    title: "Equipe atualizada",
    detail: "Usuários, funções e acessos entram na mesma apresentação.",
    interface: "users",
    icon: "users",
    cursor: { left: "42%", top: "35%" },
  },
] as const;

function PresentationIcon({ name }: { name: TeamPresentationScene["icon"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "play") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m9 7 8 5-8 5z" /></svg>;
  }
  if (name === "filter") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 6h14M8 12h8M10 18h4" /></svg>;
  }
  if (name === "clock") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="8" /><path {...common} d="M12 7.5v5l3 1.7" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="9" cy="9" r="3" /><circle {...common} cx="16.5" cy="10" r="2.3" /><path {...common} d="M4.5 18c.6-3 2.1-4.5 4.5-4.5S13 15 13.5 18M14.2 14.5c2.7 0 4.2 1.2 4.8 3.5" /></svg>;
}

function ShellSidebar({ active }: { active: "time" | "users" }) {
  const groups = [
    ["Início", "Dashboard"],
    ["Trabalho", "Instituições", "Workspace", "Projetos", "Tarefas"],
    ["Gestão", "FluxOS"],
    ["Recursos", "Arquivos", "Localização"],
    ["Financeiro", "Financeiro"],
    ["Comunicação", "Chat", "Usuários", "Gestão de Tempo"],
  ];

  return (
    <aside className={styles.appSidebar}>
      <div className={styles.appBrand}><span>DR</span><b>TASKS</b></div>
      {groups.map(([group, ...items]) => (
        <div className={styles.sidebarGroup} key={group}>
          <small>{group}</small>
          {items.map((item) => {
            const isActive = (active === "time" && item === "Gestão de Tempo") || (active === "users" && item === "Usuários");
            return <span className={isActive ? styles.sidebarActive : ""} key={item}><i />{item}</span>;
          })}
        </div>
      ))}
    </aside>
  );
}

function ShellHeader() {
  return (
    <header className={styles.appHeader}>
      <span className={styles.shellSearch}><i />Pesquise aqui</span>
      <div className={styles.headerActions}><i /><i /><i /><i /><b>PL</b></div>
    </header>
  );
}

const timeRows = [
  ["#27", "David Lima", "01 - RECURSOS HUMANOS", "FICHA DE EPI/EPC", "24:38:33", "Faturável"],
  ["#25", "David Lima", "01 - RECURSOS HUMANOS", "ORGANIZAR HOLERITES", "00:09:00", "Faturável"],
  ["#21", "Suporte Dr.Tasks", "01 - COMPRAS", "ATUALIZA PLANILHA", "00:00:10", "Faturável"],
  ["#20", "Kaiky Silva", "Sem projeto", "CONTRATAÇÃO DE PREPOSTO", "00:13:19", "Faturável"],
  ["#14", "Kaiky Silva", "139 - INSS", "DOCUMENTAÇÃO PARA NF", "02:42:11", "Faturável"],
];

function TimeManagementInterface({ activeScene }: { activeScene: number }) {
  const timerRunning = activeScene === 0;
  const filtered = activeScene === 1;
  const highlight = activeScene === 2;

  return (
    <div className={styles.interfaceRoot} data-interface="time">
      <ShellSidebar active="time" />
      <div className={styles.appContent}>
        <ShellHeader />
        <main className={styles.timeMain}>
          <div className={styles.timeHero}>
            <div><small>GESTÃO DE TEMPO</small><h3>Tempo e produtividade</h3><p>Timers, lançamentos, aprovações e análise operacional em um só lugar.</p></div>
            <motion.button
              type="button"
              className={`${styles.timerButton} ${timerRunning ? styles.timerButtonActive : ""}`}
              animate={timerRunning ? { scale: [1, 1.035, 1] } : { scale: 1 }}
              transition={{ duration: 1.4, repeat: timerRunning ? Infinity : 0 }}
            >
              <span><PresentationIcon name="play" /></span>{timerRunning ? "Timer ativo · 00:42:18" : "Iniciar timer"}
            </motion.button>
          </div>

          <nav className={styles.timeTabs}><b>Gestão</b><span>Meu painel</span><span>Registros</span><span>Aprovações</span></nav>

          <div className={styles.kpiGrid}>
            {[
              ["Tempo total", "428:25:46"],
              ["Hoje", timerRunning ? "00:42:18" : "00:00:00"],
              ["Esta semana", "40:06:22"],
              ["Faturável", "428:24:58"],
              ["Não faturável", "00:00:48"],
              ["Meta semanal", "40:00:00"],
            ].map(([label, value], index) => (
              <motion.article
                key={label}
                className={timerRunning && index === 1 ? styles.kpiActive : ""}
                animate={timerRunning && index === 1 ? { y: [0, -2, 0] } : { y: 0 }}
                transition={{ duration: 1.8, repeat: timerRunning && index === 1 ? Infinity : 0 }}
              >
                <small>{label}</small><strong>{value}</strong>
              </motion.article>
            ))}
          </div>

          <div className={`${styles.filters} ${filtered ? styles.filtersActive : ""}`}>
            <span>{filtered ? "David Lima" : "Todos os usuários"}<i /></span>
            <span>{filtered ? "01 - RECURSOS HUMANOS" : "Todos os projetos"}<i /></span>
            <span>Todas as tarefas<i /></span>
            <span>Todos os tipos<i /></span>
            <span>Data inicial<i /></span>
            <span>Data final<i /></span>
          </div>

          <div className={styles.dataTable}>
            <div className={styles.timeTableHead}><span>#</span><span>Colaborador</span><span>Projeto</span><span>Tarefa</span><span>Tempo</span><span>Tipo</span></div>
            {timeRows.map((row, index) => (
              <motion.div
                className={`${styles.timeTableRow} ${highlight && index === 0 ? styles.tableRowActive : ""}`}
                key={row[0]}
                animate={highlight && index === 0 ? { x: [0, 3, 0] } : { x: 0 }}
                transition={{ duration: 1.2, repeat: highlight && index === 0 ? Infinity : 0 }}
              >
                {row.map((cell, cellIndex) => <span key={`${row[0]}-${cellIndex}`}>{cell}</span>)}
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

const userRows = [
  ["91", "Pablo Miguel", "pablo@drtasks.com.br", "Administração", "Ativo", "16/09/2026"],
  ["68", "Rudson de Carvalho", "rudson@drtasks.com.br", "Gestor", "Inativo", "14/05/2026"],
  ["67", "David Lima", "david@drtasks.com.br", "Administração", "Ativo", "12/05/2026"],
  ["61", "Gabriel", "gabriel@drtasks.com.br", "Gestor", "Inativo", "22/04/2026"],
  ["54", "Victor", "victor@drtasks.com.br", "Administração", "Ativo", "10/03/2026"],
];

function UsersInterface({ activeScene }: { activeScene: number }) {
  const searchTerm = activeScene === 3 ? "David" : "";
  const rows = searchTerm ? userRows.filter((row) => row[1].includes(searchTerm)) : userRows;

  return (
    <div className={styles.interfaceRoot} data-interface="users">
      <ShellSidebar active="users" />
      <div className={styles.appContent}>
        <ShellHeader />
        <main className={styles.peopleMain}>
          <div className={styles.peopleHero}>
            <div><h3>Usuários</h3><p>Equipe, funções e acessos ao sistema.</p></div>
            <button type="button" className={styles.newUserButton}><span>+</span>Novo cadastro</button>
          </div>
          <nav className={styles.peopleTabs}><b>Usuários</b><span>Instituições</span></nav>
          <div className={styles.peopleToolbar}>
            <motion.span className={styles.peopleSearch} animate={searchTerm ? { boxShadow: "0 0 0 3px rgba(37,105,226,.12)" } : { boxShadow: "0 0 0 0 rgba(37,105,226,0)" }}>
              <i />{searchTerm || "Pesquisar nome ou e-mail..."}
              {searchTerm ? <motion.b initial={{ opacity: 0 }} animate={{ opacity: 1 }}>▌</motion.b> : null}
            </motion.span>
            <span>Todos os status<i /></span>
            <span>Todas as funções<i /></span>
          </div>
          <div className={styles.peopleTable}>
            <div className={styles.peopleTableHead}><span /><span>#</span><span>Nome</span><span>E-mail</span><span>Tipo</span><span>Status</span><span>Cadastro</span><span>Ações</span></div>
            <AnimatePresence mode="popLayout" initial={false}>
              {rows.map((row) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={searchTerm && row[1] === "David Lima" ? styles.peopleRowActive : ""}
                  key={row[0]}
                >
                  <span className={styles.checkbox} />
                  <span>{row[0]}</span>
                  <span className={styles.personCell}><i>{row[1].slice(0, 1)}</i>{row[1]}</span>
                  <span>{row[2]}</span>
                  <span>{row[3]}</span>
                  <span><b className={row[4] === "Ativo" ? styles.statusActive : styles.statusInactive}>{row[4]}</b></span>
                  <span>{row[5]}</span>
                  <span className={styles.rowActions}><i /><i /><i /></span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export function TeamProductPresentation({
  activeScene,
  phaseId,
  reducedMotion,
}: {
  activeScene: number;
  phaseId: TeamPresentationPhaseId;
  reducedMotion: boolean;
}) {
  const scene = TEAM_PRESENTATION_SCENES[activeScene] ?? TEAM_PRESENTATION_SCENES[0];
  const showTimeVignette = phaseId === "time-vignette";
  const showUsersVignette = phaseId === "users-vignette";
  const showTransition = phaseId === "interface-transition";
  const showClosing = phaseId === "closing";
  const showCursor = !reducedMotion && ["activity-started", "context-filtered", "time-registered", "team-updated"].includes(phaseId);
  const showSceneCaption = ["activity-started", "context-filtered", "time-registered", "team-updated"].includes(phaseId);

  return (
    <div className={styles.presentation}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={scene.interface}
          className={styles.interfaceStage}
          initial={reducedMotion ? false : { opacity: 0, y: 22, scale: .965, filter: "blur(12px)", rotateX: 4 }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", rotateX: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: .985, filter: "blur(6px)" }}
          transition={{ duration: reducedMotion ? 0 : .72, ease: [0.16, 1, 0.3, 1] }}
        >
          {scene.interface === "time" ? <TimeManagementInterface activeScene={activeScene} /> : <UsersInterface activeScene={activeScene} />}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {showTimeVignette ? (
          <motion.div
            key="time-vignette"
            className={`${styles.interfaceVignette} ${styles.timeVignette}`}
            initial={reducedMotion ? false : { opacity: 0, scale: .985, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035, filter: "blur(10px)" }}
            transition={{ duration: reducedMotion ? 0 : .58, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>GESTÃO DE TEMPO • DEMO GUIADA</span>
            <div className={styles.vignetteClock}><i /><b>00:42:18</b><em /></div>
            <strong>Tempo e produtividade.</strong>
            <small>O trabalho ganha contexto antes de virar dado.</small>
          </motion.div>
        ) : null}

        {showUsersVignette ? (
          <motion.div
            key="users-vignette"
            className={`${styles.interfaceVignette} ${styles.usersVignette}`}
            initial={reducedMotion ? false : { opacity: 0, scale: .985, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035, filter: "blur(10px)" }}
            transition={{ duration: reducedMotion ? 0 : .58, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>EQUIPE • DEMO GUIADA</span>
            <div className={styles.vignettePeople}><i>P</i><i>D</i><i>V</i><i>+</i></div>
            <strong>Equipe conectada.</strong>
            <small>Funções, acessos e pessoas no mesmo lugar.</small>
          </motion.div>
        ) : null}

        {showTransition ? (
          <motion.div
            key="interface-transition"
            className={styles.interfaceTransition}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : .32 }}
          >
            <span className={styles.transitionBeam} />
            <div><small>DO TEMPO PARA A EQUIPE</small><strong>O contexto continua.</strong></div>
          </motion.div>
        ) : null}

        {showClosing ? (
          <motion.div
            key="closing"
            className={styles.closingCard}
            initial={reducedMotion ? false : { opacity: 0, y: 16, scale: .97, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : .58, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>04 / EQUIPE E TEMPO</span>
            <strong>Equipe e tempo conectados.</strong>
            <small>Da atividade individual à leitura do time, sem quebrar o fluxo.</small>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {showCursor ? (
        <motion.div
          className={styles.presentationCursor}
          animate={{ left: scene.cursor.left, top: scene.cursor.top }}
          transition={{ duration: .76, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 22 27" aria-hidden="true"><path d="M3 2.5 19 15l-7.3 1.4-4.1 7L3 2.5Z" /></svg>
          <span key={`pulse-${activeScene}-${phaseId}`} />
        </motion.div>
      ) : null}

      {showSceneCaption ? (
        <motion.div
          key={`caption-${phaseId}`}
          className={styles.sceneCaption}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : .38 }}
        >
          <span><PresentationIcon name={scene.icon} /></span>
          <div><strong>{scene.title}</strong><small>{scene.detail}</small></div>
          <i><b style={{ width: `${((activeScene + 1) / TEAM_PRESENTATION_SCENES.length) * 100}%` }} /></i>
        </motion.div>
      ) : null}
    </div>
  );
}
