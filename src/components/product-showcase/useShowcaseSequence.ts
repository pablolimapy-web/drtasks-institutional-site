"use client";

import { useEffect, useState } from "react";

type SequenceOptions = {
  durations: readonly number[];
  paused: boolean;
  reducedMotion: boolean;
  staticScene: number;
  speed?: number;
  loop?: boolean;
};

export function useShowcaseSequence({
  durations,
  paused,
  reducedMotion,
  staticScene,
  speed = 1,
  loop = false,
}: SequenceOptions) {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    setSceneIndex(reducedMotion ? staticScene : 0);
  }, [reducedMotion, staticScene]);

  useEffect(() => {
    if (paused || reducedMotion || durations.length === 0) return;

    const atFinalScene = sceneIndex >= durations.length - 1;
    if (atFinalScene && !loop) return;

    const duration = durations[Math.min(sceneIndex, durations.length - 1)] ?? 400;
    const delay = Math.max(120, Math.round(duration * speed));
    const timeout = window.setTimeout(() => {
      if (loop && sceneIndex >= durations.length - 1) {
        setSceneIndex(0);
        return;
      }
      setSceneIndex((current) => Math.min(current + 1, durations.length - 1));
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [durations, loop, paused, reducedMotion, sceneIndex, speed]);

  return sceneIndex;
}
