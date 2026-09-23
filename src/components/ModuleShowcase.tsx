"use client";

import Link from "next/link";
import { animated, to, useSpring } from "@react-spring/web";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import CardSwap, { Card, type CardSwapHandle } from "./react-bits/CardSwap";
import { ProductPreview } from "./ProductPreview";
import { ProjectsModuleDemo } from "./product-showcase/ProjectsModuleDemo";
import { FinanceModuleDemo } from "./product-showcase/FinanceModuleDemo";
import { TimeModuleDemo } from "./product-showcase/TimeModuleDemo";
import { LocationModuleDemo } from "./product-showcase/LocationModuleDemo";
import {
  moduleShowcaseModules,
  type ModuleShowcaseId,
  type ModuleShowcaseModule,
} from "@/lib/moduleShowcase";
import styles from "./ModuleShowcase.module.css";

const MODULE_ROTATION_DELAY_MS = 3500;

function ActiveDemo({
  id,
  paused,
  reducedMotion,
  loop,
}: {
  id: ModuleShowcaseId;
  paused: boolean;
  reducedMotion: boolean;
  loop: boolean;
}) {
  if (id === "fluxos") return <ProductPreview mode="showcase" paused={paused} />;
  if (id === "projects") return <ProjectsModuleDemo paused={paused} reducedMotion={reducedMotion} loop={loop} />;
  if (id === "finance") return <FinanceModuleDemo paused={paused} reducedMotion={reducedMotion} loop={loop} />;
  if (id === "team") return <TimeModuleDemo paused={paused} reducedMotion={reducedMotion} loop={loop} />;
  return <LocationModuleDemo paused={paused} reducedMotion={reducedMotion} loop={loop} />;
}

function SharedModuleCopy({
  module,
  onNext,
}: {
  module: ModuleShowcaseModule;
  onNext: () => void;
}) {
  return (
    <>
      <div className={styles.moduleLabel}>{module.label}</div>

      <h2>{module.headline}</h2>

      <p className={styles.description}>{module.description}</p>

      <div className={styles.actions}>
        <button type="button" className={styles.nextButton} onClick={onNext}>
          Próxima interface <span aria-hidden="true">→</span>
        </button>

        <Link href={`#${module.anchor}`} className={styles.productLink}>
          Conhecer {module.label} <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </>
  );
}

export function ModuleShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [deckHovered, setDeckHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardSwapRef = useRef<CardSwapHandle>(null);
  const stageInView = useInView(sectionRef, { amount: 0.22 });
  const reducedMotion = Boolean(useReducedMotion());
  const active = moduleShowcaseModules[activeIndex] ?? moduleShowcaseModules[0];
  const presentationPaused = !stageInView;

  const handleActiveChange = (index: number) => {
    if (!moduleShowcaseModules[index]) return;
    setActiveIndex(index);
  };

  const deckEntrance = useSpring({
    from: { opacity: 0, y: reducedMotion ? 0 : 28, scale: reducedMotion ? 1 : 0.978 },
    to: {
      opacity: stageInView ? 1 : 0,
      y: stageInView || reducedMotion ? 0 : 28,
      scale: stageInView || reducedMotion ? 1 : 0.978,
    },
    immediate: reducedMotion,
    config: { mass: 1, tension: 170, friction: 25 },
  });

  return (
    <section className={`${styles.section} product-showcase-section section`} aria-label="Módulos do Dr. Tasks">
      <div className={styles.ambient} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.showcaseGrid} ref={sectionRef}>
          <aside className={styles.copyColumn} aria-label="Explicação do módulo em destaque">
            <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
              <AnimatePresence initial={false} mode="wait">
                {(stageInView || reducedMotion) && (
                  <motion.div
                    key={active.id}
                    className={styles.copyMotion}
                    initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    <SharedModuleCopy
                      module={active}
                      onNext={() => cardSwapRef.current?.next()}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          <animated.div
            className={styles.deckColumn}
            style={{
              opacity: deckEntrance.opacity,
              transform: to(
                [deckEntrance.y, deckEntrance.scale],
                (y, scale) => `translate3d(0, ${y}px, 0) scale(${scale})`,
              ),
            }}
          >
            <div
              className={styles.swapStage}
              onMouseEnter={() => setDeckHovered(true)}
              onMouseLeave={() => setDeckHovered(false)}
            >
              <Link
                href={`#${active.anchor}`}
                className={styles.stageJumpLink}
                aria-label={`Ver resumo de ${active.label} nesta página`}
              >
                Ver módulo <span aria-hidden="true">↓</span>
              </Link>

              <CardSwap
                ref={cardSwapRef}
                width="96%"
                height="82%"
                cardDistance={74}
                verticalDistance={76}
                delay={MODULE_ROTATION_DELAY_MS}
                pauseOnHover
                skewAmount={6}
                easing="elastic"
                paused={presentationPaused}
                reducedMotion={reducedMotion}
                onActiveChange={handleActiveChange}
              >
                {moduleShowcaseModules.map((module) => (
                  <Card key={module.id} aria-label={module.ariaLabel}>
                    <div className={styles.demoViewport}>
                      <ActiveDemo
                        id={module.id}
                        paused={presentationPaused || module.id !== active.id}
                        reducedMotion={reducedMotion}
                        loop={deckHovered && module.id === active.id}
                      />
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
