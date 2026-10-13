"use client";

import { useEffect } from "react";

const selector = '[data-home-motion][data-home-replay="true"]';

export function HomeMotionOrchestrator() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!nodes.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showAll = () => {
      for (const node of nodes) node.setAttribute("data-home-reveal-state", "visible");
    };

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    document.documentElement.dataset.homeMotionReady = "true";
    for (const node of nodes) node.setAttribute("data-home-reveal-state", "hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.setAttribute("data-home-reveal-state", "visible");
          } else if (target.dataset.homeReplay === "true") {
            target.setAttribute("data-home-reveal-state", "hidden");
          }
        }
      },
      { threshold: 0.24, rootMargin: "-6% 0px -18% 0px" },
    );

    for (const node of nodes) observer.observe(node);

    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.homeMotionReady;
      for (const node of nodes) node.removeAttribute("data-home-reveal-state");
    };
  }, []);

  return null;
}
