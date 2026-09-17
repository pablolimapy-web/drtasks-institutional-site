"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "./Icons";
import { fluxDemoStages, nextFluxStep } from "@/lib/fluxCycle";

const HOLD_MS = 3800;

export function FluxOS() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(() => setActive(current => nextFluxStep(current, fluxDemoStages.length)), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion]);

  const selected = fluxDemoStages[active];

  return (
    <section className="section flux-section flux-commercial" id="fluxos">
      <div className="container surface flux-surface">
        <div className="flux-header">
          <div><span className="eyebrow">O coração do Dr. Tasks</span><h2>Cada OS tem um caminho. A equipe precisa enxergar o próximo passo.</h2></div>
          <p>Veja a carteira inteira por estágios e, sem perder contexto, identifique risco, aging, bloqueio, responsável e próxima ação.</p>
        </div>

        <div className="flux-portfolio" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="flux-portfolio-topline"><span>Demonstração com dados de exemplo</span><button type="button" onClick={() => setPaused(value => !value)}>{paused ? "Retomar animação" : "Pausar animação"}</button></div>
          <div className="flux-stage-row" role="tablist" aria-label="Estágios demonstrativos de OS">
            {fluxDemoStages.map((stage,index)=><button key={stage.id} className={`flux-stage-card ${active===index?'is-active':''}`} onClick={()=>{setActive(index);setPaused(true)}} role="tab" aria-selected={active===index}>
              <span className="flux-stage-number">0{index+1}</span><strong>{stage.label}</strong><small>{stage.osCount} OS</small>
              <div className="flux-stage-metrics"><span className={stage.riskCount ? 'has-risk' : ''}>{stage.riskCount} em risco</span><span>aging {stage.agingDays}d</span></div>
            </button>)}
          </div>

          <div className="flux-detail-grid">
            <article className="flux-os-card">
              <div className="flux-os-head"><div><span className="task-kicker">{selected.label.toUpperCase()}</span><h3>OS-1042 · Reforma Unidade Centro</h3></div><span className="risk-badge">Atenção</span></div>
              <div className="flux-os-fields">
                <div><small>Responsável</small><strong>Maria</strong></div>
                <div><small>Prazo</small><strong>18/09/2026</strong></div>
                <div><small>Situação</small><strong>Em andamento</strong></div>
                <div><small>Aging do estágio</small><strong>{selected.agingDays} dias</strong></div>
              </div>
              <div className="next-action-box"><span>Próxima ação</span><strong>Confirmar material com fornecedor</strong></div>
              <div className="blocker-box"><span>Bloqueio</span><strong>Aguardando aprovação da medição</strong></div>
              <div className="flux-history-line"><span>Última movimentação</span><strong>15/09/2026 às 16:40</strong></div>
            </article>
            <aside className="flux-context-panel"><span className="context-label">LEITURA DA CARTEIRA</span><h3>{selected.label}</h3><div className="flux-context-stat"><strong>{selected.osCount}</strong><span>OS neste estágio</span></div><div className="flux-context-stat"><strong>{selected.riskCount}</strong><span>OS em risco</span></div><div className="flux-context-stat"><strong>{selected.agingDays}d</strong><span>aging médio</span></div><p>O detalhe aparece sem tirar o gestor da visão geral da operação.</p></aside>
          </div>
        </div>
        <a href="#como-funciona" className="text-link">Entender o modelo do produto <ArrowRightIcon /></a>
      </div>
    </section>
  );
}
