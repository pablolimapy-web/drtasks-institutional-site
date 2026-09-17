"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "./Icons";
import { ProductPreview } from "./ProductPreview";
import RotatingText from "./motion/RotatingText";

const rotatingPhrases = [
  "quem é responsável.",
  "o que já avançou.",
  "o próximo passo.",
  "o que está bloqueado.",
];


export function Hero() {
  const [activePhrase, setActivePhrase] = useState(0);

  return (
    <section className="hero section" id="inicio">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="container hero-inner">
        <div className="hero-main">
          <div className="hero-copy hero-enter">
            <h1 className="sr-only">O trabalho avança quando todos sabem quem é responsável.</h1>
            <div className="hero-display-title" aria-hidden="true">
              <span>O trabalho avança quando todos sabem</span>
              <RotatingText
                texts={rotatingPhrases}
                mainClassName="hero-rotating-text"
                splitLevelClassName="hero-rotating-word"
                elementLevelClassName="hero-rotating-char"
                staggerFrom="last"
                initial={{ y: "115%", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-120%", opacity: 0, filter: "blur(6px)" }}
                staggerDuration={0.018}
                transition={{ type: "spring", damping: 30, stiffness: 420 }}
                rotationInterval={2700}
                onNext={setActivePhrase}
              />
            </div>
            <p>Organize tarefas, responsáveis, etapas e projetos em um fluxo claro.</p>
            <div className="hero-actions">
              <Link href="/teste-gratis" className="button button-primary">Testar grátis por 14 dias <ArrowRightIcon /></Link>
              <a href="#fluxos" className="button button-secondary">Ver o FluxOS</a>
            </div>
          </div>

          <div className="hero-product hero-enter hero-enter-last">
            <div className="hero-product-stage">
              <ProductPreview phaseIndex={activePhrase} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
