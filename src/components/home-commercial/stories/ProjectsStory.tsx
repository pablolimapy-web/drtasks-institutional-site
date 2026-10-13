"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./ProjectsStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "projects")!;
const phaseDurations = [1750, 1750, 1850, 1850, 2200] as const;

const contextStages = [
  { id: "client", index: "01", label: "Cliente", value: "Condomínio Aurora", caption: "A origem comercial não some quando o trabalho vira execução." },
  { id: "project", index: "02", label: "Obra", value: "Reforma da portaria", caption: "O contexto da obra acompanha tudo o que nasce dentro dela." },
  { id: "task", index: "03", label: "Tarefa", value: "Instalar nova porta", caption: "A ação concreta herda a história em vez de começar do zero." },
  { id: "owner", index: "04", label: "Responsável", value: "Paulo Neves", caption: "A próxima ação chega à pessoa certa sem perder a origem." },
  { id: "due", index: "05", label: "Prazo", value: "Hoje · 17:00", caption: "O prazo continua ligado à tarefa, à obra e ao responsável." },
] as const;

type ContextStageId = (typeof contextStages)[number]["id"];

function ContextIcon({ kind }: { kind: ContextStageId }) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "client") {
    return <svg {...common}><path d="M15 52V22l17-10 17 10v30"/><path d="M23 27h5M36 27h5M23 36h5M36 36h5M28 52V43h8v9"/></svg>;
  }
  if (kind === "project") {
    return <svg {...common}><path d="M12 48h40"/><path d="M18 48V24l14-10 14 10v24"/><path d="M25 30h14M25 37h14"/><path d="M32 14v34"/></svg>;
  }
  if (kind === "task") {
    return <svg {...common}><rect x="14" y="13" width="36" height="38" rx="4"/><path d="m21 29 5 5 9-10"/><path d="M38 28h6M21 42h23"/></svg>;
  }
  if (kind === "owner") {
    return <svg {...common}><circle cx="32" cy="23" r="9"/><path d="M16 51c1.7-10 7.2-15 16-15s14.3 5 16 15"/><path d="M12 51h40"/></svg>;
  }
  return <svg {...common}><circle cx="32" cy="32" r="19"/><path d="M32 21v12l8 5"/><path d="M32 10v4M54 32h-4M32 54v-4M10 32h4"/></svg>;
}

export function ProjectsStory() {
  const { ref, phase } = useNarrativeLoop({ phaseDurations });

  return (
    <ModuleStoryShell module={storyModule}>
      <div ref={ref} className={styles.stage} data-phase={phase}>
        <div className={styles.sequence} aria-label="Cliente, obra, tarefa, responsável e prazo permanecem conectados">
          {contextStages.map((item, index) => (
            <div
              className={styles.sequenceNode}
              data-active={phase === index || undefined}
              data-complete={phase > index || undefined}
              key={item.id}
            >
              <span className={styles.nodeIcon}><ContextIcon kind={item.id} /></span>
              <span className={styles.nodeText}><small>{item.index}</small><strong>{item.label}</strong></span>
            </div>
          ))}
        </div>

        <div className={styles.morphField}>
          <div className={styles.contextSpine} aria-hidden="true"><i /><i /><i /></div>
          <div className={styles.morphCore} aria-hidden="true">
            <span className={styles.orbit} />
            <span className={styles.orbitSmall} />
            {contextStages.map((item, index) => (
              <span className={styles.morphIcon} data-active={phase === index || undefined} key={item.id}>
                <ContextIcon kind={item.id} />
              </span>
            ))}
            <b className={styles.phaseCount}>{String(phase + 1).padStart(2, "0")} / 05</b>
          </div>

          <div className={styles.phaseCopy}>
            {contextStages.map((item, index) => (
              <div className={styles.phasePanel} data-active={phase === index || undefined} key={item.id}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.continuityRail} aria-hidden="true">
          <span>CLIENTE</span><i />
          <span>OBRA</span><i />
          <span>TAREFA</span><i />
          <span>RESPONSÁVEL</span><i />
          <span>PRAZO</span>
          <strong>um único fio de contexto</strong>
        </div>
      </div>
    </ModuleStoryShell>
  );
}
