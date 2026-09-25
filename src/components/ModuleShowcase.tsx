"use client";

import Link from "next/link";
import { animated, to, useSpring } from "@react-spring/web";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CardSwap, { Card, type CardSwapHandle } from "./react-bits/CardSwap";
import { ProductPreview } from "./ProductPreview";
import { ProjectsModuleDemo } from "./product-showcase/ProjectsModuleDemo";
import { FinanceModuleDemo } from "./product-showcase/FinanceModuleDemo";
import { TimeModuleDemo } from "./product-showcase/TimeModuleDemo";
import { LocationModuleDemo } from "./product-showcase/LocationModuleDemo";
import { ModuleIntroScene } from "./module-showcase/ModuleIntroScene";
import {
  moduleShowcaseModules,
  type ModuleShowcaseId,
  type ModuleShowcaseModule,
} from "@/lib/moduleShowcase";
import styles from "./ModuleShowcase.module.css";

const MODULE_ROTATION_DELAY_MS = 12400;
const CINEMATIC_INTRO_MS = 2200;

function ActiveDemo({
  id,
  paused,
  reducedMotion,
}: {
  id: ModuleShowcaseId;
  paused: boolean;
  reducedMotion: boolean;
}) {
  if (id === "fluxos") return <ProductPreview mode="showcase" paused={paused} />;
  if (id === "projects") return <ProjectsModuleDemo paused={paused} reducedMotion={reducedMotion} loop={false} />;
  if (id === "finance") return <FinanceModuleDemo paused={paused} reducedMotion={reducedMotion} loop={false} />;
  if (id === "team") return <TimeModuleDemo paused={paused} reducedMotion={reducedMotion} loop={false} />;
  return <LocationModuleDemo paused={paused} reducedMotion={reducedMotion} loop={false} />;
}

function SharedModuleCopy({
  module,
  onNext,
  reducedMotion,
}: {
  module: ModuleShowcaseModule;
  onNext: () => void;
  reducedMotion: boolean;
}) {
  const headlineWords = module.headline.split(/\s+/);

  return (
    <>
      <motion.div
        className={styles.moduleLabel}
        initial={reducedMotion ? false : { opacity: 0, x: -16, filter: "blur(5px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.52, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        {module.label}
      </motion.div>

      <h2 className={styles.cinematicHeadline}>
        {headlineWords.map((word, index) => (
          <span className={styles.headlineMask} key={`${word}-${index}`}>
            <motion.span
              className={styles.headlineWord}
              initial={reducedMotion ? false : { y: "112%", opacity: 0, filter: "blur(9px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.68, delay: 0.18 + index * 0.045, ease: [0.16, 1, 0.3, 1] }
              }
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        className={`${styles.description} ${styles.copyDescription}`}
        initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.62, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        {module.description}
      </motion.p>

      <motion.div
        className={`${styles.actions} ${styles.copyActions}`}
        initial={reducedMotion ? false : { opacity: 0, y: 14, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.56, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        <button type="button" className={styles.nextButton} onClick={onNext}>
          Próxima interface <span aria-hidden="true">→</span>
        </button>

        <Link href={`#${module.anchor}`} className={styles.productLink}>
          Conhecer {module.label} <span aria-hidden="true">↓</span>
        </Link>
      </motion.div>
    </>
  );
}

export function ModuleShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const stageInView = useInView(sectionRef, { amount: 0.2 });
  const reducedMotion = Boolean(useReducedMotion());
  const active = moduleShowcaseModules[activeIndex] ?? moduleShowcaseModules[0];
  const presentationPaused = !stageInView;

  useEffect(() => {
    if (reducedMotion) {
      setIntroReady(true);
      return;
    }

    if (!stageInView) {
      setIntroReady(false);
      return;
    }

    setIntroReady(false);
    const timeout = window.setTimeout(() => setIntroReady(true), CINEMATIC_INTRO_MS);
    return () => window.clearTimeout(timeout);
  }, [active.id, reducedMotion, stageInView]);

  const handleActiveChange = (index: number) => {
    if (!moduleShowcaseModules[index]) return;
    setActiveIndex(index);
  };

  const productEntrance = useSpring({
    from: { opacity: 0, y: reducedMotion ? 0 : 34, scale: reducedMotion ? 1 : 0.974 },
    to: {
      opacity: stageInView ? 1 : 0,
      y: stageInView || reducedMotion ? 0 : 34,
      scale: stageInView || reducedMotion ? 1 : 0.974,
    },
    immediate: reducedMotion,
    config: { mass: 1, tension: 165, friction: 24 },
  });

  return (
    <section className={`${styles.section} product-showcase-section section`} aria-label="Módulos do Dr. Tasks">
      <div className={styles.ambient} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div
          ref={sectionRef}
          className={styles.presentationStage}
          data-module={active.id}
        >
          <div className={styles.stageTexture} aria-hidden="true" />
          <AnimatePresence initial={false}>
            {(stageInView || reducedMotion) && (
              <motion.div
                key={`aura-${active.id}`}
                className={styles.cinematicAura}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.72, x: 70, y: -24 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 1.08, x: -30 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <aside className={styles.stageCopy} aria-label="Explicação do módulo em destaque">
            <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
              <AnimatePresence initial={false} mode="wait">
                {(stageInView || reducedMotion) && (
                  <motion.div
                    key={active.id}
                    className={styles.copyMotion}
                    initial={reducedMotion ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(5px)" }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SharedModuleCopy
                      module={active}
                      onNext={() => cardSwapRef.current?.next()}
                      reducedMotion={reducedMotion}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          <div className={styles.stageIndex} aria-hidden="true">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <i />
            <span>{String(moduleShowcaseModules.length).padStart(2, "0")}</span>
          </div>

          <animated.div
            className={styles.stageProduct}
            style={{
              opacity: productEntrance.opacity,
              transform: to(
                [productEntrance.y, productEntrance.scale],
                (y, scale) => `translate3d(0, ${y}px, 0) scale(${scale})`,
              ),
            }}
          >
            <div
              className={styles.swapStage}
              onMouseEnter={() => setDeckHovered(true)}
              onMouseLeave={() => setDeckHovered(false)}
            >
              <CardSwap
                ref={cardSwapRef}
                width="86%"
                height="72%"
                cardDistance={18}
                verticalDistance={20}
                delay={MODULE_ROTATION_DELAY_MS}
                pauseOnHover
                skewAmount={1}
                easing="focus"
                paused={presentationPaused}
                reducedMotion={reducedMotion}
                onActiveChange={handleActiveChange}
              >
                {moduleShowcaseModules.map((module) => {
                  const isActive = module.id === active.id;
                  return (
                    <Card key={module.id} aria-label={module.ariaLabel}>
                      <div className={styles.demoViewport}>
                        {isActive && (stageInView || reducedMotion) ? (
                          <>
                            <AnimatePresence mode="wait">
                              {!introReady && !reducedMotion && (
                                <ModuleIntroScene
                                  key={`intro-${module.id}-${activeIndex}`}
                                  id={module.id}
                                  paused={presentationPaused || deckHovered}
                                  reducedMotion={reducedMotion}
                                />
                              )}
                            </AnimatePresence>

                            {introReady && (
                              <motion.div
                                key={`demo-${module.id}-${activeIndex}`}
                                className={styles.demoReveal}
                                initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.972, filter: "blur(12px) saturate(.9)" }}
                                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px) saturate(1)" }}
                                transition={reducedMotion ? { duration: 0 } : { duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <ActiveDemo
                                  id={module.id}
                                  paused={presentationPaused || deckHovered || !introReady}
                                  reducedMotion={reducedMotion}
                                />
                                <span className={styles.interfaceEdgeGlow} aria-hidden="true" />
                              </motion.div>
                            )}
                          </>
                        ) : (
                          <ActiveDemo id={module.id} paused reducedMotion={reducedMotion} />
                        )}
                      </div>
                    </Card>
                  );
                })}
              </CardSwap>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
