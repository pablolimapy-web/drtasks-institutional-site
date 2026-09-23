"use client";

import { useEffect, useState } from "react";

type SequenceOptions = {
  durations: readonly number[];
  paused: boolean;
  reducedMotion: boolean;
  staticScene: number;
};

export function useShowcaseSequence({ durations, paused, reducedMotion, staticScene }: SequenceOptions) {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    setSceneIndex(reducedMotion ? staticScene : 0);
  }, [reducedMotion, staticScene]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    if (durations.length === 0 || sceneIndex >= durations.length - 1) return;

    const duration = durations[Math.min(sceneIndex, durations.length - 1)];
    const timeout = window.setTimeout(() => {
      setSceneIndex((current) => Math.min(current + 1, durations.length - 1));
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [durations, paused, reducedMotion, sceneIndex]);

  return sceneIndex;
}
