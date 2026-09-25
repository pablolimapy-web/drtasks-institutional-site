"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./FinanceChapter.module.css";

type FinanceIconName =
  | "request"
  | "approval"
  | "obligation"
  | "payment"
  | "reconciliation"
  | "trend"
  | "clock"
  | "folder"
  | "history"
  | "route"
  | "result";

type FinanceStage = {
  id: string;
  label: string;
  icon: FinanceIconName;
  description: string;
  bullets: [string, string, string, string];
  screen: string;
  cueTitle: string;
  cueDetail: string;
  focus: { left: string; top: string; width: string; height: string; label: string };
  sideCards: { icon: FinanceIconName; title: string; note: string; tone: "blue" | "violet" | "green" }[];
  strip: { icon: FinanceIconName; title: string; detail: string }[];
};

function FinanceIcon({ name }: { name: FinanceIconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "request":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7 3.5h7l3 3V20.5H7z"/><path {...common} d="M14 3.5v3h3M9.5 11h5M9.5 14h5"/></svg>;
    case "approval":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="8.5"/><path {...common} d="m8.2 12.1 2.3 2.4 5.2-5.4"/></svg>;
    case "obligation":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M7 3.5h8.5l2.5 2.7V20.5H7z"/><path {...common} d="M10 9h5M10 12.5h5M10 16h3"/></svg>;
    case "payment":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><rect {...common} x="4" y="6" width="16" height="12" rx="2"/><path {...common} d="M4 9.5h16M8 14h3"/></svg>;
    case "reconciliation":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 7h14M5 12h14M5 17h14"/><path {...common} d="m8 4-3 3 3 3M16 14l3 3-3 3"/></svg>;
    case "trend":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m5 16 4-4 3 2 6-7"/><path {...common} d="M14 7h4v4"/></svg>;
    case "clock":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="12" cy="12" r="8"/><path {...common} d="M12 7.8v4.6l3 1.8"/></svg>;
    case "folder":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 7.5h6l1.7 2H20v8.8H4z"/></svg>;
    case "history":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M6.5 8.5H3.8V5.8M4.2 8.2A8 8 0 1 1 5 16"/><path {...common} d="M12 8v4l2.8 1.8"/></svg>;
    case "route":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 7h12M14 4l3 3-3 3M19 17H7M10 14l-3 3 3 3"/></svg>;
    case "result":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 19V9M10 19V5M15 19v-7M20 19V3"/></svg>;
  }
}

const financeStages: readonly FinanceStage[] = [
  {
    id: "request",
    label: "Solicitação",
    icon: "request",
    description: "A demanda entra com contexto. Centro de custo, projeto, responsável e documentos acompanham a abertura desde o primeiro passo.",
    bullets: ["Vinculada a um projeto", "Centro de custo e responsável", "Documentos de apoio", "Acompanhamento em tempo real"],
    screen: "/product/finance/requests.jpg",
    cueTitle: "Demanda recebida",
    cueDetail: "Contexto, valor e justificativa conectados",
    focus: { left: "17%", top: "27%", width: "38%", height: "14%", label: "Nova solicitação" },
    sideCards: [
      { icon: "trend", title: "R$ 42.160,00", note: "em solicitações no mês", tone: "blue" },
      { icon: "clock", title: "3", note: "em aprovação", tone: "violet" },
      { icon: "folder", title: "Reforma Sede", note: "vinculada ao projeto", tone: "green" },
    ],
    strip: [
      { icon: "request", title: "Origem", detail: "Solicitação operacional com contexto" },
      { icon: "route", title: "Percurso", detail: "Aprovação → Obrigação → Pagamento" },
      { icon: "result", title: "Resultado", detail: "Conciliação pronta para auditoria e análise" },
    ],
  },
  {
    id: "approval",
    label: "Aprovação",
    icon: "approval",
    description: "Quem decide enxerga origem, impacto e responsável antes do compromisso financeiro. A leitura continua operacional, não isolada.",
    bullets: ["Fluxo configurável", "Responsável definido", "Histórico preservado", "Status por etapa"],
    screen: "/product/finance/requests.jpg",
    cueTitle: "Decisão em andamento",
    cueDetail: "O pedido segue com rastreabilidade",
    focus: { left: "58%", top: "31%", width: "21%", height: "17%", label: "Aguardando aprovação" },
    sideCards: [
      { icon: "approval", title: "2 obrigações", note: "aguardando decisão", tone: "violet" },
      { icon: "payment", title: "1 pagamento", note: "próxima etapa preparada", tone: "blue" },
      { icon: "history", title: "Histórico", note: "decisão preservada", tone: "green" },
    ],
    strip: [
      { icon: "request", title: "Origem", detail: "Solicitação preservada" },
      { icon: "approval", title: "Percurso", detail: "Decisão antes do compromisso" },
      { icon: "result", title: "Resultado", detail: "Obrigação nasce com rastreabilidade" },
    ],
  },
  {
    id: "obligation",
    label: "Obrigação",
    icon: "obligation",
    description: "Depois da aprovação, o valor vira obrigação sem perder o projeto, o centro de custo e os documentos de origem.",
    bullets: ["Título vinculado", "Projeto preservado", "Centro de custo mantido", "Documentos acessíveis"],
    screen: "/product/pillars/finance.jpg",
    cueTitle: "Compromisso criado",
    cueDetail: "A obrigação já carrega o contexto completo",
    focus: { left: "18%", top: "23%", width: "31%", height: "18%", label: "Obrigação gerada" },
    sideCards: [
      { icon: "obligation", title: "2 obrigações", note: "em aberto", tone: "violet" },
      { icon: "payment", title: "Pagamento", note: "próxima etapa", tone: "blue" },
      { icon: "folder", title: "Centro de custo", note: "já carregado", tone: "green" },
    ],
    strip: [
      { icon: "request", title: "Origem", detail: "Demanda aprovada" },
      { icon: "route", title: "Percurso", detail: "Obrigação com contexto" },
      { icon: "result", title: "Resultado", detail: "Compromisso financeiro rastreável" },
    ],
  },
  {
    id: "payment",
    label: "Pagamento",
    icon: "payment",
    description: "A baixa financeira continua ligada ao processo. O pagamento não perde a justificativa nem o projeto que o originou.",
    bullets: ["Baixa vinculada", "Projeto preservado", "Agenda financeira", "Status executado"],
    screen: "/product/pillars/finance.jpg",
    cueTitle: "Execução financeira",
    cueDetail: "Pagamento guiado pela origem do processo",
    focus: { left: "55%", top: "23%", width: "24%", height: "18%", label: "Baixa programada" },
    sideCards: [
      { icon: "payment", title: "1 pagamento", note: "programado hoje", tone: "blue" },
      { icon: "clock", title: "Janela", note: "financeira confirmada", tone: "violet" },
      { icon: "history", title: "Histórico", note: "preservado até a baixa", tone: "green" },
    ],
    strip: [
      { icon: "request", title: "Origem", detail: "Obrigação aprovada" },
      { icon: "route", title: "Percurso", detail: "Execução vinculada ao processo" },
      { icon: "result", title: "Resultado", detail: "Baixa sem perder a justificativa" },
    ],
  },
  {
    id: "reconciliation",
    label: "Conciliação",
    icon: "reconciliation",
    description: "O ciclo fecha com a origem preservada. A leitura final conecta solicitação, aprovação, obrigação e pagamento.",
    bullets: ["Conciliação atualizada", "Histórico preservado", "Leitura consolidada", "Análise pronta"],
    screen: "/product/finance/quotes.jpg",
    cueTitle: "Ciclo conciliado",
    cueDetail: "Fechamento visual pronto para auditoria",
    focus: { left: "14%", top: "23%", width: "27%", height: "24%", label: "Conciliação atualizada" },
    sideCards: [
      { icon: "approval", title: "Conciliação", note: "atualizada", tone: "green" },
      { icon: "route", title: "Resultado", note: "fechamento consolidado", tone: "blue" },
      { icon: "history", title: "Histórico", note: "pronto para auditoria", tone: "violet" },
    ],
    strip: [
      { icon: "request", title: "Origem", detail: "Solicitação preservada" },
      { icon: "route", title: "Percurso", detail: "Aprovação → Obrigação → Pagamento" },
      { icon: "result", title: "Resultado", detail: "Conciliação e histórico preservado para auditoria e análise" },
    ],
  },
] as const;

export function FinanceChapter() {
  const module = getModuleShowcaseModule("finance");
  const reducedMotion = Boolean(useReducedMotion());
  const [active, setActive] = useState(0);
  const pauseUntil = useRef(0);
  const stage = financeStages[active] ?? financeStages[0];

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setActive((current) => (current + 1) % financeStages.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const handleStage = (index: number) => {
    setActive(index);
    pauseUntil.current = Date.now() + 9000;
  };

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="finance-title">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <motion.div
            className={styles.copyColumn}
            initial={reducedMotion ? false : { opacity: 0, y: 26, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reducedMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.kicker}>03 / FINANCEIRO</span>
            <h2 id="finance-title">
              O valor nasce em uma demanda.
              <em>Depois precisa chegar até a conciliação.</em>
            </h2>
            <p>Em vez de separar operação e dinheiro, o Dr. Tasks mantém o processo financeiro conectado ao contexto que originou cada movimento.</p>
            <div className={styles.ctaWrap}>
              <ModuleChapterLink href={module.href}>Conheça o módulo Financeiro</ModuleChapterLink>
            </div>
          </motion.div>

          <div className={styles.experience} onMouseEnter={() => (pauseUntil.current = Date.now() + 9000)}>
            <motion.div
              className={styles.stepper}
              aria-label="Etapas do fluxo financeiro"
              initial={reducedMotion ? false : { opacity: 0, y: -18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.stepperLine} aria-hidden="true">
                <motion.i animate={{ scaleX: (active + 1) / financeStages.length }} transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} />
                <motion.b className={styles.routeSpark} animate={{ left: `${((active + 1) / financeStages.length) * 100}%` }} transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} />
              </span>
              {financeStages.map((item, index) => (
                <button key={item.id} type="button" className={`${styles.step} ${active === index ? styles.stepActive : ""}`} onClick={() => handleStage(index)} aria-pressed={active === index}>
                  <span className={styles.stepIcon}><FinanceIcon name={item.icon} /></span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.label}</strong>
                </button>
              ))}
            </motion.div>

            <div className={styles.stageContent}>
              <motion.aside
                className={styles.stageCard}
                key={`copy-${stage.id}`}
                initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.42 }}
              >
                <span>Etapa ativa</span>
                <strong>{stage.label}</strong>
                <p>{stage.description}</p>
                <ul>
                  {stage.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </motion.aside>

              <div className={styles.visual}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={stage.id}
                    className={styles.scene}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: reducedMotion ? 0 : 0.46, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className={styles.vignette}
                      initial={reducedMotion ? false : { opacity: 0, y: -14, scale: 0.96, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: reducedMotion ? 0 : 0.48, delay: reducedMotion ? 0 : 0.06 }}
                    >
                      <span>Financeiro • demo guiada</span>
                      <strong>{stage.cueTitle}</strong>
                      <small>{stage.cueDetail}</small>
                    </motion.div>

                    <motion.div
                      className={`${styles.screenShell} ${styles.interfaceReveal}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.965, rotateX: 4.5, filter: "blur(12px)", clipPath: "inset(8% 4% 8% 4% round 24px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0% round 18px)" }}
                      transition={{ duration: reducedMotion ? 0 : 0.84, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image src={stage.screen} alt={`Tela do módulo Financeiro na etapa ${stage.label}`} width={1851} height={926} sizes="(max-width: 900px) 94vw, 54vw" />
                      <motion.span className={styles.focusFrame} style={{ left: stage.focus.left, top: stage.focus.top, width: stage.focus.width, height: stage.focus.height }} initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.12 }}>
                        <i />
                        <b>{stage.focus.label}</b>
                      </motion.span>
                      <span className={styles.screenSheen} aria-hidden="true" />
                      <span className={styles.interfaceAmbient} aria-hidden="true" />
                    </motion.div>

                    <motion.div className={styles.demoCue} initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.44, delay: reducedMotion ? 0 : 0.16 }}>
                      <span className={styles.demoCueIcon}><FinanceIcon name={stage.icon} /></span>
                      <div>
                        <strong>{stage.cueTitle}</strong>
                        <small>{stage.cueDetail}</small>
                        <span className={styles.demoProgress}><i style={{ width: `${((active + 1) / financeStages.length) * 100}%` }} /></span>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className={styles.sideRail}>
                {stage.sideCards.map((card, index) => (
                  <motion.article key={`${stage.id}-${card.title}`} className={`${styles.sideCard} ${styles[card.tone]}`} initial={reducedMotion ? false : { opacity: 0, x: 16, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.1 + index * 0.06 }}>
                    <span className={styles.sideIcon}><FinanceIcon name={card.icon} /></span>
                    <div>
                      <strong>{card.title}</strong>
                      <small>{card.note}</small>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <motion.div className={styles.bottomStrip} initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: reducedMotion ? 0 : 0.58, delay: reducedMotion ? 0 : 0.12 }}>
              <div className={styles.stripLead}>
                <span className={styles.stripLeadIcon}><FinanceIcon name="request" /></span>
                <div>
                  <strong>Da origem ao fechamento</strong>
                  <small>Uma leitura financeira conectada à operação.</small>
                </div>
              </div>
              {stage.strip.map((item) => (
                <div key={`${stage.id}-${item.title}`} className={styles.stripItem}>
                  <span className={styles.stripIcon}><FinanceIcon name={item.icon} /></span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
