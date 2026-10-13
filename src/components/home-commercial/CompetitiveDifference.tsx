import { competitiveProcesses, type CompetitiveState } from "@/lib/homeCommercialNarrative";
import styles from "./CompetitiveDifference.module.css";
import type { CSSProperties } from "react";

const columns = [
  ["drTasks", "Dr. Tasks"],
  ["sienge", "Sienge"],
  ["totvs", "TOTVS"],
  ["obraPrima", "Obra Prima"],
  ["vobi", "Vobi"],
] as const;

function StateGlyph({ state }: { state: CompetitiveState }) {
  const label = state === "native" ? "Nativo" : state === "partial" ? "Parcial" : "Não identificado";
  return (
    <span className={styles.glyph} data-state={state} aria-label={label} title={label}>
      {state === "native" ? "✓" : state === "partial" ? "◐" : "×"}
    </span>
  );
}

export function CompetitiveDifference() {
  return (
    <section
      id="comparativo"
      className={styles.section}
      data-home-motion="comparison"
      data-home-replay="true"
      aria-labelledby="comparison-title"
    >
      <div className={styles.inner}>
        <header className={styles.heading}>
          <div>
            <span className={styles.kicker}>A BATALHA DECISIVA</span>
            <h2 id="comparison-title">Não competimos em 22 caixinhas. Competimos nos 6 processos que decidem a rotina.</h2>
          </div>
          <p>A lista infinita de recursos favorece quem parece mais completo. A leitura útil é outra: quais processos continuam funcionando sem planilha paralela, mensagem solta ou reconstrução manual?</p>
        </header>

        <div className={styles.boardViewport}>
          <div className={styles.comparisonBoard} role="table" aria-label="Comparação de processos decisivos entre plataformas">
            <div className={styles.boardHead} role="row">
              <div role="columnheader">PROCESSO DECISIVO</div>
              {columns.map(([key, label]) => (
                <div data-us={key === "drTasks" || undefined} role="columnheader" key={key}>{label}</div>
              ))}
            </div>

            {competitiveProcesses.map((row, index) => (
              <div className={styles.boardRow} style={{ "--row": index } as CSSProperties} role="row" key={row.process}>
                <div className={styles.process} role="rowheader">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{row.process}</strong>
                </div>
                {columns.map(([key]) => (
                  <div className={styles.state} data-us={key === "drTasks" || undefined} role="cell" key={key}>
                    <StateGlyph state={row[key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.legend}>
            <span><i data-state="native">✓</i>Nativo</span>
            <span><i data-state="partial">◐</i>Parcial</span>
            <span><i data-state="unavailable">×</i>Não identificado</span>
          </div>
          <p>{"Recursos e disponibilidade podem variar por plano e versão. Comparativo de referência a validar antes da publicação comercial."}</p>
        </footer>
      </div>
    </section>
  );
}
