"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "./Icons";
import { ProductPreview } from "./ProductPreview";
import RotatingText from "./motion/RotatingText";
import {
  commercialPositioning,
  primaryCta,
  secondaryCta,
} from "@/lib/commercial";
import { heroRotatingCopy } from "@/lib/heroCommercialRotating";
import styles from "./HeroCommercialRotating.module.css";

export function HeroCommercial() {
  const [activePhrase, setActivePhrase] = useState(0);

  return (
      <section
          className={`hero section hero-commercial ${styles.heroSection}`}
          id="inicio"
      >
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="container hero-inner">
          <div className="hero-main">
            <div className="hero-copy hero-enter">
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
