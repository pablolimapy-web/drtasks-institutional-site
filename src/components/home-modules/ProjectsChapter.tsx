"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./ProjectsChapter.module.css";

type LevelId = "institution" | "workspace" | "project" | "task";

type HierarchyItem = {
  id: LevelId;
  label: string;
  description: string;
  bullets: readonly [string, string, string];
};

const hierarchy: readonly HierarchyItem[] = [
  {
    id: "institution",
    label: "Instituição",
    description: "Tudo começa no contexto maior da sua operação.",
    bullets: ["Estrutura multiunidade", "Times e membros centralizados", "Controle e permissões por unidade"],
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Organize times, projetos, documentos e recursos em um ambiente dedicado.",
    bullets: ["Times organizados por contexto", "Documentos, arquivos e conhecimento", "Configurações e integrações próprias"],
  },
  {
    id: "project",
    label: "Projeto",
    description: "O projeto reúne o contexto necessário para acompanhar o trabalho como uma entrega.",
    bullets: ["Visão por etapas e status", "Responsáveis, prazos e dependências", "Progresso e histórico completo"],
  },
  {
    id: "task",
    label: "Tarefa",
    description: "Onde a ação realmente acontece, com contexto, prioridade e responsáveis claros.",
    bullets: ["Prioridades e status personalizados", "Checklist, comentários e arquivos", "Notificações e acompanhamento"],
  },
] as const;

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 21V5.8L12 3l7 2.8V21M3 21h18M8 8h2m4 0h2M8 12h2m4 0h2M8 16h2m4 0h2M11 21v-4h2v4" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.3 11.1a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2ZM15.9 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2.8 19.2c.3-3.4 2.3-5.2 5.5-5.2s5.1 1.8 5.4 5.2M13.6 13.4c3.8-.7 6.8 1.2 7.2 4.9" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 7.5h6l1.8 2h9.2v8.8a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2V7.5Zm0 0V6.7a2.2 2.2 0 0 1 2.2-2.2h3.1l1.8 2h7.7a2.2 2.2 0 0 1 2.2 2.2v.8" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3.5h8l4 4v13H6v-17Zm8 0v4h4M9 12h6M9 15.5h6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6.8 12.1 3.4 3.4 7-7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5.5h14v14H5v-14Zm0 4h14M8 3.5v4m8-4v4m-7 5h2m2 0h2m-6 3h2" />
    </svg>
  );
}

function InstitutionScene() {
  return (
    <div className={`${styles.sceneFrame} ${styles.institutionScene}`} aria-hidden="true">
      <div className={styles.institutionCard}>
        <div className={styles.miniBrand}><span><BuildingIcon /></span><div><strong>Dr. Tasks</strong><small>4 workspaces · 28 membros</small></div></div>
        <div className={`${styles.institutionRow} ${styles.selectedRow}`}><span><BuildingIcon /></span><div><strong>Unidade Matriz</strong><small>3 workspaces</small></div><b>›</b></div>
        <div className={styles.institutionRow}><span><BuildingIcon /></span><div><strong>Filial Londrina</strong><small>2 workspaces</small></div></div>
        <div className={styles.institutionRow}><span><BuildingIcon /></span><div><strong>Filial Curitiba</strong><small>1 workspace</small></div></div>
      </div>
      <span className={`${styles.branchLine} ${styles.branchOne}`} />
      <span className={`${styles.branchLine} ${styles.branchTwo}`} />
      <span className={`${styles.branchLine} ${styles.branchThree}`} />
      <span className={`${styles.branchNode} ${styles.nodeOne}`}><BuildingIcon /></span>
      <span className={`${styles.branchNode} ${styles.nodeTwo}`}><BuildingIcon /></span>
      <span className={`${styles.branchNode} ${styles.nodeThree}`}><BuildingIcon /></span>
    </div>
  );
}

function WorkspaceScene() {
  return (
    <div className={`${styles.sceneFrame} ${styles.workspaceScene}`} aria-hidden="true">
      <div className={styles.workspaceList}>
        <div className={styles.workspaceTitle}><span>◆</span><strong>Workspaces</strong></div>
        <div className={styles.workspaceRow}><span>◇</span><div><strong>Desenvolvimento</strong><small>12 membros</small></div></div>
        <div className={styles.workspaceRow}><span>◇</span><div><strong>Marketing</strong><small>8 membros</small></div></div>
        <div className={`${styles.workspaceRow} ${styles.workspaceSelected}`}><span>◆</span><div><strong>Operações</strong><small>16 membros</small></div><b>›</b></div>
        <div className={styles.workspaceRow}><span>◇</span><div><strong>Comercial</strong><small>9 membros</small></div></div>
      </div>
      <span className={`${styles.contextNode} ${styles.contextNodeTeam}`}><TeamIcon /></span>
      <span className={`${styles.contextNode} ${styles.contextNodeFolder}`}><FolderIcon /></span>
      <span className={`${styles.contextNode} ${styles.contextNodeDoc}`}><DocumentIcon /></span>
      <span className={`${styles.contextNode} ${styles.contextNodeGear}`}>✦</span>
      <span className={`${styles.contextWire} ${styles.contextWireOne}`} />
      <span className={`${styles.contextWire} ${styles.contextWireTwo}`} />
      <span className={`${styles.contextWire} ${styles.contextWireThree}`} />
    </div>
  );
}

const kanbanColumns = [
  { name: "Planejamento", count: "3", cards: ["Definir escopo", "Mapear requisitos", "Alinhar equipe"] },
  { name: "Em andamento", count: "5", cards: ["Desenvolvimento", "Revisão de UI", "Integrações"] },
  { name: "Concluído", count: "8", cards: ["Deploy produção", "Documentação", "Treinamento"] },
] as const;

function ProjectScene() {
  return (
    <div className={`${styles.sceneFrame} ${styles.projectScene}`} aria-hidden="true">
      <div className={styles.projectWindow}>
        <div className={styles.projectWindowHead}><span>▦</span><strong>Projeto</strong><i>›</i></div>
        <div className={styles.miniKanban}>
          {kanbanColumns.map((column, columnIndex) => (
            <div className={styles.kanbanColumn} key={column.name}>
              <header><strong>{column.name}</strong><span>{column.count}</span></header>
              {column.cards.map((card, cardIndex) => (
                <div className={styles.kanbanCard} key={card} style={{ "--card-index": cardIndex + columnIndex } as CSSProperties}>
                  <span>{card}</span>
                  {cardIndex > 0 ? <small><i /> <i /></small> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskScene() {
  return (
    <div className={`${styles.sceneFrame} ${styles.taskScene}`} aria-hidden="true">
      <div className={styles.taskCard}>
        <div className={styles.taskCardHead}><span><CheckIcon /></span><strong>Tarefa</strong></div>
        <h4>Implementar autenticação</h4>
        <div className={styles.taskTags}><span>◉ Alta</span><span>◆ Desenvolvimento</span></div>
        <dl>
          <div><dt>Responsável</dt><dd><span className={styles.avatar}>PL</span><span className={styles.avatar}>AM</span><span className={styles.avatar}>+2</span></dd></div>
          <div><dt>Prazo</dt><dd>12 de set. de 2026</dd></div>
          <div><dt>Projeto</dt><dd>Plataforma v2</dd></div>
        </dl>
        <div className={styles.taskDescription}><strong>Descrição</strong><i /><i /></div>
      </div>
      <span className={`${styles.taskNode} ${styles.taskNodeCheck}`}><CheckIcon /></span>
      <span className={`${styles.taskNode} ${styles.taskNodeCalendar}`}><CalendarIcon /></span>
      <span className={`${styles.taskNode} ${styles.taskNodeDone}`}><CheckIcon /></span>
      <span className={`${styles.taskWire} ${styles.taskWireOne}`} />
      <span className={`${styles.taskWire} ${styles.taskWireTwo}`} />
    </div>
  );
}

const scenes: Record<LevelId, () => ReactNode> = {
  institution: InstitutionScene,
  workspace: WorkspaceScene,
  project: ProjectScene,
  task: TaskScene,
};

export function ProjectsChapter() {
  const module = getModuleShowcaseModule("projects");
  const reducedMotion = Boolean(useReducedMotion());
  const [activeStep, setActiveStep] = useState(0);
  const interactionPauseUntil = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (Date.now() < interactionPauseUntil.current) return;
      setActiveStep((current) => (current + 1) % hierarchy.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const focusStep = (index: number) => {
    setActiveStep(index);
    interactionPauseUntil.current = Date.now() + 9000;
  };

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="projects-title">
      <span className={styles.backgroundOrb} aria-hidden="true" />
      <div className={styles.inner}>
        <motion.header
          className={styles.intro}
          initial={reducedMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: reducedMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.sectionKicker}>02 / PROJETOS E TAREFAS</span>
          <h2 id="projects-title">Do contexto à execução,<br /><em>tudo no mesmo fluxo.</em></h2>
          <p>O módulo de Projetos e Tarefas organiza o trabalho em camadas, da instituição à tarefa, mantendo contexto, responsáveis e andamento sempre conectados.</p>
        </motion.header>

        <div className={styles.visual}>
        <motion.div
          className={styles.hierarchyPanel}
          initial={reducedMotion ? false : { opacity: 0, y: 44, scale: 0.985, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.networkLayer} aria-hidden="true" />
          <div className={styles.hierarchyGrid}>
            {hierarchy.map((item, index) => {
              const Scene = scenes[item.id];
              return (
                <motion.article
                  key={item.id}
                  className={styles.hierarchyColumn}
                  data-active={activeStep === index ? "true" : "false"}
                  tabIndex={0}
                  aria-label={`${item.label}: ${item.description}`}
                  onMouseEnter={() => focusStep(index)}
                  onFocus={() => focusStep(index)}
                  onClick={() => focusStep(index)}
                  initial={reducedMotion ? false : { opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: reducedMotion ? 0 : 0.62, delay: reducedMotion ? 0 : 0.22 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.columnTop}>
                    <div className={styles.stepIndex}><strong>{String(index + 1).padStart(2, "0")}</strong><i /></div>
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                  </div>

                  <Scene />

                  <ul className={styles.featureList}>
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bullet} style={{ "--bullet-index": bulletIndex } as CSSProperties}>
                        <span>{item.id === "institution" ? <BuildingIcon /> : item.id === "workspace" ? <TeamIcon /> : item.id === "project" ? <TeamIcon /> : <CheckIcon />}</span>
                        <b>{bullet}</b>
                      </li>
                    ))}
                  </ul>

                  {index < hierarchy.length - 1 ? (
                    <span className={styles.flowConnector} aria-hidden="true">
                      <i className={styles.flowLine} />
                      <i className={styles.flowParticle} />
                      <b>›</b>
                    </span>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </motion.div>
        </div>

        <div className={styles.cta}>
          <ModuleChapterLink href={module.href}>Saiba mais sobre Projetos e Tarefas</ModuleChapterLink>
        </div>
      </div>
    </section>
  );
}
