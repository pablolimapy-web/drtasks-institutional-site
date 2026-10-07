"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRightIcon } from "./Icons";
import { ProductPreview } from "./ProductPreview";
import RotatingText from "./motion/RotatingText";
import { HeroLightRibbons } from "./HeroLightRibbons";
import {
  commercialPositioning,
  primaryCta,
  secondaryCta,
} from "@/lib/commercial";
import { heroRotatingCopy } from "@/lib/heroCommercialRotating";
import { useHeroMotionQuality } from "@/lib/heroMotionQuality";
import styles from "./HeroCommercialRotating.module.css";


export function HeroCommercial() {
  const [activePhrase, setActivePhrase] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const productStageRef = useRef<HTMLDivElement>(null);
  const productInView = useInView(productStageRef, { amount: 0.12 });
  const showStaticProduct = Boolean(reducedMotion);
  const motionQuality = useHeroMotionQuality(productInView && !Boolean(reducedMotion));
  const useFullTextBlur = motionQuality === "full";

  return (
      <section
          className={`hero section hero-commercial ${styles.heroSection}`}
          id="inicio"
          data-motion-quality={motionQuality}
      >
        <HeroLightRibbons paused={motionPaused || !productInView} quality={motionQuality} />

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
                      ...(useFullTextBlur ? { filter: "blur(5px)" } : {}),
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      ...(useFullTextBlur ? { filter: "blur(0px)" } : {}),
                    }}
                    exit={{
                      y: "-105%",
                      opacity: 0,
                      ...(useFullTextBlur ? { filter: "blur(5px)" } : {}),
                    }}
                    staggerDuration={0.012}
                    transition={{
                      type: "tween",
                      duration: 0.64,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    rotationInterval={3200}
                    auto={!motionPaused && !reducedMotion && productInView}
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
                  <ProductPreview phaseIndex={activePhrase} paused={motionPaused || !productInView} motionQuality={motionQuality} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
