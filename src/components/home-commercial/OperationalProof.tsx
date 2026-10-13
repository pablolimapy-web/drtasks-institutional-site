import { operationalProof } from "@/lib/homeCommercialNarrative";
import styles from "./OperationalProof.module.css";
import type { CSSProperties } from "react";

const withoutContext = [
  "Abre planilha para descobrir o que ficou pendente.",
  "Procura mensagens para reconstruir quem aprovou o quê.",
  "Confere banco e nota fiscal fora do contexto da obra.",
  "Monta status para responder uma cobrança que já aconteceu.",
  "Fecha o dia consolidando informação que nasceu em lugares diferentes.",
] as const;

const withDrTasks = [
  "Entra no fluxo e vê etapa, responsável e próxima ação.",
  "Aprovação chega com origem, valor, alçada e histórico.",
  "Pagamento e conciliação continuam ligados à obra e à OS.",
  "Pendência aparece no processo em que precisa ser resolvida.",
  "O status já existe porque o trabalho foi registrado no contexto certo.",
] as const;

export function OperationalProof() {
  return (
    <section
      id="prova-operacional"
      className={styles.section}
      data-home-motion="evidence"
      data-home-replay="true"
      aria-labelledby="proof-title"
    >
      <div className={styles.inner}>
        <header className={styles.statement}>
          <div>
            <span className={styles.kicker}>UM DIA DE OPERAÇÃO</span>
            <h2 id="proof-title">Segunda-feira, 8h. A mesma equipe. O que muda é o trabalho entre uma decisão e outra.</h2>
          </div>
          <p>{operationalProof.description}</p>
        </header>

        <div className={styles.dayBattle}>
          <article className={styles.dayColumn} data-mode="before">
            <header>
              <span>SEM CONTEXTO CONECTADO</span>
              <strong>O dia começa reconstruindo o que já aconteceu.</strong>
            </header>
            <ol>
              {withoutContext.map((item, index) => (
                <li style={{ "--row": index } as CSSProperties} key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
            <footer><i aria-hidden="true" />troca de contexto vira trabalho administrativo</footer>
          </article>

          <div className={styles.centerRail} aria-hidden="true">
            <span>MESMA<br />OPERAÇÃO</span>
            <i />
            <b>→</b>
          </div>

          <article className={styles.dayColumn} data-mode="after">
            <header>
              <span>COM DR. TASKS</span>
              <strong>O dia começa de onde o processo realmente parou.</strong>
            </header>
            <ol>
              {withDrTasks.map((item, index) => (
                <li style={{ "--row": index } as CSSProperties} key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
            <footer><i aria-hidden="true" />o contexto acompanha o trabalho até a próxima ação</footer>
          </article>
        </div>

        <div className={styles.metricBand}>
          <div className={styles.metricCopy}>
            <span>HIPÓTESE OPERACIONAL A VALIDAR</span>
            <p>O intervalo não é a promessa. A prova é conseguir apontar quais rotinas repetitivas foram absorvidas pelo processo.</p>
          </div>
          <strong className={styles.metric}>{operationalProof.metric}</strong>
          <div className={styles.metricMeaning}>
            <span>CAPACIDADE ADMINISTRATIVA</span>
            <p>{operationalProof.metricLabel}</p>
            <small>{operationalProof.disclaimer}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
