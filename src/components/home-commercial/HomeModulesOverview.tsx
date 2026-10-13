"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { homeCommercialModules } from "@/lib/homeCommercialNarrative";
import styles from "./HomeModulesOverview.module.css";

type ModuleId = (typeof homeCommercialModules)[number]["id"];

const moduleIcons: Record<ModuleId, ReactNode> = {
  fluxos: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 8h8m4 0h8M10 8v16m12-16v6m0 4v6M10 14h12" />
      <circle cx="10" cy="8" r="2.5" /><circle cx="22" cy="16" r="2.5" /><circle cx="10" cy="24" r="2.5" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="5" y="6" width="8" height="7" rx="2" /><rect x="19" y="19" width="8" height="7" rx="2" />
      <path d="M13 9.5h4a5 5 0 0 1 5 5V19M10 13v5a5 5 0 0 0 5 5h4" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 24V13m7 11V8m7 16v-7m6 7H4" />
      <path d="m6 12 7-5 7 8 6-5" /><circle cx="26" cy="10" r="2" />
    </svg>
  ),
  quotes: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 8h8v8H6zM18 16h8v8h-8z" /><path d="M14 12h5a4 4 0 0 1 4 4M18 20h-5a4 4 0 0 1-4-4" />
      <path d="m20.5 8 2 2 4-4" />
    </svg>
  ),
  requests: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M9 5h10l5 5v17H9z" /><path d="M19 5v6h5M13 17h7M13 21h5" />
      <circle cx="9" cy="9" r="3" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 7h20v14H14l-6 5v-5H6z" /><path d="M11 13h10M11 17h7" />
    </svg>
  ),
  "team-time": (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="11" cy="10" r="4" /><path d="M4 25v-2a7 7 0 0 1 14 0v2" />
      <circle cx="23" cy="18" r="6" /><path d="M23 15v3l2 2" />
    </svg>
  ),
  resources: (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 10h9l3 3h10v13H5z" /><path d="M8 10V6h8l3 4" />
      <path d="m18 19 2-2 3 3 2-2 2 2" /><circle cx="12" cy="17" r="2" />
    </svg>
  ),
};

export function HomeModulesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="modulos"
      className={styles.section}
      data-visible={visible ? "true" : "false"}
      aria-labelledby="home-modules-title"
    >
      <div className={styles.gridGlow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="home-modules-title">O mesmo contexto precisa atravessar a obra inteira.</h2>
          <p>Comece pelo gargalo que hoje exige mais cobrança, planilha ou reconstrução de histórico.</p>
        </div>

        <nav className={styles.list} aria-label="Módulos do Dr. Tasks">
          {homeCommercialModules.map((module) => (
            <Link className={styles.item} href={`#${module.anchor}`} key={module.id} data-module={module.id}>
              <span className={styles.topline}>
                <span className={styles.index}>{module.index}</span>
                <span className={styles.icon}>{moduleIcons[module.id]}</span>
              </span>
              <strong>{module.label}</strong>
              <small>{module.painHeadline}</small>
              <span className={styles.rail} aria-hidden="true"><i /></span>
              <span className={styles.arrow} aria-hidden="true">↘</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
