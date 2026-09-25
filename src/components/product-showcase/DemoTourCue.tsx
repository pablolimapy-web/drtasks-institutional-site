"use client";

import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import styles from "./DemoTourCue.module.css";

export type DemoCueMetric = {
  label: string;
  value: string;
};

export type DemoCuePlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "right-center" | "left-center" | "bottom-center";
export type DemoCueModule = "projects" | "finance" | "time" | "resources";

export type DemoTourBlock =
  | {
      variant: "progress";
      eyebrow?: string;
      title: string;
      progress?: number;
      meta?: string;
      icon?: string;
    }
  | {
      variant: "metric";
      eyebrow?: string;
      title: string;
      value: string;
      meta?: string;
      icon?: string;
    }
  | {
      variant: "split";
      eyebrow?: string;
      icon?: string;
      left: DemoCueMetric;
      right: DemoCueMetric;
      meta?: string;
    }
  | {
      variant: "checklist";
      eyebrow?: string;
      title: string;
      icon?: string;
      items: { label: string; state?: "done" | "active" | "idle" }[];
    }
  | {
      variant: "context";
      eyebrow?: string;
      title: string;
      icon?: string;
      description?: string;
      metrics?: DemoCueMetric[];
    };

export type DemoTourStep = {
  label: string;
  left: string;
  top: string;
  click?: boolean;
  placement?: DemoCuePlacement;
  block?: DemoTourBlock;
};

function ProjectSignal({ sceneIndex }: { sceneIndex: number }) {
  const health = [72, 58, 64, 38, 76][sceneIndex] ?? 58;
  return (
    <div className={styles.healthBar} aria-hidden="true">
      <div><span>Saúde do projeto</span><b>{health}%</b></div>
      <span className={styles.healthTrack}><i style={{ width: `${health}%` }} /></span>
    </div>
  );
}

function FinanceSignal({ sceneIndex }: { sceneIndex: number }) {
  const paths = [
    "M3 23 C12 20, 18 21, 26 16 S43 9, 52 13 S68 7, 77 8",
    "M3 22 C11 18, 18 20, 25 14 S40 12, 49 9 S65 13, 77 5",
    "M3 24 C13 19, 20 22, 29 17 S46 10, 55 12 S67 8, 77 7",
    "M3 23 C14 21, 19 16, 28 18 S43 13, 52 10 S69 10, 77 4",
    "M3 24 C13 21, 22 19, 31 15 S48 14, 56 9 S70 7, 77 3",
  ];
  return (
    <div className={styles.sparkline} aria-hidden="true">
      <span>Leitura do período</span>
      <svg viewBox="0 0 80 28" preserveAspectRatio="none">
        <path className={styles.sparklineBase} d="M3 24H77" />
        <path className={styles.sparklinePath} d={paths[sceneIndex] ?? paths[0]} />
        <circle cx="77" cy={sceneIndex === 4 ? 3 : 8} r="2.2" />
      </svg>
    </div>
  );
}

function TimeSignal({ sceneIndex }: { sceneIndex: number }) {
  const gauge = [42, 56, 67, 76, 88][sceneIndex] ?? 67;
  const style = { "--ring-progress": `${gauge * 3.6}deg` } as CSSProperties;
  return (
    <div className={styles.ringGauge} style={style} aria-hidden="true">
      <span className={styles.ringVisual}><i>{gauge}%</i></span>
      <span><b>Capacidade</b><small>tempo aproveitado</small></span>
    </div>
  );
}

function ResourceSignal({ sceneIndex }: { sceneIndex: number }) {
  return (
    <div className={styles.routeVisual} data-route-scene={sceneIndex} aria-hidden="true">
      <span>Rota operacional</span>
      <svg viewBox="0 0 104 34" preserveAspectRatio="none">
        <path className={styles.routeShadow} d="M4 25 C20 7, 34 30, 52 15 S80 7, 100 17" />
        <path className={styles.routePath} d="M4 25 C20 7, 34 30, 52 15 S80 7, 100 17" />
        <circle cx="4" cy="25" r="3" />
        <circle className={styles.routeDestination} cx="100" cy="17" r="3.4" />
      </svg>
    </div>
  );
}

function ModuleSignal({ module, sceneIndex }: { module: DemoCueModule; sceneIndex: number }) {
  if (module === "projects") return <ProjectSignal sceneIndex={sceneIndex} />;
  if (module === "finance") return <FinanceSignal sceneIndex={sceneIndex} />;
  if (module === "time") return <TimeSignal sceneIndex={sceneIndex} />;
  return <ResourceSignal sceneIndex={sceneIndex} />;
}

function CueBlock({
  block,
  progress,
  reducedMotion,
  sceneIndex,
  module,
}: {
  block: DemoTourBlock;
  progress: number;
  reducedMotion: boolean;
  sceneIndex: number;
  module: DemoCueModule;
}) {
  const signal = <ModuleSignal module={module} sceneIndex={sceneIndex} />;

  switch (block.variant) {
    case "progress": {
      const style = { "--tour-progress": `${block.progress ?? progress}%` } as CSSProperties;
      return (
        <div className={`${styles.cueCard} ${styles.progressCard}`} style={style} data-variant="progress">
          <span className={styles.cardIcon}>{block.icon ?? "◇"}</span>
          <div className={styles.cardBody}>
            {block.eyebrow ? <span className={styles.cardEyebrow}>{block.eyebrow}</span> : null}
            <AnimatePresence mode="wait" initial={false}>
              <motion.strong
                key={`${sceneIndex}-${block.title}`}
                initial={reducedMotion ? false : { opacity: 0, y: 5, filter: "blur(3px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -4, filter: "blur(2px)" }}
                transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {block.title}
              </motion.strong>
            </AnimatePresence>
            {block.meta ? <span className={styles.cardMeta}>{block.meta}</span> : null}
            <span className={styles.progressTrack}><i /></span>
            {signal}
          </div>
        </div>
      );
    }
    case "metric":
      return (
        <div className={`${styles.cueCard} ${styles.metricCard}`} data-variant="metric">
          <span className={styles.cardIcon}>{block.icon ?? "◌"}</span>
          <div className={styles.cardBody}>
            {block.eyebrow ? <span className={styles.cardEyebrow}>{block.eyebrow}</span> : null}
            <strong>{block.title}</strong>
            <div className={styles.metricValue}>{block.value}</div>
            {block.meta ? <span className={styles.cardMeta}>{block.meta}</span> : null}
            {signal}
          </div>
        </div>
      );
    case "split":
      return (
        <div className={`${styles.cueCard} ${styles.splitCard}`} data-variant="split">
          <span className={styles.cardIcon}>{block.icon ?? "◫"}</span>
          <div className={styles.cardBody}>
            {block.eyebrow ? <span className={styles.cardEyebrow}>{block.eyebrow}</span> : null}
            <div className={styles.splitGrid}>
              <div><span>{block.left.label}</span><strong>{block.left.value}</strong></div>
              <div><span>{block.right.label}</span><strong>{block.right.value}</strong></div>
            </div>
            {block.meta ? <span className={styles.cardMeta}>{block.meta}</span> : null}
            {signal}
          </div>
        </div>
      );
    case "checklist":
      return (
        <div className={`${styles.cueCard} ${styles.checklistCard}`} data-variant="checklist">
          <span className={styles.cardIcon}>{block.icon ?? "◈"}</span>
          <div className={styles.cardBody}>
            {block.eyebrow ? <span className={styles.cardEyebrow}>{block.eyebrow}</span> : null}
            <strong>{block.title}</strong>
            <ul className={styles.checklist}>
              {block.items.map((item) => (
                <li key={item.label} data-state={item.state ?? "idle"}>
                  <i />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
            {signal}
          </div>
        </div>
      );
    case "context":
      return (
        <div className={`${styles.cueCard} ${styles.contextCard}`} data-variant="context">
          <span className={styles.cardIcon}>{block.icon ?? "⌘"}</span>
          <div className={styles.cardBody}>
            {block.eyebrow ? <span className={styles.cardEyebrow}>{block.eyebrow}</span> : null}
            <strong>{block.title}</strong>
            {block.description ? <p className={styles.contextDescription}>{block.description}</p> : null}
            {block.metrics?.length ? (
              <div className={styles.contextMetrics}>
                {block.metrics.map((metric) => (
                  <div key={metric.label}><span>{metric.label}</span><b>{metric.value}</b></div>
                ))}
              </div>
            ) : null}
            {signal}
          </div>
        </div>
      );
  }
}

function placementOffset(placement: DemoCuePlacement) {
  if (placement.includes("left")) return { x: -18, y: 6 };
  if (placement.includes("right")) return { x: 18, y: 6 };
  return { x: 0, y: 14 };
}

export function DemoTourCue({
  step,
  module,
  sceneIndex,
  totalScenes,
  paused,
  reducedMotion,
}: {
  step: DemoTourStep;
  module: "projects" | "finance" | "time" | "resources";
  sceneIndex: number;
  totalScenes: number;
  paused: boolean;
  reducedMotion: boolean;
}) {
  const progress = Math.min(100, Math.max(0, ((sceneIndex + 1) / totalScenes) * 100));
  const placement = step.placement ?? "bottom-center";
  const offset = placementOffset(placement);
  const cursorStyle = {
    "--cursor-left": step.left,
    "--cursor-top": step.top,
  } as CSSProperties;

  return (
    <div
      className={styles.layer}
      data-module={module}
      data-paused={paused ? "true" : "false"}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      aria-hidden="true"
    >
      {!reducedMotion && (
        <motion.div
          className={styles.tourCursor}
          style={cursorStyle}
          animate={{ left: step.left, top: step.top }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.cursorArrow}>
            <svg viewBox="0 0 24 28" aria-hidden="true">
              <path d="M3 2.5 20.3 16l-8.1 1.5-4.4 7.2L3 2.5Z" />
            </svg>
          </span>
          {step.click && <span key={`pulse-${sceneIndex}`} className={styles.clickPulse} />}
        </motion.div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${module}-${sceneIndex}-${placement}`}
          className={styles.cueMount}
          data-placement={placement}
          initial={reducedMotion ? false : { opacity: 0, x: offset.x, y: offset.y, scale: 0.94, filter: "blur(7px)" }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={reducedMotion ? undefined : { opacity: 0, x: -offset.x * 0.45, y: -6, scale: 0.97, filter: "blur(5px)" }}
          transition={{ duration: reducedMotion ? 0 : 0.46, ease: [0.16, 1, 0.3, 1] }}
        >
          {step.block ? (
            <CueBlock block={step.block} progress={progress} reducedMotion={reducedMotion} sceneIndex={sceneIndex} module={module} />
          ) : (
            <div className={`${styles.cueCard} ${styles.progressCard}`} style={{ "--tour-progress": `${progress}%` } as CSSProperties}>
              <span className={styles.cardIcon}>◇</span>
              <div className={styles.cardBody}>
                <strong>{step.label}</strong>
                <span className={styles.progressTrack}><i /></span>
                <ModuleSignal module={module} sceneIndex={sceneIndex} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
