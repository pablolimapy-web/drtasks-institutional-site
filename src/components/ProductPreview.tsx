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
  progress: number;
  priority: "M" | "A";
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

const STAGES = [
  { label: "ORÇAMENTO", color: "#5B6FE8" },
  { label: "ENVIADA", color: "#4E7BF2" },
  { label: "APROVADO", color: "#3C88E8" },
  { label: "CONTRATO", color: "#2C97D8" },
  { label: "AG.PGTO", color: "#2D9FCF" },
  { label: "EM ANDAM.", color: "#28A8C7" },
  { label: "ELAB.REL.", color: "#27AEC0" },
] as const;

const ROWS: FluxRow[] = [
  { os: "10", project: "130 - N° 09/2025 - MANUTENÇÃO EM SUBESTAÇÃO", institution: "130 - ANATEL SC", type: "Serviço", responsible: "Ryan Lucca", days: "57d", schedule: "Definido", stage: "EM ANDAM.", health: 54, progress: 45, priority: "M", tag: "compras", value: "46.355,95" },
  { os: "11", project: "130 - N° 06/2025 - IMPLANTAÇÃO DE SHP", institution: "130 - ANATEL SC", type: "Serviço", responsible: "Ryan Lucca", days: "52d", schedule: "Definido", stage: "EM ANDAM.", health: 87, progress: 13, priority: "M", value: "139.000,00" },
  { os: "13", project: "102 - LT14 - OS 663/1130 - MANUTENÇÃO DE COBERTURA", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 31, priority: "A", value: "3.650,28" },
  { os: "14", project: "102 - LT14 - OS 1790 - PROTEÇÃO CONTRA SINANTRÓPICOS", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 28, priority: "A", value: "3.459,53" },
  { os: "15", project: "102 - LT14 - OS 1770 - REPARO ESTRUTURAL EM CONCRETO", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 34, priority: "A", value: "4.098,45" },
  { os: "16", project: "102 - LT14 - OS 1771 - INSPEÇÃO E REPARO ESTRUTURAL", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "50d", schedule: "Datas", stage: "AG.PGTO", health: 76, progress: 29, priority: "A", value: "5.298,74" },
  { os: "20", project: "102 - LT16 - OS 362 - REVESTIMENTO DE BANHEIRO", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "78d", schedule: "Datas", stage: "CONTRATO", health: 87, progress: 61, priority: "A", value: "894,24" },
  { os: "22", project: "102 - LT16 - OS 1583 - INFRAESTRUTURA DE PROJEÇÃO", institution: "102 - SESA PR", type: "Serviço", responsible: "Kaiky Silva Oliveira", days: "64d", schedule: "Datas", stage: "APROVADO", health: 79, progress: 42, priority: "A", value: "2.234,55" },
];

const NAV = ["Dashboard", "Instituições", "Projetos", "Tarefas", "FluxOS", "Arquivos", "Localização", "Financeiro", "Chat", "Usuários"];
const NAV_ICONS = ["◉", "⌘", "▦", "□", "ϟ", "▱", "⌖", "◇", "▢", "◌"];

function Drop({ index }: { index: number }) {
  return <span className={styles.drop} style={{ "--i": index } as React.CSSProperties} />;
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
  const tableScaffold = sceneIndex >= 2;
  const tableRowsReady = sceneIndex >= 3;
  const rowSpotlight = scene.id === "rowSpotlight";
  const drawerOpen = sceneIndex >= 5;
  const showKpiAnnotations = scene.id === "kpiFocus";
  const showTableAnnotation = scene.id === "tableBuild" || scene.id === "rowSpotlight";
  const showDrawerAnnotation = scene.id === "drawer" || scene.id === "drawerCallouts";
  const selected = ROWS[0];

  return (
    <div className={styles.showcase} role="img" aria-label="Apresentação animada do FluxOS">
      <motion.div
        className={styles.frame}
        initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.975, rotateX: 1.5 }}
        animate={{ opacity: 1, y: 0, scale: drawerOpen ? 1.008 : 1, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.screen}>
          <div className={styles.screenTexture} />

          <motion.aside
            className={styles.sidebar}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : -56, filter: shellBuilt ? "blur(0px)" : "blur(7px)" }}
            transition={{ duration: 0.9, delay: shellBuilt ? 0.04 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.logoRow}>
              <span className={styles.menuGlyph}>☰</span>
              <img src="/hero/drtasks-wordmark.png" alt="DR TASKS" className={styles.sidebarLogo} />
            </div>
            <div className={styles.sideNav}>
              {NAV.map((item, index) => (
                <motion.div
                  key={item}
                  className={`${styles.navItem} ${item === "FluxOS" ? styles.navActive : ""}`}
                  initial={false}
                  animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : -20 }}
                  transition={{ duration: 0.44, delay: shellBuilt ? 0.22 + index * 0.052 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span>{NAV_ICONS[index]}</span>{item}
                </motion.div>
              ))}
            </div>
          </motion.aside>

          <motion.header
            className={styles.topbar}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, y: shellBuilt ? 0 : -42, filter: shellBuilt ? "blur(0px)" : "blur(7px)" }}
            transition={{ duration: 0.82, delay: shellBuilt ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.toggle}></span>
            <div className={styles.search}><span>⌕</span><span>Pesquise aqui</span></div>
            <div className={styles.topActions}><span>▢</span><span>♢</span><span>✧</span><b>PL</b></div>
          </motion.header>

          <motion.main
            className={styles.appMain}
            initial={false}
            animate={{ opacity: shellBuilt ? 1 : 0, y: shellBuilt ? 0 : 28 }}
            transition={{ duration: 0.9, delay: shellBuilt ? 0.18 : 0, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className={styles.titleBar}
              initial={false}
              animate={{ opacity: shellBuilt ? 1 : 0, x: shellBuilt ? 0 : 34 }}
              transition={{ duration: 0.7, delay: shellBuilt ? 0.42 : 0 }}
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
                    y: shellBuilt ? (kpiFocus ? -7 - (index % 2) * 2 : 0) : 24,
                    scale: kpiFocus ? 1.04 : 1,
                    boxShadow: kpiFocus ? "0 14px 34px rgba(38, 61, 103, 0.11)" : "0 4px 12px rgba(34, 49, 77, 0.025)",
                  }}
                  transition={{ duration: 0.66, delay: shellBuilt ? 0.58 + index * 0.14 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div><i></i><strong>{item.value}</strong></div><span>{item.label}</span>
                </motion.article>
              ))}
            </div>

            <motion.section
              className={styles.tableCard}
              initial={false}
              animate={{ opacity: tableScaffold ? 1 : 0, y: tableScaffold ? 0 : 38, scale: tableScaffold ? 1 : 0.982 }}
              transition={{ duration: 0.92, delay: tableScaffold ? 0.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className={styles.tableScaffold}
                initial={false}
                animate={{ opacity: tableScaffold ? 1 : 0, clipPath: tableScaffold ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" }}
                transition={{ duration: 1.1, delay: tableScaffold ? 0.42 : 0, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.groupBar}><span>FIXO · IDENTIFICAÇÃO</span><span>GRUPO 1 · PROJETO</span></div>
                <div className={styles.stageRail}>
                  <span className={styles.stageRailLabel}>FLUXO</span>
                  {STAGES.map((stage, index) => (
                    <motion.span
                      key={stage.label}
                      className={styles.stageRailItem}
                      style={{ "--stage": stage.color } as React.CSSProperties}
                      initial={false}
                      animate={{ opacity: tableScaffold ? 1 : 0, y: tableScaffold ? 0 : -8 }}
                      transition={{ duration: 0.38, delay: tableScaffold ? 0.68 + index * 0.07 : 0 }}
                    >
                      <i />{stage.label}
                    </motion.span>
                  ))}
                </div>
                <div className={styles.tableHeader}>
                  <span>OS</span><span>PROJETO</span><span>SECRETARIA / INST.</span><span>TIPO</span><span>RESPONSÁVEL</span><span>DIAS</span><span>CRONOGRAMA</span><span>ESTÁGIO ATUAL</span><span>% HOJE</span>
                </div>
              </motion.div>

              <div className={styles.rows}>
                {ROWS.map((row, index) => (
                  <motion.div
                    key={row.os}
                    className={`${styles.tableRow} ${index === 0 && rowSpotlight ? styles.rowSourceHidden : ""}`}
                    initial={false}
                    animate={{ opacity: tableRowsReady ? 1 : 0, x: tableRowsReady ? 0 : -78, y: tableRowsReady ? 0 : 7 }}
                    transition={{ duration: 0.68, delay: tableRowsReady ? 0.42 + index * 0.16 : 0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={styles.osCell}>{row.os}</span>
                    <span className={styles.projectCell}>{row.project}</span>
                    <span>{row.institution}</span>
                    <span><em className={styles.typePill}>{row.type}</em></span>
                    <span className={styles.person}><i>{row.responsible[0]}</i>{row.responsible}</span>
                    <span className={styles.days}>{row.days}</span>
                    <span><em className={`${styles.schedule} ${row.schedule === "Datas" ? styles.warn : ""}`}>{row.schedule}</em></span>
                    <span><em className={styles.stagePill}><b>{row.health}</b>{row.stage}</em></span>
                    <span className={styles.progressCell}><i><b style={{ width: `${row.progress}%` }} /></i><strong>{row.progress}%</strong></span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.main>

          <AnimatePresence>
            {rowSpotlight && (
              <>
                <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} />
                <motion.div className={styles.spotlightRow} initial={{ opacity: 0, y: 64, scale: 0.68, rotateX: -5 }} animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} exit={{ opacity: 0, y: -20, scale: 0.94 }} transition={{ duration: 1.02, ease: [0.16, 1, 0.3, 1] }}>
                  <div className={styles.spotlightTop}><span className={styles.osBadge}>OS #{selected.os}</span><strong>{selected.project}</strong><span className={styles.healthBadge}>Saúde {selected.health}/100</span></div>
                  <div className={styles.spotlightGrid}>
                    <div><small>Instituição</small><b>{selected.institution}</b></div>
                    <div><small>Responsável</small><b>{selected.responsible}</b></div>
                    <div><small>Prazo</small><b>{selected.days}</b></div>
                    <div><small>Cronograma</small><b>{selected.schedule}</b></div>
                    <div><small>Estágio atual</small><b>{selected.stage}</b></div>
                    <div><small>Valor planejado</small><b>R$ {selected.value}</b></div>
                  </div>
                  <div className={styles.spotlightProgress}><span><i style={{ width: `${selected.progress}%` }} /></span><b>{selected.progress}% concluído</b></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div className={styles.drawerBackdrop} initial={false} animate={{ opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.52 }} />
          <motion.aside className={styles.drawer} initial={false} animate={{ x: drawerOpen ? "0%" : "106%", opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
            <div className={styles.drawerHeader}>
              <div><span className={styles.drawerIcon}>✓</span><div><strong>OS #10</strong><p>130 - N° 09/2025 - MANUTENÇÃO EM SUBESTAÇÃO</p></div></div><button>×</button>
            </div>
            <div className={styles.drawerTabs}><b>Resumo</b><span>Tarefas</span><span>Registros</span><span>Comentários</span></div>
            <section className={styles.drawerSection}>
              <h4>Estágio atual</h4>
              <motion.div className={styles.stageCard} initial={false} animate={{ y: drawerOpen ? 0 : 18, opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.62, delay: drawerOpen ? 0.52 : 0 }}>
                <div className={styles.stageCardTop}><small>ETAPA</small><em>FORA DO SLA</em></div>
                <h3>EM ANDAM.</h3>
                <div className={styles.stageMetrics}><div><small>Dias no estágio</small><strong>57<em>/30</em></strong></div><div><small>Saldo SLA</small><strong>+27</strong></div><div><small>Regressões</small><strong>1</strong></div></div>
                <p>⊙ <b>Sugestão: avançar para ELAB.REL.</b></p>
                <button className={styles.primaryAction}>→ Avançar para próximo estágio</button>
                <button className={styles.secondaryAction}>📎 Arquivos desta OS</button>
              </motion.div>
            </section>
            <section className={styles.drawerSection}>
              <h4>Saúde da OS</h4>
              <motion.div className={styles.healthCard} initial={false} animate={{ y: drawerOpen ? 0 : 18, opacity: drawerOpen ? 1 : 0 }} transition={{ duration: 0.62, delay: drawerOpen ? 0.74 : 0 }}><div><small>SAÚDE</small><em>⚠ ATENÇÃO</em></div><div className={styles.healthScore}><strong>54<small>/100</small></strong><b>4,1×</b></div><span><motion.i initial={false} animate={{ width: drawerOpen ? "54%" : "0%" }} transition={{ duration: 1, delay: drawerOpen ? 1.0 : 0 }} /></span><p>Momentum estagnado · 0 dias sem evolução</p></motion.div>
            </section>
          </motion.aside>

          <AnimatePresence>
            {intro && !reducedMotion && (
              <motion.div className={styles.brandIntro} initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.035, filter: "blur(2px)" }} transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}>
                <div className={styles.brandGrid} />
                <div className={styles.dropField}>{Array.from({ length: 18 }, (_, index) => <Drop key={index} index={index} />)}</div>
                <span className={`${styles.brandOrb} ${styles.brandOrbOne}`} />
                <span className={`${styles.brandOrb} ${styles.brandOrbTwo}`} />
                <motion.div className={styles.brandWordmark} initial={{ opacity: 0, y: 26, scale: 0.84 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.05, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}>
                  <motion.div className={styles.brandLogoShell} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.1, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}>
                    <img src="/hero/drtasks-wordmark.png" alt="DR TASKS" className={styles.brandLogoImage} />
                    <motion.span className={styles.brandSweep} initial={{ x: "-150%" }} animate={{ x: "190%" }} transition={{ duration: 1.45, delay: 1.0, ease: "easeInOut" }} />
                  </motion.div>
                  <motion.span className={styles.brandUnderline} initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 1.45, ease: [0.16, 1, 0.3, 1] }} />
                  <motion.small initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 1.65 }}>Operação clara. Próxima ação visível.</motion.small>
                </motion.div>
                <motion.div className={styles.brandLaunchLine} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3, delay: 2.0, ease: [0.16, 1, 0.3, 1] }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className={styles.externalAnnotations} aria-hidden="true">
        <AnimatePresence mode="sync">
          {showKpiAnnotations && (
            <>
              <motion.div
                key="kpi-metric"
                className={`${styles.externalAnnotation} ${styles.annotationTop} ${styles.annotationTopLeft}`}
                initial={{ opacity: 0, x: -28, y: 10, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -14, y: -4, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.78 }}
              >
                <div className={`${styles.externalPill} ${styles.externalDriftOne}`}>
                  <i />
                  <span>R$ 3,1M organizados no FluxOS</span>
                </div>
              </motion.div>
              <motion.div
                key="kpi-context"
                className={`${styles.externalAnnotation} ${styles.annotationTop} ${styles.annotationTopRight}`}
                initial={{ opacity: 0, x: 30, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 14, y: -4, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 170, damping: 21, mass: 0.8, delay: 0.18 }}
              >
                <div className={`${styles.externalCard} ${styles.externalDriftTwo}`}>
                  <span className={styles.externalEyebrow}>Operação ao vivo</span>
                  <strong>267 OS ativas em um só fluxo.</strong>
                  <small>Indicadores operacionais entram antes da leitura detalhada da tabela.</small>
                </div>
              </motion.div>
            </>
          )}

          {showTableAnnotation && (
            <motion.div
              key="table-context"
              className={`${styles.externalAnnotation} ${styles.annotationBottom} ${styles.annotationBottomLeft}`}
              initial={{ opacity: 0, x: -24, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, y: 4, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 175, damping: 23, mass: 0.78 }}
            >
              <div className={`${styles.externalPill} ${styles.externalDriftThree}`}>
                <i />
                <span>Timeline, responsáveis e próximos passos.</span>
              </div>
            </motion.div>
          )}

          {showDrawerAnnotation && (
            <motion.div
              key="drawer-context"
              className={`${styles.externalAnnotation} ${styles.annotationBottom} ${styles.annotationBottomRight}`}
              initial={{ opacity: 0, x: 28, y: -12, scale: 0.93 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 14, y: 5, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 168, damping: 22, mass: 0.8 }}
            >
              <div className={`${styles.externalCard} ${styles.externalDriftFour}`}>
                <span className={styles.externalEyebrow}>Próxima ação</span>
                <strong>Drawer, SLA e saúde da OS.</strong>
                <small>O contexto detalhado aparece só quando a apresentação chega à OS.</small>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
