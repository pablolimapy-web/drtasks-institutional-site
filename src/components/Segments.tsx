"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import styles from "./Segments.module.css";

type FeatureIconName = "site" | "measure" | "contract" | "team" | "finance" | "tool" | "check" | "evidence" | "history" | "project" | "flow" | "deadline" | "delivery" | "layers" | "adapt";
type ChipTone = "blue" | "indigo" | "red" | "amber" | "green";

type Segment = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  chips: { label: string; icon: FeatureIconName; tone: ChipTone }[];
};

const SEGMENT_DURATION_MS = 5600;
const SEGMENT_TRANSITION_MS = 360;
const MANUAL_HOLD_MS = 9000;

const segments: readonly Segment[] = [
  {
    title: "Construção e obras",
    body: "Acompanhe OS, contratos, etapas de orçamento, aprovação, compra, execução, medição e entrega.",
    image: "/segments/construction-cinematic.webp",
    imageAlt: "Obra em execução com estrutura de concreto e guindaste",
    href: "/segmentos/construcao",
    chips: [
      { label: "Obra e frentes de serviço", icon: "site", tone: "blue" },
      { label: "Medições e aprovação", icon: "measure", tone: "indigo" },
      { label: "Contratos e aditivos", icon: "contract", tone: "red" },
      { label: "Equipes e terceiros", icon: "team", tone: "amber" },
      { label: "Financeiro integrado", icon: "finance", tone: "green" },
    ],
  },
  {
    title: "Manutenção e serviços de campo",
    body: "Organize solicitações, responsáveis, prazos, bloqueios e retorno da equipe de campo sem perder o histórico.",
    image: "/product/resources/location.jpg",
    imageAlt: "Operação de campo acompanhada pelo Dr. Tasks",
    href: "/segmentos",
    chips: [
      { label: "Chamados e ordens de serviço", icon: "tool", tone: "blue" },
      { label: "Checklists de execução", icon: "check", tone: "indigo" },
      { label: "Evidências de campo", icon: "evidence", tone: "red" },
      { label: "Equipe e responsáveis", icon: "team", tone: "amber" },
      { label: "Histórico operacional", icon: "history", tone: "green" },
    ],
  },
  {
    title: "Operações por projeto ou contrato",
    body: "Conduza trabalhos que passam por etapas, aprovações e entregas com uma próxima ação sempre visível.",
    image: "/product/overview.png",
    imageAlt: "Visão operacional de projetos e contratos no Dr. Tasks",
    href: "/segmentos",
    chips: [
      { label: "Projetos conectados", icon: "project", tone: "blue" },
      { label: "FluxOS e aprovações", icon: "flow", tone: "indigo" },
      { label: "Papéis e responsáveis", icon: "team", tone: "red" },
      { label: "Prazos e marcos", icon: "deadline", tone: "amber" },
      { label: "Entregas rastreáveis", icon: "delivery", tone: "green" },
    ],
  },
  {
    title: "Outros segmentos",
    body: "A mesma estrutura se adapta a operações recorrentes, serviços técnicos e equipes que precisam organizar trabalho com contexto.",
    image: "/product/tasks.png",
    imageAlt: "Operação organizada por tarefas no Dr. Tasks",
    href: "/segmentos",
    chips: [
      { label: "Estrutura configurável", icon: "layers", tone: "blue" },
      { label: "Fluxos sob medida", icon: "flow", tone: "indigo" },
      { label: "Responsáveis visíveis", icon: "team", tone: "red" },
      { label: "Prazos organizados", icon: "deadline", tone: "amber" },
      { label: "Contexto adaptável", icon: "adapt", tone: "green" },
    ],
  },
] as const;

function SegmentFeatureIcon({ name }: { name: FeatureIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "site":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 20V8l7-4 7 4v12M8 20v-5h8v5M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" /></svg>;
    case "measure":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 19V9M10 19V5M15 19v-7M20 19V3"/><path {...common} d="M3.5 19.5h18"/></svg>;
    case "contract":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7 3.5h7l3 3v14H7zM14 3.5v3h3M9.5 11h5M9.5 14h5M9.5 17h3"/></svg>;
    case "team":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="9" cy="9" r="3"/><circle {...common} cx="16.5" cy="10" r="2.2"/><path {...common} d="M4.5 18c.6-3 2.1-4.5 4.5-4.5S13 15 13.5 18M14.2 14.7c2.7 0 4.2 1.1 4.8 3.3"/></svg>;
    case "finance":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 9h16M6 9v9M10 9v9M14 9v9M18 9v9M3 19h18M12 3l9 4H3z"/></svg>;
    case "tool":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m14.5 5.5 4-2-2 4 2 2 4-2-2 4-4 .5-7.5 7.5-3-3 7.5-7.5z"/></svg>;
    case "check":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="5" y="4" width="14" height="16" rx="2"/><path {...common} d="m8 10 1.7 1.7L13 8.5M14.5 10h2M8 15l1.7 1.7L13 13.5M14.5 15h2"/></svg>;
    case "evidence":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="4" y="5" width="16" height="14" rx="2"/><circle {...common} cx="9" cy="10" r="2"/><path {...common} d="m6 17 4-4 2.5 2 2.5-2 3 4"/></svg>;
    case "history":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M6.5 8.5H3.8V5.8M4.2 8.2A8 8 0 1 1 5 16"/><path {...common} d="M12 8v4l2.8 1.8"/></svg>;
    case "project":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="4" y="5" width="16" height="14" rx="2"/><path {...common} d="M8 9h8M8 13h5M8 17h7"/></svg>;
    case "flow":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="6" cy="6" r="2"/><circle {...common} cx="18" cy="12" r="2"/><circle {...common} cx="6" cy="18" r="2"/><path {...common} d="M8 6h3a3 3 0 0 1 3 3v0a3 3 0 0 0 3 3M8 18h3a3 3 0 0 0 3-3v0a3 3 0 0 1 3-3"/></svg>;
    case "deadline":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="8"/><path {...common} d="M12 7.5v5l3 1.8"/></svg>;
    case "delivery":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 7h11v10H4zM15 10h3l2 3v4h-5z"/><circle {...common} cx="8" cy="18" r="1.5"/><circle {...common} cx="17" cy="18" r="1.5"/></svg>;
    case "layers":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m12 4 8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4"/></svg>;
    case "adapt":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 7h11M13 4l3 3-3 3M19 17H8M11 14l-3 3 3 3"/></svg>;
  }
}

export function Segments() {
  const reduced = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasOutside = useRef(true);
  const nextDelayRef = useRef(SEGMENT_DURATION_MS);
  const [active, setActive] = useState(0);
  const [transitionTarget, setTransitionTarget] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [cycleNonce, setCycleNonce] = useState(0);
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(!reduced);
  const segment = segments[active] ?? segments[0];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (!entry.isIntersecting) {
        wasOutside.current = true;
        setVisible(false);
        setTransitionTarget(null);
        setTransitioning(false);
        return;
      }
      setVisible(true);
      if (wasOutside.current) {
        wasOutside.current = false;
        setActive(0);
        setTransitionTarget(null);
        setTransitioning(false);
        nextDelayRef.current = SEGMENT_DURATION_MS;
        setOpening(!reduced);
      }
    }, { threshold: [0, 0.18] });
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (reduced || !visible || !opening) return;
    const timer = window.setTimeout(() => setOpening(false), 3100);
    return () => window.clearTimeout(timer);
  }, [opening, reduced, visible]);

  const commitSegmentTransition = (index: number) => {
    if (index === active || transitionTarget !== null) return;
    setTransitionTarget(index);
    setTransitioning(true);
  };

  useEffect(() => {
    if (transitionTarget === null) return;
    const timer = window.setTimeout(() => {
      setActive(transitionTarget);
      setTransitionTarget(null);
      setTransitioning(false);
    }, SEGMENT_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [transitionTarget]);

  useEffect(() => {
    if (reduced || !visible || opening || transitionTarget !== null) return;
    const delay = nextDelayRef.current;
    nextDelayRef.current = SEGMENT_DURATION_MS;
    const timer = window.setTimeout(() => {
      commitSegmentTransition((active + 1) % segments.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [active, cycleNonce, opening, reduced, transitionTarget, visible]);

  const selectSegment = (index: number) => {
    nextDelayRef.current = MANUAL_HOLD_MS;
    if (index === active && transitionTarget === null) {
      setCycleNonce((value) => value + 1);
      return;
    }
    commitSegmentTransition(index);
  };

  return (
    <section ref={sectionRef} className={styles.section} id="segmentos" aria-labelledby="segments-title">
      <span className={styles.ambientCurveOne} aria-hidden="true" />
      <span className={styles.ambientCurveTwo} aria-hidden="true" />
      <span className={styles.ambientGlow} aria-hidden="true" />

      <AnimatePresence initial={false}>
        {opening ? (
          <motion.div
            key="segment-opening"
            className={styles.sectionOpening}
            initial={reduced ? false : { opacity: 0, filter: "blur(16px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.025, filter: "blur(14px)" }}
            transition={{ duration: reduced ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <motion.span className={styles.openingEyebrow} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .5, delay: .1 }}>
              DR.TASKS / CAPÍTULO 07
            </motion.span>
            <div className={styles.openingTitleRow}>
              <motion.span className={styles.openingIndex} initial={reduced ? false : { opacity: 0, scale: .82, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: reduced ? 0 : .7, delay: .18, ease: [0.16,1,.3,1] }}>07</motion.span>
              <motion.div className={styles.openingTitle} initial={reduced ? false : { opacity: 0, x: 30, filter: "blur(9px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: reduced ? 0 : .78, delay: .26, ease: [0.16,1,.3,1] }}>
                <strong>PARA</strong><span>QUEM É</span>
              </motion.div>
            </div>
            <motion.div className={styles.openingSegments} initial={reduced ? false : { opacity: 0, scaleX: .18 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: reduced ? 0 : .9, delay: .42, ease: [0.16,1,.3,1] }}>
              <span><i>01</i><b>CONSTRUÇÃO</b></span>
              <span><i>02</i><b>MANUTENÇÃO</b></span>
              <span><i>03</i><b>PROJETOS</b></span>
              <span><i>04</i><b>OUTROS</b></span>
              <em><i /></em>
            </motion.div>
            <motion.p className={styles.openingStatement} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : .62, delay: .72 }}>
              Cada operação tem suas particularidades.
            </motion.p>
            <span className={styles.openingGlow} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className={`${styles.inner} ${opening ? styles.innerOpening : ""}`}
        animate={opening && !reduced ? { opacity: .16, scale: .985, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: reduced ? 0 : .7, ease: [0.16,1,.3,1] }}
      >
        <header className={styles.header}>
          <motion.div initial={reduced ? false : { opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: .35 }} transition={{ duration: reduced ? 0 : .72, ease: [0.16,1,.3,1] }}>
            <span className={styles.kicker}>07 / PARA QUEM É</span>
            <h2 id="segments-title">Cada operação tem<br />suas particularidades.<br /><em>O Dr. Tasks se adapta<br />ao seu contexto.</em></h2>
          </motion.div>
          <motion.p initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: reduced ? 0 : .62, delay: .12 }}>
            Escolha um segmento e veja como a mesma lógica operacional muda de linguagem sem perder a estrutura.
          </motion.p>
        </header>

        <div className={`${styles.editorial} ${transitioning ? styles.editorialTransitioning : ""}`}>
          <nav className={styles.selector} aria-label="Selecionar segmento">
            {segments.map((item, index) => (
              <button key={item.title} aria-pressed={active === index} onClick={() => selectSegment(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <b aria-hidden="true">→</b>
              </button>
            ))}
          </nav>

          <div className={styles.mediaColumn}>
            <span className={styles.mediaBackdrop} aria-hidden="true" />
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={`media-${segment.title}`}
                className={styles.mediaShell}
                initial={reduced ? false : { opacity: 0, y: 22, scale: .965, clipPath: "inset(12% 8% 12% 8% round 96px 26px 96px 26px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 96px 26px 96px 26px)" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16, scale: 1.015, filter: "blur(7px)" }}
                transition={{ duration: reduced ? 0 : .76, ease: [0.16,1,.3,1] }}
              >
                <Image src={segment.image} alt={segment.imageAlt} fill priority={active === 0} sizes="(max-width: 900px) 92vw, 38vw" />
                <span className={styles.mediaSheen} aria-hidden="true" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="sync" initial={false}>
              <motion.div key={`chips-${segment.title}`} className={styles.featureChips}>
                {segment.chips.map((chip, index) => (
                  <motion.span
                    key={chip.label}
                    className={`${styles.featureChip} ${styles[chip.tone]}`}
                    initial={reduced ? false : { opacity: 0, x: 28, scale: .96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: reduced ? 0 : .42, delay: reduced ? 0 : .14 + index * .07, ease: [0.16,1,.3,1] }}
                    style={{ animationDelay: `${index * .24}s` }}
                  >
                    <i><SegmentFeatureIcon name={chip.icon} /></i>
                    <b>{chip.label}</b>
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="sync" initial={false}>
            <motion.div key={`copy-${segment.title}`} className={styles.segmentCopy} initial={reduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10 }} transition={{ duration: reduced ? 0 : .48, delay: reduced ? 0 : .1 }}>
              <h3>{segment.title.toUpperCase()}</h3>
              <p>{segment.body}</p>
              <Link className={styles.cta} href={segment.href}><span>Ver detalhes</span><i aria-hidden="true">→</i></Link>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="sync" initial={false}>
            <motion.span key={`index-${active}`} className={styles.watermark} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : .5 }} aria-hidden="true">
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
