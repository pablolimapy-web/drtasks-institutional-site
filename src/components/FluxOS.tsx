"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRightIcon } from "./Icons";
import { fluxStepPercent, nextFluxStep } from "@/lib/fluxCycle";

const steps = [
  { name: "Entrada", title: "Briefing recebido", meta: "Contexto registrado", tone: "blue" },
  { name: "Organização", title: "Responsável definido", meta: "Prioridade alta", tone: "blue" },
  { name: "Execução", title: "Revisão técnica", meta: "João · Hoje", tone: "blue" },
  { name: "Conclusão", title: "Entrega aprovada", meta: "Concluído", tone: "green" },
];

const STEP_INTERVAL_MS = 1550;
const COMPLETION_HOLD_MS = 2200;

export function FluxOS() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [autoRunning, setAutoRunning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = (matches: boolean) => {
      setReducedMotion(matches);
      if (matches) setActive(3);
    };

    applyReduced(media.matches);
    const onChange = (event: MediaQueryListEvent) => applyReduced(event.matches);
    media.addEventListener?.("change", onChange);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !media.matches) {
          setAutoRunning(true);
        }
      },
      { threshold: 0.26 },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      media.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!autoRunning || reducedMotion) return;

    const timeout = window.setTimeout(() => {
      setActive((current) => nextFluxStep(current, steps.length));
    }, active === steps.length - 1 ? COMPLETION_HOLD_MS : STEP_INTERVAL_MS);

    return () => window.clearTimeout(timeout);
  }, [active, autoRunning, reducedMotion]);

  const selectStep = (index: number) => {
    setActive(index);
    if (!reducedMotion) setAutoRunning(true);
  };

  const isComplete = active === steps.length - 1;

  return (
    <section ref={ref} className="section flux-section" id="fluxos">
      <div className="container surface flux-surface">
        <div className="flux-header">
          <div>
            <span className="eyebrow">FluxOS</span>
            <h2>Seu trabalho tem um fluxo.<br />Agora ele fica visível.</h2>
          </div>
          <p>Uma demanda entra, ganha responsável, avança por etapas e chega à conclusão sem depender da memória de alguém.</p>
        </div>

        <div className={`flux-demo ${isComplete ? "is-celebrating" : ""}`}>
          <div className="flux-celebration" aria-hidden="true">
            <span className="flux-celebration-backdrop" />
            <span className="flux-celebration-fill" />
            <span className="flux-celebration-orb orb-one" />
            <span className="flux-celebration-orb orb-two" />
            <span className="flux-celebration-orb orb-three" />
            <span className="flux-celebration-ray ray-one" />
            <span className="flux-celebration-ray ray-two" />
            <span className="flux-celebration-ray ray-three" />
            <span className="flux-celebration-spark spark-one" />
            <span className="flux-celebration-spark spark-two" />
            <span className="flux-celebration-spark spark-three" />
            <span className="flux-celebration-spark spark-four" />
            <span className="flux-celebration-spark spark-five" />
            <span className="flux-celebration-text">CONCLUÍDO</span>
            <span className="flux-celebration-badge">Fluxo concluído com sucesso</span>
          </div>

          <div className="flux-steps">
            <div className="flux-progress" aria-hidden="true"><span style={{ width: `${(active / 3) * 100}%` }} /></div>
            {steps.map((step, i) => (
              <div className={`flux-step ${i <= active ? "is-active" : ""}`} key={step.name}>
                <button type="button" onClick={() => selectStep(i)} aria-label={`Mostrar etapa ${step.name}`} aria-current={active === i ? "step" : undefined}>
                  <span className={`flux-step-node ${i === 3 ? "is-done" : ""}`}>{i < 3 ? i + 1 : "✓"}</span>
                  <span>{step.name}</span>
                </button>
              </div>
            ))}
          </div>

          <div className="flux-task-track" aria-live="polite">
            <div
              className={`moving-task ${isComplete ? "is-complete" : ""}`}
              style={{ "--task-position": `${fluxStepPercent(active, steps.length)}%` } as CSSProperties}
            >
              <span className="task-kicker">{steps[active].name.toUpperCase()}</span>
              <strong>{steps[active].title}</strong>
              <span>{steps[active].meta}</span>
              <div className="task-detail-row"><span className="mini-avatar">D</span><span className="mini-progress"><i /></span></div>
            </div>
          </div>

          <div className="context-panel">
            <span className="context-label">VISIBILIDADE DO FLUXO</span>
            <strong>{isComplete ? "Entrega finalizada" : "Próximo passo definido"}</strong>
            <small>{isComplete ? "Histórico preservado" : steps[Math.min(active + 1, 3)].name}</small>
          </div>
        </div>

        <div className="flux-copy-grid">
          {steps.map((step, i) => <article key={step.name}><span>0{i + 1}</span><h3>{step.name}</h3><p>{[
            "Toda demanda começa registrada, com contexto desde o primeiro momento.",
            "Defina responsável, prioridade, prazo e o que precisa acontecer depois.",
            "A equipe sabe exatamente o que está em andamento e o que depende dela.",
            "O histórico permanece visível até a entrega e a próxima decisão."
          ][i]}</p></article>)}
        </div>
        <a href="#funcionalidades" className="text-link">Conhecer as funcionalidades <ArrowRightIcon /></a>
      </div>
    </section>
  );
}
