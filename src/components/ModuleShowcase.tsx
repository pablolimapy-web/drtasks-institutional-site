"use client";

import Link from "next/link";
import { animated, to, useSpring, useTrail, useTransition } from "@react-spring/web";
import { useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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
  if (id === "projects") return <ProjectsModuleDemo paused={paused} reducedMotion={reducedMotion} />;
  if (id === "finance") return <FinanceModuleDemo paused={paused} reducedMotion={reducedMotion} />;
  if (id === "team") return <TimeModuleDemo paused={paused} reducedMotion={reducedMotion} />;
  return <LocationModuleDemo paused={paused} reducedMotion={reducedMotion} />;
}

function AnimatedModuleCopy({
  module,
  reducedMotion,
  onNext,
}: {
  module: ModuleShowcaseModule;
  reducedMotion: boolean;
  onNext: () => void;
}) {
  const trail = useTrail(4, {
    from: { opacity: 0, y: reducedMotion ? 0 : 18 },
    to: { opacity: 1, y: 0 },
    immediate: reducedMotion,
    config: { mass: 0.82, tension: 250, friction: 24 },
  });

  const motionStyle = (index: number) => ({
    opacity: trail[index].opacity,
    transform: trail[index].y.to((value) => `translate3d(0, ${value}px, 0)`),
  });

  return (
    <>
      <animated.div className={styles.moduleLabel} style={motionStyle(0)}>
        {module.label}
      </animated.div>

      <animated.h2 style={motionStyle(1)}>{module.headline}</animated.h2>

      <animated.p className={styles.description} style={motionStyle(2)}>
        {module.description}
      </animated.p>

      <animated.div className={styles.actions} style={motionStyle(3)}>
        <button type="button" className={styles.nextButton} onClick={onNext}>
          Próxima interface <span aria-hidden="true">→</span>
        </button>

        <Link href={module.href} className={styles.productLink}>
          Conhecer {module.label}
        </Link>
      </animated.div>
    </>
  );
}

export function ModuleShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const transitionItems = stageInView || reducedMotion ? [active] : [];

  const copyTransitions = useTransition(transitionItems, {
    keys: (module) => module.id,
    from: {
      opacity: 0,
      y: reducedMotion ? 0 : 18,
      scale: reducedMotion ? 1 : 0.992,
      filter: reducedMotion ? "blur(0px)" : "blur(6px)",
    },
    enter: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    leave: {
      opacity: 0,
      y: reducedMotion ? 0 : -12,
      scale: reducedMotion ? 1 : 0.996,
      filter: reducedMotion ? "blur(0px)" : "blur(4px)",
    },
    immediate: reducedMotion,
    config: { mass: 0.9, tension: 250, friction: 26 },
  });

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

  const [deckParallax, deckParallaxApi] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    config: { mass: 0.68, tension: 150, friction: 24 },
  }));

  const handleDeckPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;

    deckParallaxApi.start({
      x: offsetX * 7,
      y: offsetY * 5,
      rotateX: offsetY * -1.2,
      rotateY: offsetX * 1.5,
    });
  };

  const handleDeckPointerLeave = () => {
    deckParallaxApi.start({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      className={`${styles.section} product-showcase-section section`}
      aria-label="Módulos do Dr. Tasks"
      data-active-module={active.id}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.showcaseGrid} ref={sectionRef}>
          <aside className={styles.copyColumn} aria-label="Explicação do módulo em destaque">
            <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">
              {copyTransitions((springStyle, module) => (
                <animated.div
                  className={styles.copyMotion}
                  style={{
                    opacity: springStyle.opacity,
                    filter: springStyle.filter,
                    transform: to(
                      [springStyle.y, springStyle.scale],
                      (y, scale) => `translate3d(0, ${y}px, 0) scale(${scale})`,
                    ),
                  }}
                >
                  <AnimatedModuleCopy
                    module={module}
                    reducedMotion={reducedMotion}
                    onNext={() => cardSwapRef.current?.next()}
                  />
                </animated.div>
              ))}
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
            onPointerMove={handleDeckPointerMove}
            onPointerLeave={handleDeckPointerLeave}
          >
            <div className={styles.deckFloat}>
              <animated.div
                className={styles.deckParallax}
                style={{
                  transform: to(
                    [deckParallax.x, deckParallax.y, deckParallax.rotateX, deckParallax.rotateY],
                    (x, y, rotateX, rotateY) =>
                      `translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  ),
                }}
              >
                <div className={styles.swapStage}>
                  <CardSwap
                    ref={cardSwapRef}
                    cardDistance={60}
                    verticalDistance={70}
                    delay={0}
                    pauseOnHover={false}
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
                          />
                        </div>
                      </Card>
                    ))}
                  </CardSwap>
                </div>
              </animated.div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
