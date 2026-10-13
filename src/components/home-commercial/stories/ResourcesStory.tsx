"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./ResourcesStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "resources")!;
const resourceModule = { ...storyModule, href: "/produto/recursos" };
const phaseDurations=[1350,1450,1650,1700,1900] as const;

export function ResourcesStory(){
  const {ref,phase}=useNarrativeLoop({phaseDurations});
  return <ModuleStoryShell module={resourceModule}>
    <div ref={ref} className={styles.stage} data-phase={phase}>
      <header className={styles.surveyBar}>
        <span className={styles.mono}>OS-184 / TAREFA #204</span>
        <strong>Campo de evidências</strong>
        <span>Reforma da portaria</span>
        <b className={styles.mono}>03 VÍNCULOS</b>
      </header>

      <div className={styles.siteCanvas}>
        <div className={styles.planTrace} aria-hidden="true"><i/><i/><i/><i/></div>
        <div className={styles.taskAnchor}>
          <small>TAREFA</small><strong>Instalar nova porta</strong><span className={styles.mono}>OS-184 · PORTARIA</span>
        </div>

        <button className={styles.evidencePin} data-kind="file" type="button"><i>PDF</i><span><small>ARQUIVO</small><strong>laudo-tecnico.pdf</strong><em>1,8 MB</em></span></button>
        <button className={styles.evidencePin} data-kind="photo" type="button"><i>IMG</i><span><small>FOTO</small><strong>portaria-02.jpg</strong><em>14:18 · ANA</em></span></button>
        <button className={styles.evidencePin} data-kind="location" type="button"><i>PIN</i><span><small>LOCAL</small><strong>Portaria · bloco A</strong><em>CAMPO</em></span></button>

        <svg className={styles.links} viewBox="0 0 900 500" preserveAspectRatio="none" aria-hidden="true">
          <path d="M160 120 C260 150 300 230 448 250"/><path d="M740 110 C620 148 590 214 448 250"/><path d="M720 400 C610 350 575 285 448 250"/>
        </svg>

        <aside className={styles.evidenceInspector}>
          <div className={styles.preview}><span>IMG</span><small className={styles.mono}>portaria-02.jpg</small></div>
          <div className={styles.inspectorCopy}>
            <span>EVIDÊNCIA SELECIONADA</span>
            <strong>Porta entregue em campo</strong>
            <dl>
              <div><dt>Capturado por</dt><dd>Ana Ribeiro</dd></div>
              <div><dt>Horário</dt><dd className={styles.mono}>14:18</dd></div>
              <div><dt>Vínculo</dt><dd className={styles.mono}>#204 · OS-184</dd></div>
            </dl>
          </div>
        </aside>
      </div>

      <footer className={styles.fieldLegend}><span><i/> arquivo</span><span><i/> foto</span><span><i/> localização</span><strong>tudo chega ao escritório com origem preservada</strong></footer>
    </div>
  </ModuleStoryShell>;
}
