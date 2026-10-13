"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

export type NarrativeLoopOptions = {
  phaseDurations: readonly number[];
  inViewAmount?: number;
};

export type NarrativeLoopState = {
  ref: RefObject<HTMLDivElement | null>;
  phase: number;
  isInView: boolean;
  reducedMotion: boolean;
};

export function useNarrativeLoop({
  phaseDurations,
  inViewAmount = 0.28,
}: NarrativeLoopOptions): NarrativeLoopState {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: inViewAmount });
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = Boolean(prefersReducedMotion);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const finalPhase = Math.max(0, phaseDurations.length - 1);

    if (reducedMotion) {
      setPhase(finalPhase);
      return;
    }

    if (!isInView) return;

    const duration = phaseDurations[phase] ?? phaseDurations[finalPhase] ?? 1800;
    const timeoutId = window.setTimeout(() => {
      if (phase >= finalPhase) {
        setPhase(0);
        return;
      }
      setPhase(phase + 1);
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [isInView, phase, phaseDurations, reducedMotion]);

  return { ref, phase, isInView, reducedMotion };
}
