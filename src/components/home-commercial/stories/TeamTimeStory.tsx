"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./TeamTimeStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "team-time")!;
const teamModule = { ...storyModule, href: "/produto/equipe" };
const phaseDurations = [1350, 1500, 1650, 1650, 1900] as const;
const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];

const lanes = [
  { initials:"AR", name:"Ana Ribeiro", project:"Reforma da portaria", blocks:[{label:"Instalação",start:"8%",width:"27%"},{label:"Conferência",start:"58%",width:"16%"}] },
  { initials:"PN", name:"Paulo Neves", project:"Adequação elétrica", blocks:[{label:"Vistoria",start:"20%",width:"15%"},{label:"Compra",start:"50%",width:"19%"}] },
  { initials:"ML", name:"Marina Lopes", project:"Administrativo", blocks:[{label:"Aprovações",start:"37%",width:"28%"}] },
] as const;

export function TeamTimeStory(){
  const {ref,phase}=useNarrativeLoop({phaseDurations});
  return <ModuleStoryShell module={teamModule}>
    <div ref={ref} className={styles.stage} data-phase={phase}>
      <header className={styles.dayHeader}>
        <div className={styles.clock}><span className={styles.mono}>14:32</span><small>AGORA · 07 OUT</small></div>
        <div className={styles.dayContext}><strong>Um dia de execução, ligado às obras.</strong><span>6 pessoas · 4 obras · 18h36 apontadas</span></div>
      </header>

      <div className={styles.timelineViewport}>
        <div className={styles.hourRuler}><span>PESSOA / OBRA</span>{hours.map(h=><b className={styles.mono} key={h}>{h}</b>)}</div>
        <div className={styles.currentBand} aria-hidden="true"><span className={styles.mono}>14:32</span></div>
        <div className={styles.lanes}>
          {lanes.map((lane,index)=><article className={styles.lane} data-lane={index+1} key={lane.name}>
            <div className={styles.person}><i>{lane.initials}</i><div><strong>{lane.name}</strong><small>{lane.project}</small></div></div>
            <div className={styles.workTrack}>
              {lane.blocks.map(block=><span className={styles.workBlock} style={{left:block.start,width:block.width}} key={block.label}><b>{block.label}</b></span>)}
            </div>
          </article>)}
        </div>
      </div>

      <footer className={styles.workLedger}>
        <div><span>REFORMA DA PORTARIA</span><b className={styles.mono}>07H42</b><i><em style={{width:"62%"}}/></i></div>
        <div><span>ADEQUAÇÃO ELÉTRICA</span><b className={styles.mono}>05H18</b><i><em style={{width:"43%"}}/></i></div>
        <div><span>ADMINISTRATIVO</span><b className={styles.mono}>03H06</b><i><em style={{width:"25%"}}/></i></div>
        <p>O apontamento continua ligado à pessoa, tarefa e obra — não termina como um total solto no fim do dia.</p>
      </footer>
    </div>
  </ModuleStoryShell>;
}
