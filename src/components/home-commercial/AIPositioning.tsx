import { aiPositioningCopy } from "@/lib/homeCommercialNarrative";
import styles from "./AIPositioning.module.css";

export function AIPositioning(){
  return <section className={styles.section} data-home-motion="intelligence" data-home-replay="true" aria-labelledby="ai-positioning-title">
    <div className={styles.inner}>
      <header className={styles.copy}>
        <h2 id="ai-positioning-title">{aiPositioningCopy.headline}</h2>
        <p>{aiPositioningCopy.body}</p>
      </header>

      <div className={styles.signalField} aria-label="Conceito da camada de inteligência artificial">
        <div className={styles.incomingSignals}>
          <span className={styles.mono}>ENTRADA</span>
          <strong>Documento</strong><strong>Mensagem</strong><strong>Evento do processo</strong>
        </div>
        <i className={styles.signalLine} aria-hidden="true"/>
        <div className={styles.contextCore}>
          <small>CONTEXTO QUE O DR.TASKS JÁ CONHECE</small>
          <div><span>obra</span><span>OS</span><span>tarefa</span><span>responsável</span><span>prazo</span></div>
        </div>
        <i className={styles.signalLine} aria-hidden="true"/>
        <div className={styles.automationGate}>
          <span className={styles.mono}>ESCOPO EM EVOLUÇÃO</span>
          <strong>Reduzir leitura, classificação e encaminhamento manual.</strong>
          <small>Somente funções tecnicamente validadas entram em produção.</small>
        </div>
        <i className={styles.signalLine} aria-hidden="true"/>
        <div className={styles.humanGate}><span>REVISÃO HUMANA</span><strong>onde fizer sentido</strong></div>
      </div>

      <p className={styles.outcome}>A inteligência entra no processo para diminuir intervenção manual — não para criar uma camada separada de “features de IA”.</p>
    </div>
  </section>;
}
