"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRightIcon } from "./Icons";
import { ProductPreview } from "./ProductPreview";
import RotatingText from "./motion/RotatingText";
import Beams from "./motion/Beams";
import {
  commercialPositioning,
  primaryCta,
  secondaryCta,
} from "@/lib/commercial";
import { heroRotatingCopy } from "@/lib/heroCommercialRotating";
import styles from "./HeroCommercialRotating.module.css";


export function HeroCommercial() {
  const [activePhrase, setActivePhrase] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const productStageRef = useRef<HTMLDivElement>(null);
  const productInView = useInView(productStageRef, { amount: 0.12 });
  const showStaticProduct = Boolean(reducedMotion) || motionPaused || !productInView;

  return (
      <section
          className={`hero section hero-commercial ${styles.heroSection}`}
          id="inicio"
      >
        <div className={styles.heroBackdrop} aria-hidden="true">
          <span className={`${styles.backdropOrb} ${styles.backdropOrbOne}`} />
          <span className={`${styles.backdropOrb} ${styles.backdropOrbTwo}`} />
        </div>
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-beams-reactbits" aria-hidden="true">
          {!motionPaused && !reducedMotion && productInView ? (
            <Beams
              beamWidth={1.05}
              beamHeight={18}
              beamNumber={8}
              lightColor="#b9d0ff"
              beamColor="#dce8ff"
              backgroundColor="#f9fbff"
              speed={1.35}
              noiseIntensity={0.78}
              scale={0.14}
              rotation={-24}
            />
          ) : null}
        </div>
        <div className="hero-beams-shade" aria-hidden="true" />

        <div className="container hero-inner">
          <div className="hero-main">
            <div className="hero-copy hero-enter">
              <div className={styles.copyContent}>
              <h1 className={styles.title}>
              <span className={styles.titleStatic}>
                {heroRotatingCopy.staticTitle}
              </span>

                <RotatingText
                    texts={[...heroRotatingCopy.phrases]}
                    mainClassName={styles.rotatingText}
                    splitLevelClassName={styles.rotatingWord}
                    elementLevelClassName={styles.rotatingChar}
                    staggerFrom="last"
                    initial={{
                      y: "105%",
                      opacity: 0,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      y: "-105%",
                      opacity: 0,
                      filter: "blur(5px)",
                    }}
                    staggerDuration={0.012}
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 410,
                    }}
                    rotationInterval={3200}
                    auto={!motionPaused && !reducedMotion}
                    onNext={setActivePhrase}
                />
              </h1>

              <p className={styles.description}>
                {commercialPositioning.heroDescription}
              </p>

              <div className="hero-actions">
                <Link href={primaryCta.href} className="button button-primary">
                  {primaryCta.label}
                  <ArrowRightIcon />
                </Link>

                <a href={secondaryCta.href} className="button button-secondary">
                  {secondaryCta.label}
                </a>
              </div>

              <button
                type="button"
                className="hero-motion-toggle"
                aria-pressed={motionPaused}
                onClick={() => setMotionPaused((value) => !value)}
              >
                <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
                {motionPaused ? "Retomar animações" : "Pausar animações"}
              </button>
              </div>
            </div>

            <div className="hero-product hero-enter hero-enter-last">
              <div className="hero-product-stage" ref={productStageRef}>
                {showStaticProduct ? (
                  <div className="hero-product-static" role="img" aria-label="Tela do FluxOS do Dr. Tasks">
                    <Image
                      src="/hero/fluxos-dashboard-hero.png"
                      alt=""
                      width={1846}
                      height={923}
                      sizes="(max-width: 1000px) 96vw, 58vw"
                      className="hero-product-static-image"
                    />
                  </div>
                ) : (
                  <ProductPreview phaseIndex={activePhrase} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
