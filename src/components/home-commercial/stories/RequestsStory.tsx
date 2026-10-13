"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./RequestsStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "requests")!;
const requestModule = { ...storyModule, href: "/produto/financeiro" };
const phaseDurations = [1250, 1400, 1550, 1700, 2100] as const;

const steps = [
  { id: "origin", index: "01", kicker: "ORIGEM", title: "Pedido criado no campo", person: "Paulo Neves", time: "14:27" },
  { id: "n1", index: "02", kicker: "N1 · GESTOR", title: "Pedro Almeida aprova", person: "alçada operacional", time: "14:29" },
  { id: "n2", index: "03", kicker: "N2 · FINANCEIRO", title: "Marina Lopes aprova", person: "alçada financeira", time: "14:32" },
  { id: "handoff", index: "04", kicker: "HANDOFF", title: "AP-035 segue ao financeiro", person: "OS-184 preservada", time: "14:32" },
] as const;

function ApprovalIcon({ kind }: { kind: string }) {
  if (kind === "origin") return <path d="M6 6h20v16H13l-7 5V6Z" />;
  if (kind === "handoff") return <path d="M5 16h22M21 9l7 7-7 7" />;
  return <path d="m7 16 6 6L27 8" />;
}

export function RequestsStory() {
  const { ref, phase } = useNarrativeLoop({ phaseDurations });

  return (
    <ModuleStoryShell module={requestModule}>
      <div ref={ref} className={styles.stage} data-phase={phase}>
        <div className={styles.requestOrigin}>
          <span>14:27 · CAMPO</span>
          <blockquote>“Precisamos liberar os materiais hidráulicos da portaria.”</blockquote>
          <div><strong>SOL-031</strong><small>R$ 5.800 · OS-184</small></div>
        </div>

        <div className={styles.approvalFlow} aria-label="Solicitação passa por origem, alçadas e chega ao financeiro">
          <div className={styles.flowLine} aria-hidden="true"><i /></div>
          {steps.map((step, index) => (
            <article className={styles.step} data-step={step.id} data-index={index} key={step.id}>
              <span className={styles.stepIndex}>{step.index}</span>
              <div className={styles.stepIcon} aria-hidden="true">
                <svg viewBox="0 0 34 34" fill="none"><ApprovalIcon kind={step.id} /></svg>
              </div>
              <div className={styles.stepCopy}>
                <small>{step.kicker}</small>
                <strong>{step.title}</strong>
                <span>{step.person}</span>
              </div>
              <time>{step.time}</time>
            </article>
          ))}
        </div>

        <div className={styles.contextLedger}>
          <div><span>MOTIVO</span><strong>materiais da etapa de instalação</strong></div>
          <div><span>OBRA</span><strong>Reforma da portaria</strong></div>
          <div><span>VALOR</span><strong>R$ 5.800,00</strong></div>
          <div><span>ALÇADA</span><strong>N1 + N2</strong></div>
        </div>

        <div className={styles.outcome}>
          <span>DECISÃO PRESERVADA</span>
          <strong>O financeiro recebe o pedido já sabendo quem pediu, quem aprovou e por quê.</strong>
        </div>
      </div>
    </ModuleStoryShell>
  );
}
