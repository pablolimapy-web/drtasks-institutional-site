"use client";

import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import { ModuleStoryShell } from "../ModuleStoryShell";
import { useNarrativeLoop } from "../useNarrativeLoop";
import styles from "./QuotesStory.module.css";

const storyModule = homeCommercialModules.find((module) => module.id === "quotes")!;
const quoteModule = { ...storyModule, href: "/produto/financeiro" };
const phaseDurations = [1200, 1350, 1550, 1750, 2200] as const;

const proposals = [
  { id: "A", supplier: "Fornecedor A", total: "R$ 5.880", delivery: "3 dias", payment: "28 dias", freight: "incluso" },
  { id: "B", supplier: "Fornecedor B", total: "R$ 5.640", delivery: "5 dias", payment: "35 dias", freight: "R$ 180", selected: true },
  { id: "C", supplier: "Fornecedor C", total: "R$ 5.960", delivery: "2 dias", payment: "21 dias", freight: "incluso" },
] as const;

function ProposalGlyph({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 54 66" fill="none" aria-hidden="true">
      <path d="M9 2.5h27l9 9V63H9z" />
      <path d="M36 2.5v10h9" />
      <path d="M17 24h20M17 32h20M17 40h13" />
      <text x="17" y="55">{id}</text>
    </svg>
  );
}

export function QuotesStory() {
  const { ref, phase } = useNarrativeLoop({ phaseDurations });

  return (
    <ModuleStoryShell module={quoteModule}>
      <div ref={ref} className={styles.stage} data-phase={phase}>
        <div className={styles.origin}>
          <span>COT-018 · OS-184</span>
          <strong>24 portas de alumínio</strong>
          <small>uma compra · três condições · uma decisão</small>
        </div>

        <div className={styles.proposalField} aria-label="Três propostas convergem para uma decisão comparável">
          <svg className={styles.routes} viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true">
            <path d="M155 178 C310 178 350 210 500 210" />
            <path d="M155 210 C320 210 360 210 500 210" />
            <path d="M155 242 C310 242 350 210 500 210" />
            <path d="M500 210 C650 210 700 210 850 210" />
          </svg>

          <div className={styles.proposals}>
            {proposals.map((proposal, index) => (
              <article
                className={styles.proposal}
                data-proposal={proposal.id}
                data-selected={proposal.selected ? "true" : undefined}
                key={proposal.id}
              >
                <span className={styles.paperIcon}><ProposalGlyph id={proposal.id} /></span>
                <div className={styles.proposalCopy}>
                  <span>PROP-13{4 + index}</span>
                  <strong>{proposal.supplier}</strong>
                  <dl>
                    <div><dt>Total</dt><dd>{proposal.total}</dd></div>
                    <div><dt>Entrega</dt><dd>{proposal.delivery}</dd></div>
                    <div><dt>Pagamento</dt><dd>{proposal.payment}</dd></div>
                    <div><dt>Frete</dt><dd>{proposal.freight}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.comparisonCore} aria-hidden="true">
            <span>COMPARAR</span>
            <i /><i /><i /><i />
            <strong>4 critérios</strong>
          </div>

          <div className={styles.decision}>
            <span>DECISÃO REGISTRADA</span>
            <strong>Fornecedor B</strong>
            <p>Não é o menor número isolado. É a melhor condição para esta obra.</p>
            <div className={styles.equation}>
              <span>R$ 5.640</span><i>+</i><span>R$ 180</span><i>=</i><b>R$ 5.820</b>
            </div>
            <div className={styles.decisionMeta}><span>35 dias</span><span>OS-184</span></div>
          </div>
        </div>

        <div className={styles.decisionRail} aria-hidden="true">
          <span>3 propostas</span><i />
          <span>4 condições comparadas</span><i />
          <strong>1 escolha com rastro</strong>
        </div>
      </div>
    </ModuleStoryShell>
  );
}
