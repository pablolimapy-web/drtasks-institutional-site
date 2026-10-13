"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./ChatStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "chat")!;
const chatModule = { ...storyModule, href: "/produto/equipe" };
const phaseDurations = [1200, 1400, 1550, 1700, 2100] as const;

const fragments = [
  { id: "message", eyebrow: "14:18 · ANA", text: "A porta chegou. A foto do campo já está na tarefa.", meta: "mensagem" },
  { id: "photo", eyebrow: "EVIDÊNCIA", text: "portaria-02.jpg", meta: "foto · 2,4 MB" },
  { id: "measure", eyebrow: "14:20 · PAULO", text: "Modelo B encaixa no vão existente.", meta: "mensagem" },
  { id: "file", eyebrow: "ARQUIVO", text: "medida-final.pdf", meta: "640 KB" },
] as const;

function LinkIcon({ kind }: { kind: string }) {
  if (kind === "photo") return <><rect x="5" y="7" width="24" height="20" rx="2"/><circle cx="12" cy="14" r="2"/><path d="m8 24 6-6 4 4 4-4 4 6"/></>;
  if (kind === "file") return <><path d="M9 4h12l6 6v20H9z"/><path d="M21 4v7h6M13 18h10M13 23h8"/></>;
  return <path d="M5 7h24v17H14l-9 6V7Z"/>;
}

export function ChatStory() {
  const { ref, phase } = useNarrativeLoop({ phaseDurations });

  return (
    <ModuleStoryShell module={chatModule}>
      <div ref={ref} className={styles.stage} data-phase={phase}>
        <svg className={styles.connections} viewBox="0 0 900 620" preserveAspectRatio="none" aria-hidden="true">
          <path d="M170 125 C300 170 330 250 455 305" />
          <path d="M735 120 C620 170 590 235 455 305" />
          <path d="M155 490 C285 430 330 360 455 305" />
          <path d="M750 485 C630 425 585 360 455 305" />
        </svg>

        <div className={styles.taskCore}>
          <span>CONTEXTO</span>
          <strong>Instalar nova porta</strong>
          <small>OS-184 · TAREFA #204</small>
          <i aria-hidden="true" />
        </div>

        {fragments.map((fragment, index) => (
          <article className={styles.fragment} data-fragment={fragment.id} data-index={index} key={fragment.id}>
            <span className={styles.fragmentIcon} aria-hidden="true"><svg viewBox="0 0 34 34" fill="none"><LinkIcon kind={fragment.id} /></svg></span>
            <div>
              <small>{fragment.eyebrow}</small>
              <strong>{fragment.text}</strong>
              <span>{fragment.meta}</span>
            </div>
          </article>
        ))}

        <div className={styles.decision}>
          <span>DECISÃO / 01</span>
          <blockquote>Modelo B aprovado para instalação.</blockquote>
          <p>Ana Ribeiro · 14:21</p>
          <strong>registrada na tarefa</strong>
        </div>

        <div className={styles.contextPulse} aria-hidden="true"><i /><i /><i /></div>

        <footer className={styles.contextLegend}>
          <span>mensagem</span><i />
          <span>arquivo</span><i />
          <span>evidência</span><i />
          <strong>todos apontam para o mesmo trabalho</strong>
        </footer>
      </div>
    </ModuleStoryShell>
  );
}
