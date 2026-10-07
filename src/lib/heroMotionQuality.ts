"use client";

import { useEffect, useRef, useState } from "react";

export type HeroMotionQuality = "full" | "balanced" | "performance";

type DeviceHints = {
  hardwareConcurrency?: number;
  deviceMemory?: number;
  saveData?: boolean;
  viewportWidth?: number;
};

export function getInitialHeroMotionQuality({ hardwareConcurrency, deviceMemory, saveData, viewportWidth }: DeviceHints): HeroMotionQuality {
  if (saveData) return "performance";
  if (typeof hardwareConcurrency === "number" && hardwareConcurrency <= 2) return "performance";
  if (typeof deviceMemory === "number" && deviceMemory <= 2) return "performance";
  if (typeof viewportWidth === "number" && viewportWidth <= 768) return "balanced";
  if (typeof hardwareConcurrency === "number" && hardwareConcurrency <= 4) return "balanced";
  if (typeof deviceMemory === "number" && deviceMemory <= 4) return "balanced";
  return "full";
}

export function classifyHeroMotionQuality(averageFrameMs: number, longFrameRatio: number): HeroMotionQuality {
  if (!Number.isFinite(averageFrameMs) || averageFrameMs <= 0) return "full";
  if (averageFrameMs > 24 || longFrameRatio > 0.24) return "performance";
  return averageFrameMs > 18.5 || longFrameRatio > 0.12 ? "balanced" : "full";
}

function keepMobileQualityFloor(quality: HeroMotionQuality, viewportWidth: number): HeroMotionQuality {
  if (viewportWidth > 768 || quality === "performance") return quality;
  return "balanced";
}

export function useHeroMotionQuality(active: boolean): HeroMotionQuality {
  const [quality, setQuality] = useState<HeroMotionQuality>("balanced");
  const measuredRef = useRef(false);

  useEffect(() => {
    if (!active || measuredRef.current || typeof window === "undefined") return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };

    setQuality(getInitialHeroMotionQuality({
      hardwareConcurrency: nav.hardwareConcurrency,
      deviceMemory: nav.deviceMemory,
      saveData: nav.connection?.saveData,
      viewportWidth: window.innerWidth,
    }));

    let animationFrame = 0;
    let startedAt = 0;
    let previousAt = 0;
    let totalFrameMs = 0;
    let measuredFrames = 0;
    let longFrames = 0;

    const sample = (now: number) => {
      if (startedAt === 0) {
        startedAt = now;
        previousAt = now;
        animationFrame = window.requestAnimationFrame(sample);
        return;
      }

      const delta = now - previousAt;
      previousAt = now;

      // Count real rendering stalls while the page is visible. Very large gaps are still
      // treated as debugger / OS suspension rather than GPU throughput samples.
      if (document.visibilityState === "visible" && delta > 0 && delta < 500) {
        totalFrameMs += delta;
        measuredFrames += 1;
        if (delta > 22) longFrames += 1;
      }

      if (now - startedAt < 1200 && measuredFrames < 45) {
        animationFrame = window.requestAnimationFrame(sample);
        return;
      }

      measuredRef.current = true;
      const averageFrameMs = measuredFrames > 0 ? totalFrameMs / measuredFrames : 16.7;
      const longFrameRatio = measuredFrames > 0 ? longFrames / measuredFrames : 0;
      setQuality(keepMobileQualityFloor(
        classifyHeroMotionQuality(averageFrameMs, longFrameRatio),
        window.innerWidth,
      ));
    };

    animationFrame = window.requestAnimationFrame(sample);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [active]);

  return quality;
}
