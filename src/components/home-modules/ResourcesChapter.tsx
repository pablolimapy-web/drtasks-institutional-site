"use client";

import Image from "next/image";
import { animate, stagger } from "animejs";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./ResourcesChapter.module.css";

type IconName =
  | "camera"
  | "pin"
  | "file"
  | "checklist"
  | "folder"
  | "image"
  | "link"
  | "dashboard"
  | "project"
  | "task"
  | "team"
  | "finance"
  | "resources"
  | "search"
  | "filter"
  | "plus"
  | "settings"
  | "chevron";

const fieldItems = [
  { kind: "photo", icon: "camera" as const, title: "Foto no campo", meta: "12/06/2026 · Obra Residencial" },
  { kind: "map", icon: "pin" as const, title: "Localização", meta: "-23.3101, -51.1629" },
  { kind: "document", icon: "file" as const, title: "Documento", meta: "Laudo técnico.pdf · 2,4 MB" },
  { kind: "worker", icon: "checklist" as const, title: "Registro", meta: "Check-list de segurança" },
] as const;

const evidenceCards = [
  { kind: "structure", title: "Estrutura · Bloco A", meta: "Foto · 12/06/2026", owner: "JS", image: "/product/pillars/resources.jpg" },
  { kind: "document", title: "Laudo técnico", meta: "PDF · 2,4 MB", owner: "AC", image: "/product/resources/field-document.png" },
  { kind: "location", title: "Localização da obra", meta: "Coordenadas", owner: "PL", image: "/product/resources/location.jpg" },
  { kind: "installation", title: "Instalações elétricas", meta: "Foto · 10/06/2026", owner: "RM", image: "/product/resources/files.jpg" },
  { kind: "field", title: "Concretagem · Ala B", meta: "Foto · 09/06/2026", owner: "JS", image: "/product/resources/field-photo.png" },
  { kind: "checklist", title: "Check-list de segurança", meta: "Concluído · 18 itens", owner: "RM", image: "/product/resources/field-record.png" },
  { kind: "map", title: "Ponto de inspeção", meta: "GPS · Londrina/PR", owner: "PL", image: "/product/resources/field-location.png" },
  { kind: "document", title: "Memorial descritivo", meta: "PDF · 1,8 MB", owner: "AC", image: "/product/resources/field-document.png" },
] as const;

const featureItems = [
  { icon: "pin" as const, title: "Localização", text: "Registros com coordenadas e mapa" },
  { icon: "file" as const, title: "Documentos", text: "Arquivos sempre vinculados" },
  { icon: "image" as const, title: "Evidências", text: "Fotos, vídeos e anotações do campo" },
  { icon: "link" as const, title: "Contexto no projeto", text: "Tudo organizado por projeto, etapa e tarefa" },
] as const;

const connectorPaths = [
  "M276 68 C320 68 306 194 329 194",
  "M276 152 C312 152 312 194 329 194",
  "M276 236 C312 236 312 194 329 194",
  "M276 320 C320 320 306 194 329 194",
] as const;

function ResourceIcon({ name }: { name: IconName }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

  if (name === "camera") return <svg {...common}><path d="M4 8h3l1.5-2h7L17 8h3v10H4z"/><circle cx="12" cy="13" r="3.2"/></svg>;
  if (name === "pin") return <svg {...common}><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11z"/><circle cx="12" cy="10" r="2"/></svg>;
  if (name === "file") return <svg {...common}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 13h5M10 17h5"/></svg>;
  if (name === "checklist") return <svg {...common}><rect x="5" y="3" width="14" height="18" rx="2"/><path d="m8.5 9 1.5 1.5 3-3M14 10h2M8.5 15H16"/></svg>;
  if (name === "folder") return <svg {...common}><path d="M3 7h7l2 2h9v10H3z"/></svg>;
  if (name === "image") return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>;
  if (name === "link") return <svg {...common}><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/></svg>;
  if (name === "dashboard") return <svg {...common}><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>;
  if (name === "project") return <svg {...common}><rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 9h8M8 13h5"/></svg>;
  if (name === "task") return <svg {...common}><path d="M6 4h12v16H6z"/><path d="m9 10 1.5 1.5L14 8M9 15h6"/></svg>;
  if (name === "team") return <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3 0 5 1.5 5.5 4"/></svg>;
  if (name === "finance") return <svg {...common}><path d="M4 7h16M5 7l7-4 7 4M6 10v7M10 10v7M14 10v7M18 10v7M4 20h16"/></svg>;
  if (name === "resources") return <svg {...common}><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="7"/></svg>;
  if (name === "search") return <svg {...common}><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 5 5"/></svg>;
  if (name === "filter") return <svg {...common}><path d="M4 6h16l-6.5 7v5l-3 2v-7z"/></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
  if (name === "settings") return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1A8 8 0 0 0 15 6l-.3-2.5h-4L10.3 6a8 8 0 0 0-1.8 1L6 6 4 9.5 6 11a7 7 0 0 0 0 2l-2 1.5L6 18l2.5-1a8 8 0 0 0 1.8 1l.4 2.5h4L15 18a8 8 0 0 0 1.5-1l2.5 1 2-3.5-2-1.5a7 7 0 0 0 0-1z"/></svg>;
  return <svg {...common}><path d="m8 10 4 4 4-4"/></svg>;
}

export function ResourcesChapter() {
  const module = getModuleShowcaseModule("resources");
  const reducedMotion = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const wasVisible = useRef(false);
  const [sceneRun, setSceneRun] = useState(0);
  const [sceneActive, setSceneActive] = useState(reducedMotion);
  const [opening, setOpening] = useState(false);
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setOpening(false);
      setSceneActive(true);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
      if (visible && !wasVisible.current) {
        wasVisible.current = true;
        setSceneRun((value) => value + 1);
        setSceneActive(false);
        setOpening(true);
      } else if (!entry.isIntersecting && wasVisible.current) {
        wasVisible.current = false;
        setOpening(false);
        setSceneActive(false);
      }
    }, { threshold: [0, 0.18, 0.45] });

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !opening) return;

    const timer = window.setTimeout(() => {
      setOpening(false);
      if (wasVisible.current) setSceneActive(true);
    }, 2600);

    return () => window.clearTimeout(timer);
  }, [opening, reducedMotion]);

  const storyActive = reducedMotion || (sceneActive && !opening);

  useEffect(() => {
    if (reducedMotion || !storyActive) {
      setActiveEvidenceIndex(0);
      return;
    }

    const timer = window.setInterval(() => {
      setActiveEvidenceIndex((index) => (index + 1) % evidenceCards.length);
    }, 1850);

    return () => window.clearInterval(timer);
  }, [reducedMotion, storyActive, sceneRun]);

  useEffect(() => {
    if (reducedMotion || !storyActive) return;
    const root = sectionRef.current;
    if (!root) return;

    const fieldAnimation = animate(root.querySelectorAll("[data-resource-field]"), {
      opacity: [0, 1],
      y: [18, 0],
      scale: [0.985, 1],
      delay: stagger(90, { start: 190 }),
      duration: 680,
      ease: "out(4)",
    });

    const featureAnimation = animate(root.querySelectorAll("[data-resource-feature]"), {
      opacity: [0, 1],
      y: [14, 0],
      delay: stagger(90, { start: 1320 }),
      duration: 620,
      ease: "out(4)",
    });

    return () => {
      fieldAnimation.pause();
      featureAnimation.pause();
    };
  }, [reducedMotion, storyActive, sceneRun]);

  const show = storyActive;
  const enter = (delay: number, y = 18) => reducedMotion ? {} : {
    initial: { opacity: 0, y, filter: "blur(8px)" },
    animate: show ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(8px)" },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <section ref={sectionRef} id={module.anchor} className={styles.section} aria-labelledby="resources-title">
      <div className={styles.ambient} aria-hidden="true"><i/><i/><i/></div>

      <AnimatePresence initial={false}>
        {opening ? (
          <motion.div
            key="resources-opening"
            className={styles.sectionOpening}
            initial={reducedMotion ? false : { opacity: 0, filter: "blur(16px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025, filter: "blur(14px)" }}
            transition={{ duration: reducedMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <motion.span
              className={styles.openingEyebrow}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : 0.1 }}
            >
              DR.TASKS / MÓDULO 05
            </motion.span>

            <div className={styles.openingTitleRow}>
              <motion.span
                className={styles.openingIndex}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.82, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                05
              </motion.span>

              <motion.div
                className={styles.openingTitle}
                initial={reducedMotion ? false : { opacity: 0, x: 30, filter: "blur(9px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: reducedMotion ? 0 : 0.78, delay: reducedMotion ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <strong>RECURSOS</strong>
                <span>COM CONTEXTO</span>
              </motion.div>
            </div>

            <motion.div
              className={styles.openingBridge}
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.18 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.9, delay: reducedMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                ["01", "CAMPO"],
                ["02", "EVIDÊNCIA"],
                ["03", "CONTEXTO"],
                ["04", "PROJETO"],
              ].map(([index, label]) => (
                <span className={styles.openingBridgeNode} key={label}>
                  <i>{index}</i>
                  <b>{label}</b>
                </span>
              ))}
              <span className={styles.openingBridgeLine}><i /></span>
            </motion.div>

            <motion.p
              className={styles.openingStatement}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.72 }}
            >
              O que acontece no campo precisa voltar para o projeto com contexto.
            </motion.p>
            <span className={styles.openingGlow} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        className={`${styles.inner} ${opening ? styles.innerOpening : ""}`}
        key={sceneRun}
        animate={opening && !reducedMotion
          ? { opacity: 0.14, scale: 0.988, filter: "blur(10px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.referenceGrid}>
          <motion.div className={styles.copy} {...enter(0.04, 24)}>
            <span className={styles.eyebrow}>05 / RECURSOS</span>
            <h2 id="resources-title">O que acontece<br/>no campo <em>precisa<br/>voltar para o projeto</em><br/>com contexto.</h2>
            <p>Localização, fotos, documentos e evidências deixam de ser informação solta e passam a fazer parte do trabalho ao qual pertencem.</p>
            <ModuleChapterLink href={module.href}>Conheça o módulo de Recursos</ModuleChapterLink>
          </motion.div>

          <div className={styles.fieldZone}>
            <motion.span className={styles.fieldLabel} {...enter(0.2, 10)}>CAMPO</motion.span>
            <div className={styles.fieldStack}>
              {fieldItems.map((item) => (
                <div
                  className={styles.fieldCard}
                  key={item.title}
                  data-resource-field
                  style={reducedMotion ? undefined : { opacity: 0 }}
                >
                  <div className={`${styles.fieldThumb} ${styles[item.kind]}`}>
                    <Image
                      src={`/product/resources/field-${item.kind === "map" ? "location" : item.kind === "worker" ? "record" : item.kind}.png`}
                      alt=""
                      fill
                      sizes="72px"
                    />
                  </div>
                  <span className={styles.fieldIcon}><ResourceIcon name={item.icon}/></span>
                  <div className={styles.fieldMeta}><strong>{item.title}</strong><small>{item.meta}</small></div>
                  <span className={styles.fieldCheck}>✓</span>
                </div>
              ))}
            </div>

            <svg className={styles.connectorMap} viewBox="0 0 387 350" preserveAspectRatio="none" aria-hidden="true">
              {connectorPaths.map((d, index) => (
                <g key={d}>
                  <motion.path
                    className={styles.connectorBase}
                    d={d}
                    initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.78, delay: 0.68 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {!reducedMotion && (
                    <motion.path
                      className={styles.fieldConnectorPulse}
                      d={d}
                      pathLength={1}
                      initial={{ pathLength: 0.12, pathOffset: 0, opacity: 0 }}
                      animate={show ? { pathOffset: [0, 0.88], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                      transition={{ duration: 2.8, delay: 1.25 + index * 0.28, repeat: Infinity, repeatDelay: 1.4, ease: "linear" }}
                    />
                  )}
                </g>
              ))}
              <motion.path
                className={styles.connectorBase}
                d="M354 194 C370 194 371 214 387 214"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.65, delay: 1.08 }}
              />
              {!reducedMotion && (
                <motion.path
                  className={styles.fieldConnectorPulse}
                  d="M354 194 C370 194 371 214 387 214"
                  pathLength={1}
                  initial={{ pathLength: 0.16, pathOffset: 0, opacity: 0 }}
                  animate={show ? { pathOffset: [0, 0.84], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
                  transition={{ duration: 2.1, delay: 2.15, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
                />
              )}
            </svg>

            <motion.span className={styles.fieldConnectorDot} {...enter(0.96, 0)} aria-hidden="true"/>
            <motion.span className={styles.productConnectorDot} {...enter(1.08, 0)} aria-hidden="true"/>
            <motion.div className={styles.linkHub} {...enter(1.02, 0)}>
              <span className={styles.hubIcon}><ResourceIcon name="file"/></span>
              <small className={styles.hubCaption}>Evidência vinculada<br/>ao projeto</small>
            </motion.div>
          </div>

          <motion.div className={styles.drTasksStage} {...enter(1.1, 28)}>
            <div className={styles.drTasksShell}>
              <div className={styles.appTop}>
              <b className={styles.appBrand}><span>◉</span> DR TASKS</b>
              <div className={styles.appSearch}><ResourceIcon name="search"/><span>Pesquisar...</span></div>
              <div className={styles.appActions}><i/><i/><i/><i/><strong>PL</strong></div>
            </div>

            <div className={styles.appBody}>
              <aside className={styles.appSidebar}>
                <div className={styles.menuItem}><ResourceIcon name="dashboard"/>Dashboard</div>
                <div className={`${styles.menuItem} ${styles.menuActive}`}><ResourceIcon name="project"/>Projetos</div>
                <div className={styles.menuItem}><ResourceIcon name="task"/>Tarefas</div>
                <div className={styles.menuItem}><ResourceIcon name="team"/>Equipe e Tempo</div>
                <div className={styles.menuItem}><ResourceIcon name="finance"/>Financeiro</div>
                <div className={`${styles.menuItem} ${styles.menuActiveSoft}`}><ResourceIcon name="resources"/>Recursos <span>⌃</span></div>
                <div className={styles.submenu}>Arquivos</div>
                <div className={styles.submenu}>Localização</div>
                <div className={`${styles.submenu} ${styles.submenuActive}`}>Evidências</div>
                <div className={styles.submenu}>Checklists</div>
                <div className={styles.submenu}>Relatórios</div>
                <div className={`${styles.menuItem} ${styles.settings}`}><ResourceIcon name="settings"/>Configurações</div>
              </aside>

              <main className={styles.appMain}>
                <div className={styles.breadcrumb}>Projetos <span>›</span> Reforma Sede</div>
                <div className={styles.projectTitle}>
                  <h3>Reforma Sede</h3>
                  <span className={styles.projectStatus}><i/> Em andamento</span>
                </div>

                <nav className={styles.projectTabs}>
                  <span>Visão geral</span><span>Tarefas</span><strong>Recursos</strong><span>Financeiro</span><span>Equipe</span><span>Relatórios</span>
                </nav>

                <section className={styles.evidencePanel}>
                  <header className={styles.evidenceHeader}>
                    <h4>Evidências <small>24</small></h4>
                    <div><button aria-label="Filtrar"><ResourceIcon name="filter"/></button><button><ResourceIcon name="plus"/>Adicionar evidência <ResourceIcon name="chevron"/></button></div>
                  </header>

                  <div className={styles.filters}>
                    <strong>Todas</strong><span>Fotos <i>12</i></span><span>Documentos <i>6</i></span><span>Checklists <i>4</i></span><span>Localizações <i>2</i></span>
                  </div>

                  <div className={styles.evidenceGrid}>
                    {evidenceCards.map((item, index) => {
                      const evidenceActive = index === activeEvidenceIndex;
                      return (
                      <motion.article
                        key={`${item.title}-${index}`}
                        className={evidenceActive ? styles.evidenceActive : undefined}
                        initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                        animate={show ? { opacity: 1, y: evidenceActive && !reducedMotion ? -5 : 0, scale: evidenceActive && !reducedMotion ? 1.018 : 1 } : { opacity: 0, y: 14, scale: 0.98 }}
                        transition={{
                          opacity: { delay: 1.42 + index * 0.065, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                          y: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                          scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                        }}
                      >
                        <div className={`${styles.evidenceImage} ${styles[item.kind]}`}>
                          <Image src={item.image} alt="" fill sizes="170px"/>
                        </div>
                        <div className={styles.evidenceMeta}><b>{item.title}</b><small>{item.meta}</small></div>
                        <footer><i>{item.owner}</i><span>Vinculado</span></footer>
                      </motion.article>
                      );
                    })}
                  </div>
                </section>
              </main>
            </div>

              <motion.div
                className={styles.scanLight}
                animate={show && !reducedMotion ? { x: ["-120%", "150%"] } : { x: "-120%" }}
                transition={{ delay: 1.85, duration: 2.2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div className={styles.featureRail} {...enter(1.48, 18)}>
          {featureItems.map((item) => (
            <div key={item.title} data-resource-feature style={reducedMotion ? undefined : { opacity: 0 }}>
              <i><ResourceIcon name={item.icon}/></i>
              <p><b>{item.title}</b><span>{item.text}</span></p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
