"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";

type ProductPreviewProps = {
  phaseIndex?: number;
};

const phaseBadgeOffsets = [0, -8, 6, -4];
export function ProductPreview({ phaseIndex = 0 }: ProductPreviewProps) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 170, damping: 22, mass: 0.52 });
  const smoothY = useSpring(pointerY, { stiffness: 170, damping: 22, mass: 0.52 });
  const rotateY = useTransform(smoothX, [-1, 1], [-4.6, 4.6]);
  const rotateX = useTransform(smoothY, [-1, 1], [3.6, -3.6]);
  const glareX = useTransform(smoothX, [-1, 1], [18, -18]);
  const glareY = useTransform(smoothY, [-1, 1], [12, -12]);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };


  return (
    <motion.div
      className="product-window product-window-hero"
      aria-label="Prévia visual do FluxOS"
      onPointerMove={onPointerMove}
      onPointerLeave={resetPointer}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1650 }}
      transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.85 }}
    >
      <div className="product-window-image-wrap">
        <video
          className="product-window-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/fluxos-dashboard-hero.png"
          aria-label="Demonstração do Dr. Tasks mostrando a visão FluxOS em funcionamento"
        >
          <source src="/hero/fluxos-demo.webm" type="video/webm" />
          <source src="/hero/fluxos-demo.mp4" type="video/mp4" />
        </video>

        <motion.div
          className="product-window-glare"
          aria-hidden="true"
          style={reducedMotion ? undefined : { x: glareX, y: glareY }}
        />



        <motion.div
          className="product-hotspot product-hotspot-top"
          aria-hidden="true"
          animate={reducedMotion ? undefined : { y: [0, -8, 0], opacity: [0.82, 1, 0.82] }}
          transition={reducedMotion ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="product-hotspot product-hotspot-side"
          aria-hidden="true"
          animate={reducedMotion ? undefined : { y: [0, 10, 0], opacity: [0.72, 1, 0.72] }}
          transition={reducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </div>

      <motion.div
        className="hero-overlay-card hero-overlay-left"
        animate={
          reducedMotion
            ? { opacity: 1 }
            : {
                y: [0, -8 + phaseBadgeOffsets[phaseIndex % phaseBadgeOffsets.length], 0],
                x: [0, 6, 0],
              }
        }
        transition={reducedMotion ? undefined : { duration: 3.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="floating-label">PRÓXIMO PASSO</span>
        <strong>Aprovação do cliente</strong>
      </motion.div>

      <motion.div
        className="hero-overlay-card hero-overlay-right"
        animate={reducedMotion ? undefined : { y: [0, -12, 0], x: [0, -4, 0] }}
        transition={reducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.16 }}
      >
        <span className="pulse" />
        <strong>Fluxo sincronizado</strong>
      </motion.div>

      <motion.div
        className="hero-overlay-card hero-overlay-top"
        animate={reducedMotion ? undefined : { y: [0, -10, 0], opacity: [0.84, 1, 0.84] }}
        transition={reducedMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.12 }}
      >
        <span className="pulse pulse-small" />
        <span>Atualizado agora</span>
      </motion.div>
    </motion.div>
  );
}
