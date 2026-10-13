"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-site-reveal]"));

    if (reduced) {
      nodes.forEach((node) => node.setAttribute("data-site-reveal-state", "visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const node = entry.target as HTMLElement;
          node.setAttribute(
            "data-site-reveal-state",
            entry.isIntersecting && entry.intersectionRatio >= .08 ? "visible" : "idle",
          );
        }
      },
      { threshold: [0, .08, .3], rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
