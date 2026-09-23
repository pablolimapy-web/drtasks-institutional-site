"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "./Icons";
import { getNextTabIndex } from "@/lib/accessibility";
import { productPillars } from "@/lib/productArchitecture";
import styles from "./ProductPillars.module.css";

const ROTATION_MS = 6800;

export function ProductPillars() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [desktopExperienceEnabled, setDesktopExperienceEnabled] = useState(false);
  const reducedMotion = useReducedMotion();
  const active = productPillars[activeIndex];
  const paused = manualPaused || interactionPaused;


  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(index, productPillars.length, event.key);
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  useEffect(() => {
    const media = window.matchMedia("(min-width: 961px)");
    const sync = () => setDesktopExperienceEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!desktopExperienceEnabled || paused || reducedMotion) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % productPillars.length);
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, desktopExperienceEnabled, paused, reducedMotion]);

  return (
    <section className={styles.section} id="produto">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">Produto conectado</span>
            <h2>Cinco pilares. Um mesmo contexto operacional.</h2>
          </div>
          <div className={styles.headingAside}>
            <p>
              A Home mostra o essencial. Cada pilar tem uma página própria para aprofundar como o Dr. Tasks organiza execução, informação e decisão.
            </p>
            <button
              type="button"
              className={styles.pauseButton}
              aria-pressed={manualPaused}
              disabled={Boolean(reducedMotion)}
              onClick={() => setManualPaused((value) => !value)}
            >
              {reducedMotion ? "Movimento reduzido" : manualPaused ? "Retomar rotação" : "Pausar rotação"}
            </button>
          </div>
        </div>

        <div
          className={styles.desktopExperience}
          onMouseEnter={() => setInteractionPaused(true)}
          onMouseLeave={() => setInteractionPaused(false)}
          onFocusCapture={() => setInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteractionPaused(false);
          }}
        >
          <div className={styles.rail} role="tablist" aria-label="Pilares do Dr. Tasks">
            {productPillars.map((pillar, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  type="button"
                  id={`pillar-tab-${pillar.id}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`pillar-panel-${pillar.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={`${styles.railItem} ${selected ? styles.activeRailItem : ""}`}
                  key={pillar.id}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.railCopy}>
                    <strong>{pillar.label}</strong>
                    <small>{pillar.summary}</small>
                  </span>
                  <span className={styles.railMarker} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div
            className={styles.stage}
            id={`pillar-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`pillar-tab-${active.id}`}
          >
            <div className={styles.visualColumn}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className={styles.imageFrame}
                  initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={active.image}
                    alt={active.imageAlt}
                    width={1851}
                    height={926}
                    sizes="(max-width: 1200px) 62vw, 820px"
                    className={styles.image}
                  />
                  <span className={styles.demoBadge}>Interface real · dados protegidos quando necessário</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.aside
                key={active.id}
                className={styles.detail}
                initial={reducedMotion ? false : { opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -10 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className={styles.detailEyebrow}>{active.eyebrow}</span>
                <h3>{active.headline}</h3>
                <p>{active.description}</p>
                <div className={styles.moduleList} aria-label={`Recursos de ${active.label}`}>
                  {active.modules.map((module) => <span key={module}>{module}</span>)}
                </div>
                <Link href={active.href} className={styles.moreLink}>
                  Saiba mais sobre {active.label} <ArrowRightIcon />
                </Link>
              </motion.aside>
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.mobileGrid}>
          {productPillars.map((pillar, index) => (
            <article className={styles.mobileCard} key={pillar.id}>
              <div className={styles.mobileCardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{pillar.eyebrow}</small>
              </div>
              <h3>{pillar.headline}</h3>
              <p>{pillar.description}</p>
              <div className={styles.mobileImageFrame}>
                <Image src={pillar.image} alt={pillar.imageAlt} width={1851} height={926} sizes="100vw" />
              </div>
              <div className={styles.moduleList}>
                {pillar.modules.map((module) => <span key={module}>{module}</span>)}
              </div>
              <Link href={pillar.href} className={styles.moreLink}>
                Saiba mais <ArrowRightIcon />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
