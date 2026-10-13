// @ts-nocheck
"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRightIcon } from "./Icons";
import InfiniteMenu from "./motion/InfiniteMenu";
import { nextProductView, normalizeProductViewIndex } from "@/lib/productShowcase";

const productViews = [
  {
    id: "overview",
    number: "01",
    tab: "Visão geral",
    short: "Toda a operação em contexto",
    title: "Uma leitura ampla da operação, sem perder o detalhe.",
    description:
      "Enxergue projetos, responsáveis, prioridades e andamento em uma única superfície. A equipe entende o cenário antes de decidir o próximo passo.",
    bullets: ["Projetos em andamento", "Responsáveis e prioridades", "Visão operacional consolidada"],
    image: "/product/overview.png",
  },
  {
    id: "stages",
    number: "02",
    tab: "FluxOS",
    short: "Etapas que mostram o caminho",
    title: "Cada estágio mostra onde o trabalho está e o que vem depois.",
    description:
      "O FluxOS transforma processos em etapas visíveis. Acompanhe contexto, saúde, prazos e regras de avanço sem depender da memória de alguém.",
    bullets: ["Etapas com significado", "Bloqueios e próximos passos", "Contexto preservado no fluxo"],
    image: "/product/stages.png",
  },
  {
    id: "tasks",
    number: "03",
    tab: "Tarefas",
    short: "Execução ligada ao projeto",
    title: "A rotina deixa de ser uma lista solta de tarefas.",
    description:
      "Cada atividade aparece ligada ao projeto e ao estágio certo, deixando claro o que foi concluído, o que está em andamento e o que deve acontecer depois.",
    bullets: ["Tarefas conectadas ao contexto", "Responsáveis visíveis", "Progresso sem atualização manual"],
    image: "/product/tasks.png",
  },
  {
    id: "control",
    number: "04",
    tab: "Controle",
    short: "Sinais antes do atraso",
    title: "Indicadores que ajudam a agir antes da surpresa.",
    description:
      "Acompanhe projetos ativos, bloqueios, prioridades e saúde por estágio para transformar informação em decisão operacional.",
    bullets: ["Indicadores essenciais", "Bloqueios em evidência", "Acompanhamento de saúde e risco"],
    image: "/product/control.png",
  },
];

const AUTO_ADVANCE_DELAY_MS = 5200;

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [focusToken, setFocusToken] = useState(0);
  const [isOrbitMoving, setIsOrbitMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const current = productViews[active];

  const orbitItems = useMemo(
    () =>
      productViews.map((view) => ({
        image: view.image,
        link: `#product-${view.id}`,
        title: view.tab,
        description: view.short,
      })),
    [],
  );

  const handleOrbitActive = useCallback((index: number) => {
    setActive(normalizeProductViewIndex(index, productViews.length));
  }, []);

  const triggerFocus = useCallback((index: number) => {
    const normalized = normalizeProductViewIndex(index, productViews.length);
    setActive(normalized);
    setFocusIndex(normalized);
    setFocusToken((token) => token + 1);
  }, []);

  const selectView = (index: number) => {
    triggerFocus(index);
  };

  useEffect(() => {
    if (reducedMotion || isOrbitMoving || paused) return;

    const timeout = window.setTimeout(() => {
      triggerFocus(nextProductView(active, productViews.length));
    }, AUTO_ADVANCE_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [active, isOrbitMoving, paused, reducedMotion, triggerFocus]);

  return (
    <section className="section product-showcase-section" id="produto">
      <div className="container product-showcase-shell">
        <div className="product-showcase-heading">
          <div>
            <span className="eyebrow">Produto</span>
            <h2>Uma plataforma. Diferentes formas de enxergar sua operação.</h2>
          </div>
          <p>
            Veja a interface real em diferentes leituras da operação. A animação ajuda a explorar as telas sem substituir a informação principal.
          </p>
        </div>

        <div className="product-view-tabs" role="tablist" aria-label="Visões do Dr. Tasks">
          {productViews.map((view, index) => (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`product-view-tab ${active === index ? "is-active" : ""}`}
              onClick={() => selectView(index)}
            >
              <span className="product-tab-number">{view.number}</span>
              <span className="product-tab-copy">
                <strong>{view.tab}</strong>
                <small>{view.short}</small>
              </span>
            </button>
          ))}
        </div>

        <div className="product-orbit-stage" id={`product-${current.id}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="product-orbit-canvas">
            <div className="product-orbit-aura" aria-hidden="true" />
            <div className="product-orbit-hint"><span /> Arraste para explorar em 3D</div>

            {reducedMotion ? (
              <div className="product-static-screen">
                <Image
                  src={current.image}
                  alt={`Tela do Dr. Tasks — ${current.tab}`}
                  width={1836}
                  height={926}
                  sizes="(max-width: 900px) 100vw, 72vw"
                />
              </div>
            ) : (
              <InfiniteMenu
                items={orbitItems}
                scale={0.72}
                backgroundColor="transparent"
                showOverlay={false}
                className="product-infinite-menu"
                autoRotate={false}
                autoResumeDelay={1450}
                focusIndex={focusIndex}
                focusToken={focusToken}
                onActiveIndexChange={handleOrbitActive}
                onMovementChange={setIsOrbitMoving}
              />
            )}

            <div className="product-orbit-vignette" aria-hidden="true" />
          </div>

          <aside className="product-orbit-description" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="product-description-motion"
                initial={reducedMotion ? false : { opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="product-description-index">{current.number} / 04</span>
                <span className="product-description-kicker">{current.tab}</span>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <ul>
                  {current.bullets.map((bullet) => (
                    <li key={bullet}><span />{bullet}</li>
                  ))}
                </ul>
                <a href="#recursos" className="text-link product-detail-link">Explorar possibilidades <ArrowRightIcon /></a>
              </motion.div>
            </AnimatePresence>

            <div className="product-orbit-status">
              <span>{current.number}</span>
              <i />
              <small>{isOrbitMoving ? "transição em andamento" : paused ? "exploração pausada" : "pausa para leitura · troca automática"}</small>
              <button type="button" className="product-pause-button" onClick={() => setPaused(value => !value)}>{paused ? "Retomar" : "Pausar"}</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
