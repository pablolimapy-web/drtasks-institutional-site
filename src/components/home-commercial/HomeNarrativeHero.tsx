"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { primaryCta } from "@/lib/commercial";
import { homeHeroNarrative } from "@/lib/homeCommercialNarrative";
import { useHeroMotionQuality } from "@/lib/heroMotionQuality";
import { ProductPreview } from "@/components/ProductPreview";
import { HeroLightRibbons } from "@/components/HeroLightRibbons";
import { ArrowRightIcon } from "@/components/Icons";
import styles from "./HomeNarrativeHero.module.css";

export function HomeNarrativeHero() {
  const [motionPaused, setMotionPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { amount: 0.08 });
  const productInView = useInView(productRef, { amount: 0.14 });
  const motionQuality = useHeroMotionQuality(heroInView && !Boolean(reducedMotion));
  const backgroundPaused = motionPaused || !heroInView || Boolean(reducedMotion);
  const productPaused = motionPaused || !productInView || Boolean(reducedMotion);

  return (
    <section ref={heroRef} id="inicio" className={styles.hero}>
      <HeroLightRibbons paused={backgroundPaused} quality={motionQuality} tone="dark" />
      <div className={styles.heroWash} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1>{homeHeroNarrative.title}</h1>
          <p>{homeHeroNarrative.description}</p>

          <div className={styles.actions}>
            <Link className={styles.primary} href={primaryCta.href} data-eva-trigger="hero">
              Falar ao vivo com especialista<ArrowRightIcon />
            </Link>
            <Link className={styles.secondary} href={homeHeroNarrative.secondaryHref} aria-label={homeHeroNarrative.secondaryLabel}>
              {homeHeroNarrative.secondaryLabel}<span>↓</span>
            </Link>
          </div>

          <button
            type="button"
            className={styles.motionToggle}
            aria-pressed={motionPaused}
            onClick={() => setMotionPaused((value) => !value)}
          >
            <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
            {motionPaused ? "Retomar movimento" : "Pausar movimento"}
          </button>
        </div>

        <div className={styles.stage} ref={productRef}>
          <div className={styles.stageAura} aria-hidden="true" />
          <ProductPreview mode="hero" paused={productPaused} motionQuality={motionQuality} />
        </div>
      </div>
    </section>
  );
}
