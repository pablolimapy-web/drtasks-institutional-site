"use client";

import { motion } from "motion/react";
import type { ModuleShowcaseId } from "@/lib/moduleShowcase";
import styles from "./ModuleIntroScene.module.css";

function VignetteBadge({ children }: { children: string }) {
  return <span className={styles.badge}>{children}</span>;
}

function FluxosIntro() {
  return (
    <div className={`${styles.scene} ${styles.fluxosScene}`}>
      <VignetteBadge>FLUXOS · DEMO GUIADA</VignetteBadge>
      <div className={styles.fluxWordmark}>DR TASKS</div>
      <span className={styles.fluxUnderline} />
      <p className={styles.sceneTagline}>Operação clara. Próxima ação visível.</p>
      <div className={styles.fluxTrack} aria-hidden="true">
        {["Recebida", "Análise", "Execução", "Medição", "NF"].map((label, index) => (
          <span className={styles.fluxStage} key={label} style={{ "--i": index } as React.CSSProperties}>
            <i />
            <small>{label}</small>
            {index < 4 && <b className={styles.fluxLine} />}
          </span>
        ))}
      </div>
      <div className={styles.chipRow}>
        <span>● Fluxos conectados</span>
        <span>● Contexto operacional em segundos</span>
      </div>
    </div>
  );
}

function ProjectsIntro() {
  const cards = ["Planejar", "Executar", "Revisar", "Entregar"];
  return (
    <div className={`${styles.scene} ${styles.projectsScene}`}>
      <VignetteBadge>PROJETOS · CARTEIRA VIVA</VignetteBadge>
      <div className={styles.projectOrbit} aria-hidden="true">
        <span className={styles.projectHub}><i />Projetos</span>
        {cards.map((label, index) => (
          <span className={styles.orbitCard} key={label} style={{ "--i": index } as React.CSSProperties}>
            <i />
            <b>{label}</b>
            <small>{index + 2} itens</small>
          </span>
        ))}
        <span className={styles.projectAxis} />
      </div>
      <div className={styles.projectCopy}>
        <strong>Do ruído para uma carteira legível.</strong>
        <p>Prioridade, progresso e bloqueios convergem antes da primeira ação.</p>
      </div>
    </div>
  );
}

function FinanceIntro() {
  return (
    <div className={`${styles.scene} ${styles.financeScene}`}>
      <VignetteBadge>FINANCEIRO · LEITURA CONECTADA</VignetteBadge>
      <div className={styles.financeNumbers} aria-hidden="true">
        <span style={{ "--i": 0 } as React.CSSProperties}><small>Receita</small><b>R$ 378 mil</b></span>
        <span style={{ "--i": 1 } as React.CSSProperties}><small>Margem</small><b>28,4%</b></span>
        <span style={{ "--i": 2 } as React.CSSProperties}><small>A receber</small><b>R$ 92 mil</b></span>
      </div>
      <div className={styles.financeGraph} aria-hidden="true">
        {[44, 58, 51, 72, 66, 86].map((height, index) => (
          <i key={index} style={{ "--h": `${height}%`, "--i": index } as React.CSSProperties} />
        ))}
        <span className={styles.financeLine} />
      </div>
      <div className={styles.financeResult}>
        <span>LEITURA CONSOLIDADA</span>
        <strong>Execução e resultado no mesmo contexto.</strong>
      </div>
    </div>
  );
}

function TeamIntro() {
  const people = ["PL", "AG", "RL", "KS"];
  return (
    <div className={`${styles.scene} ${styles.teamScene}`}>
      <VignetteBadge>EQUIPE · TEMPO EM CONTEXTO</VignetteBadge>
      <div className={styles.teamConstellation} aria-hidden="true">
        <span className={styles.teamCore}>
          <i>◷</i>
          <b>31h 26m</b>
          <small>esta semana</small>
        </span>
        {people.map((initials, index) => (
          <span className={styles.teamPerson} key={initials} style={{ "--i": index } as React.CSSProperties}>
            <i>{initials}</i>
            <small>{["06:42", "07:18", "08:03", "05:51"][index]}</small>
          </span>
        ))}
        <span className={styles.teamRing} />
        <span className={styles.teamRingSecondary} />
      </div>
      <div className={styles.teamCopy}>
        <strong>Tempo deixa de ser apontamento.</strong>
        <p>Ele ganha projeto, contexto e impacto operacional.</p>
      </div>
    </div>
  );
}

function ResourcesIntro() {
  return (
    <div className={`${styles.scene} ${styles.resourcesScene}`}>
      <VignetteBadge>RECURSOS · OPERAÇÃO EM CAMPO</VignetteBadge>
      <div className={styles.resourceRadar} aria-hidden="true">
        <span className={styles.radarSweep} />
        <span className={styles.radarRingOne} />
        <span className={styles.radarRingTwo} />
        <svg className={styles.resourceRoute} viewBox="0 0 420 260" preserveAspectRatio="none">
          <path d="M34 194 C 92 164, 112 88, 182 112 S 278 210, 382 76" />
        </svg>
        {[
          ["18%", "70%"], ["40%", "39%"], ["61%", "62%"], ["83%", "27%"],
        ].map(([left, top], index) => (
          <span className={styles.mapPin} key={index} style={{ left, top, "--i": index } as React.CSSProperties}><i /></span>
        ))}
        <span className={styles.fieldCard}>
          <small>ATIVIDADE LOCALIZADA</small>
          <b>Equipe em campo · OS 217</b>
          <em>Agora</em>
        </span>
      </div>
      <p className={styles.resourceCopy}>Onde o trabalho acontece também faz parte da operação.</p>
    </div>
  );
}

export function ModuleIntroScene({
  id,
  paused,
  reducedMotion,
}: {
  id: ModuleShowcaseId;
  paused: boolean;
  reducedMotion: boolean;
}) {
  const scene = id === "fluxos"
    ? <FluxosIntro />
    : id === "projects"
      ? <ProjectsIntro />
      : id === "finance"
        ? <FinanceIntro />
        : id === "team"
          ? <TeamIntro />
          : <ResourcesIntro />;

  return (
    <motion.div
      className={styles.root}
      data-module={id}
      data-paused={paused ? "true" : "false"}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      initial={reducedMotion ? false : { opacity: 0, scale: 1.035, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.965, filter: "blur(10px)", clipPath: "inset(5% 7% 7% 7% round 26px)" }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <span className={styles.lightSweep} />
      <span className={styles.vignetteGrid} />
      {scene}
    </motion.div>
  );
}
