"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { getFluxosHeroScene, nextFluxosHeroScene } from "@/lib/fluxosHeroSequence";
import styles from "./ProductPreview.module.css";

type ProductPreviewProps = { phaseIndex?: number };

type FluxRow = {
  os: string;
  project: string;
  institution: string;
  type: string;
  responsible: string;
  days: string;
  schedule: string;
  stage: string;
  health: number;
  tag?: string;
  value?: string;
};

const KPI = [
  { value: "267", label: "Ativas", tone: "violet" },
  { value: "R$ 3,1M", label: "Futura", tone: "green" },
  { value: "0", label: "Em Risco", tone: "amber" },
  { value: "R$ 3,1M", label: "Dispon.", tone: "blue" },
  { value: "57", label: "Faturam. At.", tone: "red" },
] as const;

const ROWS: FluxRow[] = [
  { os: "10", project: "130 - N° 09/2025 - MANUTENÇÃO EM SUBESTAÇÃO", institution: "130 - ANATEL SC", type: "Serviço", responsible: "Ryan Lucca", days: "57d", schedule: "Definido", stage: "EM ANDAM.", health: 54, tag: "compras", value: "46.355,95" },
  { os: "11", project: "130 - N° 06/2025 - IMPLANTAÇÃO DE SHP", institution: "130 - ANATEL SC", type: "Serviço", responsible: "Ryan Lucca", days: "52d", schedule: "Definido", stage: "EM ANDAM.", health: 87, value: "139.000,00" },
  { os: "13", project: "102 - LT14 - OS 663/1130 - MANUTENÇÃO DE COBERTURA", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, value: "3.650,28" },
  { os: "14", project: "102 - LT14 - OS 1790 - PROTEÇÃO CONTRA SINANTRÓPICOS", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, value: "3.459,53" },
  { os: "15", project: "102 - LT14 - OS 1770 - REPARO ESTRUTURAL EM CONCRETO", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, value: "4.098,45" },
  { os: "16", project: "102 - LT14 - OS 1771 - INSPEÇÃO E REPARO ESTRUTURAL", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, value: "5.298,74" },
  { os: "20", project: "102 - LT16 - OS 362 - REVESTIMENTO DE BANHEIRO", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "78d", schedule: "Datas", stage: "CONTRATO", health: 87, value: "894,24" },
  { os: "22", project: "102 - LT16 - OS 1583 - INFRAESTRUTURA DE PROJEÇÃO", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "64d", schedule: "Datas", stage: "APROVADO", health: 79, value: "2.234,55" },
];

const NAV = ["Dashboard", "Instituições", "Projetos", "Tarefas", "FluxOS", "Arquivos", "Localização", "Financeiro", "Chat", "Usuários"];

function Drop({ index }: { index: number }) {
  return <span className={styles.drop} style={{ "--i": index } as any} />;
}

export function ProductPreview({ phaseIndex: _phaseIndex = 0 }: ProductPreviewProps) {
  const reducedMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = getFluxosHeroScene(sceneIndex);

  useEffect(() => {
    if (reducedMotion) {
      setSceneIndex(3);
      return;
    }
    const timeout = window.setTimeout(() => setSceneIndex(current => nextFluxosHeroScene(current)), scene.durationMs);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, sceneIndex, scene.durationMs]);

  const intro = scene.id === "brandIntro";
  const shellBuilt = sceneIndex >= 1;
  const kpiFocus = scene.id === "kpiFocus";
  const tableBuilt = sceneIndex >= 3;
  const rowSpotlight = scene.id === "rowSpotlight";
  const drawerOpen = sceneIndex >= 5;
  const drawerCallouts = scene.id === "drawerCallouts";
  const selected = ROWS[0];

  return (
    <div className={styles.showcase} role="img" aria-label="Apresentação animada do FluxOS">
      <motion.div
        className={styles.frame}
        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: drawerOpen ? 1.005 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.screen}>
          <motion.aside
            className={styles.sidebar}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : -46 }}
            transition={{ duration: 0.8, delay: shellBuilt ? 0.05 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.logoRow}><span className={styles.menuGlyph}>☰</span><strong>DR TASKS</strong></div>
            <div className={styles.sideNav}>
              {NAV.map((item, index) => (
                <motion.div
                  key={item}
                  className={`${styles.navItem} ${item === "FluxOS" ? styles.navActive : ""}`}
                  initial={false}
                  animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : -18 }}
                  transition={{ duration: 0.42, delay: shellBuilt ? 0.18 + index * 0.045 : 0 }}
                >
                  <span>{["◉", "⌘", "▦", "□", "ϟ", "▱", "⌖", "◇", "▢", "◌"][index]}</span>{item}
                </motion.div>
              ))}
            </div>
          </motion.aside>

          <motion.header
            className={styles.topbar}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, y: shellBuilt ? 0 : -34 }}
            transition={{ duration: 0.72, delay: shellBuilt ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.toggle}></span>
            <div className={styles.search}><span>⌕</span><span>Pesquise aqui</span></div>
            <div className={styles.topActions}><span>▢</span><span>♢</span><span>✧</span><b>PL</b></div>
          </motion.header>

          <motion.main
            className={styles.appMain}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, y: shellBuilt ? 0 : 22 }}
            transition={{ duration: 0.82, delay: shellBuilt ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={styles.titleBar}
              initial={false}
              animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : 28 }}
              transition={{ duration: 0.66, delay: shellBuilt ? 0.38 : 0 }}
            >
              <div><h3><span>Flux</span>OS</h3><p>Visão clara da operação, do andamento aos resultados.</p></div>
              <div className={styles.titleActions}><button>Confortável</button><button>⌄</button><button>☷</button><strong>+ Nova OS</strong></div>
            </motion.div>

            <div className={styles.kpiGrid}>
              {KPI.map((item, index) => (
                <motion.article
                  key={item.label}
                  className={`${styles.kpiCard} ${styles[`tone_${item.tone}`]}`}
                  initial={false}
                  animate={{
                    opacity: shellBuilt ? 1 : 0,
                    y: shellBuilt ? (kpiFocus ? -8 : 0) : 22,
                    scale: kpiFocus ? 1.035 : 1,
                  }}
                  transition={{ duration: 0.62, delay: shellBuilt ? 0.55 + index * 0.13 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div><i></i><strong>{item.value}</strong></div><span>{item.label}</span>
                </motion.article>
              ))}
            </div>

            <AnimatePresence>
              {kpiFocus && (
                <motion.div className={`${styles.callout} ${styles.kpiCallout}`} initial={{ opacity: 0, y: 18, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, delay: 0.55 }}>
                  <small>Visão operacional</small><strong>Indicadores essenciais aparecem antes de você procurar.</strong>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.section
              className={styles.tableCard}
              initial={false}
              animate={{ opacity: tableBuilt ? 1 : 0, y: tableBuilt ? 0 : 34, scale: tableBuilt ? 1 : 0.985 }}
              transition={{ duration: 0.85, delay: tableBuilt ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.groupBar}><span>FIXO · IDENTIFICAÇÃO</span><span>GRUPO 1 · PROJETO</span></div>
              <div className={styles.tableHeader}>
                <span>OS</span><span>PROJETO</span><span>SECRETARIA / INST.</span><span>TIPO</span><span>RESPONSÁVEL</span><span>DIAS</span><span>CRONOGRAMA</span><span>ESTÁGIO ATUAL</span>
              </div>
              <div className={styles.rows}>
                {ROWS.map((row, index) => (
                  <motion.div
                    key={row.os}
                    className={`${styles.tableRow} ${index === 0 && rowSpotlight ? styles.rowSourceHidden : ""}`}
                    initial={false}
                    animate={{ opacity: tableBuilt ? 1 : 0, x: tableBuilt ? 0 : -58, y: tableBuilt ? 0 : 6 }}
                    transition={{ duration: 0.62, delay: tableBuilt ? 0.48 + index * 0.13 : 0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={styles.osCell}>{row.os}</span>
                    <span className={styles.projectCell}>{row.project}</span>
                    <span>{row.institution}</span>
                    <span><em className={styles.typePill}>{row.type}</em></span>
                    <span className={styles.person}><i>{row.responsible[0]}</i>{row.responsible}</span>
                    <span className={styles.days}>{row.days}</span>
                    <span><em className={`${styles.schedule} ${row.schedule === "Datas" ? styles.warn : ""}`}>{row.schedule}</em></span>
                    <span><em className={styles.stagePill}><b>{row.health}</b>{row.stage}</em></span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.main>

          <AnimatePresence>
            {rowSpotlight && (
              <>
                <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.48 }} />
                <motion.div className={styles.spotlightRow} initial={{ opacity: 0, y: 42, scale: 0.76 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: 0.94 }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={styles.spotlightTop}><span className={styles.osBadge}>OS #{selected.os}</span><strong>{selected.project}</strong><span className={styles.healthBadge}>{selected.health}/100</span></div>
                  <div className={styles.spotlightGrid}>
                    <div><small>Instituição</small><b>{selected.institution}</b></div>
                    <div><small>Responsável</small><b>{selected.responsible}</b></div>
                    <div><small>Prazo</small><b>{selected.days}</b></div>
                    <div><small>Cronograma</small><b>{selected.schedule}</b></div>
                    <div><small>Estágio atual</small><b>{selected.stage}</b></div>
                    <div><small>Valor planejado</small><b>R$ {selected.value}</b></div>
                  </div>
                </motion.div>
                <motion.div className={`${styles.callout} ${styles.rowCallout}`} initial={{ opacity: 0, x: 30, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.55, delay: 0.72 }}>
                  <small>Cada OS em contexto</small><strong>Abra uma linha e veja o que realmente precisa de atenção.</strong>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div className={styles.drawerBackdrop} initial={false} animate={{ opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.45 }} />
          <motion.aside className={styles.drawer} initial={false} animate={{ x: drawerOpen ? "0%" : "104%", opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className={styles.drawerHeader}>
              <div><span className={styles.drawerIcon}>✓</span><div><strong>OS #10</strong><p>130 - N° 09/2025 - MANUTENÇÃO EM SUBESTAÇÃO</p></div></div><button>×</button>
            </div>
            <div className={styles.drawerTabs}><b>Resumo</b><span>Tarefas</span><span>Registros</span><span>Comentários</span></div>
            <section className={styles.drawerSection}>
              <h4>Estágio atual</h4>
              <div className={styles.stageCard}>
                <div className={styles.stageCardTop}><small>ETAPA</small><em>FORA DO SLA</em></div>
                <h3>EM ANDAM.</h3>
                <div className={styles.stageMetrics}><div><small>Dias no estágio</small><strong>57<em>/30</em></strong></div><div><small>Saldo SLA</small><strong>+27</strong></div><div><small>Regressões</small><strong>1</strong></div></div>
                <p>⊙ <b>Sugestão: avançar para ELAB.REL.</b></p>
                <button className={styles.primaryAction}>→ Avançar para próximo estágio</button>
                <button className={styles.secondaryAction}>📎 Arquivos desta OS</button>
              </div>
            </section>
            <section className={styles.drawerSection}>
              <h4>Saúde da OS</h4>
              <div className={styles.healthCard}><div><small>SAÚDE</small><em>⚠ ATENÇÃO</em></div><div className={styles.healthScore}><strong>54<small>/100</small></strong><b>4,1×</b></div><span><i></i></span><p>Momentum estagnado · 0 dias sem evolução</p></div>
            </section>
          </motion.aside>

          <AnimatePresence>
            {drawerCallouts && (
              <>
                <motion.div className={`${styles.callout} ${styles.stageCallout}`} initial={{ opacity: 0, x: -24, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, delay: 0.35 }}><small>Próximo passo claro</small><strong>Estágio, SLA e ação recomendada no mesmo contexto.</strong></motion.div>
                <motion.div className={`${styles.callout} ${styles.healthCallout}`} initial={{ opacity: 0, x: -24, scale: 0.94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55, delay: 1.0 }}><small>Saúde da OS</small><strong>Risco e progresso ficam visíveis sem trocar de tela.</strong></motion.div>
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {intro && !reducedMotion && (
              <motion.div className={styles.brandIntro} initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.035 }} transition={{ duration: 0.72 }}>
                <div className={styles.dropField}>{Array.from({ length: 14 }, (_, index) => <Drop key={index} index={index} />)}</div>
                <motion.div className={styles.brandWordmark} initial={{ opacity: 0, y: 18, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                  <span className={styles.brandMark}>DR</span><strong>TASKS</strong><small>Operação clara. Próxima ação visível.</small>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
