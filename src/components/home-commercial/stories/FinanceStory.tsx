"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./FinanceStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "finance")!;
const phaseDurations = [2300, 2400, 2300, 2800] as const;

const route = [
  { key: "request", code: "SOL-031", label: "Solicitação", meta: "Pedido nasce na obra" },
  { key: "approval", code: "AP-035", label: "Aprovação", meta: "N1 + N2 deixam rastro" },
  { key: "payment", code: "PIX-9281", label: "Pagamento", meta: "Financeiro recebe contexto" },
  { key: "bank", code: "EXT-441", label: "Conciliação", meta: "Extrato fecha a história" },
] as const;

type RouteKey = (typeof route)[number]["key"];

function FinanceGlyph({ kind }: { kind: RouteKey }) {
  if (kind === "request") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3.75h7.2L18 7.55v12.7H7z" />
        <path d="M14 3.75v4h4M9.8 12h5M9.8 15.5h3.4" />
      </svg>
    );
  }

  if (kind === "approval") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.25" />
        <path d="m8.5 12.15 2.25 2.2 4.85-5" />
      </svg>
    );
  }

  if (kind === "payment") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.75" y="6" width="16.5" height="12" rx="2" />
        <path d="M3.75 9.5h16.5M7.4 14.2h3.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7.25h12.5M5 12h9.5M5 16.75h7" />
      <path d="m15.2 15.15 1.9 1.9 3.15-3.55" />
    </svg>
  );
}

export function FinanceStory() {
  const { ref, phase } = useNarrativeLoop({ phaseDurations, inViewAmount: 0.36 });

  return (
    <ModuleStoryShell module={storyModule}>
      <div ref={ref} className={styles.stage} data-phase={phase}>
        <header className={styles.sceneHead}>
          <div>
            <span>RASTRO FINANCEIRO</span>
            <strong>Reforma da portaria</strong>
          </div>
          <div className={styles.contextStamp}>
            <span>OS-184</span>
            <i />
            <span>R$ 5.800,00</span>
          </div>
        </header>

        <div className={styles.sceneBody}>
          <ol className={styles.route} aria-label="Etapas do fluxo financeiro">
            <span className={styles.routeBase} aria-hidden="true" />
            <span className={styles.routeProgress} aria-hidden="true" />
            <span className={styles.routeToken} aria-hidden="true" />

            {route.map((item, index) => (
              <li
                key={item.key}
                className={styles.routeStep}
                data-active={phase === index ? "true" : "false"}
                data-passed={phase > index ? "true" : "false"}
              >
                <span className={styles.routeGlyph}><FinanceGlyph kind={item.key} /></span>
                <div>
                  <code>{item.code}</code>
                  <strong>{item.label}</strong>
                  <small>{item.meta}</small>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.focusArea}>
            <div className={styles.sceneCounter} aria-hidden="true">
              <span>{String(phase + 1).padStart(2, "0")}</span>
              <i />
              <span>04</span>
            </div>

            <article className={`${styles.focusCard} ${styles.requestCard}`} aria-hidden={phase !== 0}>
              <div className={styles.cardEyebrow}><span>01</span> SOLICITAÇÃO CRIADA NA OBRA</div>
              <div className={styles.requestTop}>
                <div>
                  <code>SOL-031</code>
                  <h3>Materiais hidráulicos</h3>
                  <p>Reforma da portaria · OS-184</p>
                </div>
                <strong>R$ 5.800,00</strong>
              </div>
              <dl className={styles.detailGrid}>
                <div><dt>Solicitante</dt><dd>Ana Ribeiro</dd></div>
                <div><dt>Centro de custo</dt><dd>Obra / Portaria</dd></div>
                <div><dt>Motivo</dt><dd>Etapa hidráulica</dd></div>
              </dl>
              <div className={styles.cardFooter}><i /> O gasto já nasce com contexto.</div>
            </article>

            <article className={`${styles.focusCard} ${styles.approvalCard}`} aria-hidden={phase !== 1}>
              <div className={styles.cardEyebrow}><span>02</span> ALÇADA DE APROVAÇÃO</div>
              <div className={styles.approvalTitle}>
                <div><code>AP-035</code><h3>Duas decisões, um único rastro.</h3></div>
                <span>R$ 5.800,00</span>
              </div>
              <div className={styles.approvalPeople}>
                <div><i>ML</i><span><small>N1 · 14:18</small><strong>Marina Lopes</strong></span><b>✓</b></div>
                <span className={styles.approvalConnector} aria-hidden="true" />
                <div><i>PA</i><span><small>N2 · 14:24</small><strong>Pedro Almeida</strong></span><b>✓</b></div>
              </div>
              <div className={styles.cardFooter}><i /> A obrigação é gerada sem perder SOL-031 e OS-184.</div>
            </article>

            <article className={`${styles.focusCard} ${styles.paymentCard}`} aria-hidden={phase !== 2}>
              <div className={styles.cardEyebrow}><span>03</span> PAGAMENTO</div>
              <div className={styles.paymentReceipt}>
                <div><span>PIX enviado</span><time>28/09 · 14:32</time></div>
                <strong>− R$ 5.800,00</strong>
                <p>Hidráulica Norte Ltda.</p>
              </div>
              <div className={styles.originTrace}>
                <span>Origem</span>
                <strong>SOL-031</strong><i />
                <strong>AP-035</strong><i />
                <strong>OS-184</strong>
              </div>
              <div className={styles.cardFooter}><i /> O financeiro recebe o pagamento com a história pronta.</div>
            </article>

            <article className={`${styles.focusCard} ${styles.bankCard}`} aria-hidden={phase !== 3}>
              <div className={styles.cardEyebrow}><span>04</span> CONCILIAÇÃO</div>
              <div className={styles.matchHeadline}>
                <div><span>CORRESPONDÊNCIA</span><strong>96%</strong></div>
                <p>Extrato e obrigação apontam para o mesmo gasto.</p>
              </div>
              <div className={styles.matchPair}>
                <div><small>EXTRATO · EXT-441</small><strong>− R$ 5.800,00</strong><span>14:32 · Hidráulica Norte</span></div>
                <i aria-hidden="true">↔</i>
                <div><small>OBRIGAÇÃO · AP-035</small><strong>R$ 5.800,00</strong><span>SOL-031 · OS-184</span></div>
              </div>
              <div className={styles.matchDone}><i /> Pronto para conciliar <span>contexto preservado</span></div>
            </article>
          </div>
        </div>

        <footer className={styles.sceneFooter}>
          <span><i /> Solicitação</span>
          <span><i /> Aprovação</span>
          <span><i /> Pagamento</span>
          <span><i /> Conciliação</span>
          <strong>o contexto não é refeito no fim — ele acompanha o fluxo</strong>
        </footer>
      </div>
    </ModuleStoryShell>
  );
}
