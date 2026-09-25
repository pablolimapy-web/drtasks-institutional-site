"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

type AnimatedContentProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
};

export default function AnimatedContent({
  children,
  container,
  distance = 64,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 0.985,
  threshold = 0.12,
  delay = 0,
  className = "",
  style,
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { clearProps: "all", opacity: 1, visibility: "visible" });
      return;
    }

    let scrollerTarget: Element | string | null = container ?? null;
    if (typeof scrollerTarget === "string") scrollerTarget = document.querySelector(scrollerTarget);

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: "visible",
    });

    const tween = gsap.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease,
      paused: true,
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || undefined,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      trigger.kill();
      tween.kill();
    };
  }, [animateOpacity, container, delay, direction, distance, duration, ease, initialOpacity, reducedMotion, reverse, scale, threshold]);

  return (
    <div ref={ref} className={className} style={{ visibility: reducedMotion ? "visible" : "hidden", ...style }} {...props}>
      {children}
    </div>
  );
}
