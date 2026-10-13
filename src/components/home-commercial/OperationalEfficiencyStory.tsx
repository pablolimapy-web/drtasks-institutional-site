import { operationalEfficiencyStories } from "@/lib/homeCommercialNarrative";
import styles from "./OperationalEfficiencyStory.module.css";
import type { CSSProperties } from "react";

const processMeta = [
  { code: "01", label: "Consolidação", signal: "planilha + mensagens + financeiro" },
  { code: "02", label: "Status", signal: "cobrança manual de andamento" },
  { code: "03", label: "Aprovação", signal: "decisão fora do processo" },
  { code: "04", label: "Caixa", signal: "número sem origem operacional" },
] as const;

const auditNotes = [
  "a informação nasce uma vez",
  "a decisão deixa rastro",
  "o financeiro preserva a origem",
] as const;

export function OperationalEfficiencyStory() {
  return (
    <section
      id="eficiencia"
      className={styles.section}
      data-home-motion="process"
      data-home-replay="true"
      aria-labelledby="efficiency-title"
    >
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div className={styles.headingMain}>
            <span className={styles.kicker}>A CONTA ABERTA</span>
            <h2 id="efficiency-title">Não pedimos que você acredite. Mostramos o trabalho que deixa de existir.</h2>
          </div>
          <div className={styles.headingAside}>
            <p>Cada ganho precisa responder a uma pergunta simples: qual rotina manual o produto absorve e qual contexto continua preservado depois disso?</p>
            <span className={styles.auditTag}>04 ROTINAS · 01 CONTEXTO OPERACIONAL</span>
          </div>
        </header>

        <div className={styles.auditSheet}>
          <div className={styles.sheetTopline} aria-hidden="true">
            <span>ROTINA QUE EXISTIA</span>
            <span>O QUE O DR. TASKS ABSORVE</span>
            <span>EFEITO</span>
          </div>

          <ol className={styles.ledger}>
            {operationalEfficiencyStories.map((story, index) => {
              const meta = processMeta[index];
              return (
                <li className={styles.entry} style={{ "--entry": index } as CSSProperties} key={story.before}>
                  <div className={styles.processId}>
                    <span>{meta.code}</span>
                    <div>
                      <small>{meta.label}</small>
                      <b>{meta.signal}</b>
                    </div>
                  </div>

                  <div className={styles.beforePhrase}>
                    <small>ANTES</small>
                    <strong>{story.before}</strong>
                    <i aria-hidden="true" />
                  </div>

                  <div className={styles.absorbMark} aria-hidden="true">
                    <span>−</span>
                    <i />
                  </div>

                  <div className={styles.replacement}>
                    <small>PROCESSO CONECTADO</small>
                    <strong>{story.drTasks}</strong>
                  </div>

                  <div className={styles.effect}>
                    <span aria-hidden="true">↗</span>
                    <strong>{story.result}</strong>
                  </div>
                </li>
              );
            })}
          </ol>

          <footer className={styles.auditFooter}>
            <div className={styles.sumStatement}>
              <span>04</span>
              <small>rotinas paralelas</small>
              <i aria-hidden="true">→</i>
              <span>01</span>
              <small>contexto preservado</small>
            </div>
            <div className={styles.auditNotes}>
              {auditNotes.map((note, index) => (
                <span key={note}><b>{String(index + 1).padStart(2, "0")}</b>{note}</span>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
