"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChartIcon, HistoryIcon, LayersIcon, UsersIcon, WorkflowIcon } from "./Icons";

const items = [
  {
    icon: WorkflowIcon,
    title: "FluxOS",
    description: "Etapas, contexto e próximos passos em uma visão viva.",
  },
  {
    icon: LayersIcon,
    title: "Projetos e operações",
    description: "Da entrada à conclusão, tudo conectado no mesmo ambiente.",
  },
  {
    icon: UsersIcon,
    title: "Equipe e responsáveis",
    description: "Saiba quem faz o quê sem depender de planilhas paralelas.",
  },
  {
    icon: ChartIcon,
    title: "Indicadores práticos",
    description: "Monitore bloqueios, andamento e sinais antes do atraso.",
  },
  {
    icon: HistoryIcon,
    title: "Histórico preservado",
    description: "O registro do fluxo fica acessível para consulta e revisão.",
  },
];

export function HeroCapabilityBand() {
  const reducedMotion = useReducedMotion();
  const repeatedItems = [...items, ...items];

  return (
    <section className="hero-band-section" aria-label="Ambientes conectados do Dr. Tasks">
      <div className="hero-band-intro container">
      </div>

      <div className="hero-band-marquee">
        <div className={`hero-band-track ${reducedMotion ? "is-static" : ""}`}>
          {repeatedItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="hero-band-card"
                key={`${item.title}-${index}`}
                animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
                transition={reducedMotion ? undefined : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: (index % items.length) * 0.18 }}
              >
                <div className="hero-band-icon-wrap">
                  <motion.span
                    className="hero-band-icon-orb"
                    animate={reducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={reducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: (index % items.length) * 0.14 }}
                  />
                  <Icon className="hero-band-icon" />
                </div>
                <div className="hero-band-card-copy">
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
