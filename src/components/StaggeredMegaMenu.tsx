"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";
import { megaMenuActions, megaMenuItems } from "@/lib/megaMenu";
import styles from "./StaggeredMegaMenu.module.css";

const PANEL_ID = "drtasks-staggered-mega-menu";

export function StaggeredMegaMenu() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    gsap.set([panel, ...layers], { xPercent: 105 });
    const backdrop = overlay.querySelector<HTMLElement>("[data-mega-backdrop]");
    if (backdrop) gsap.set(backdrop, { opacity: 0 });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const layers = layerRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!overlay || !panel) return;

    timelineRef.current?.kill();
    const labels = Array.from(panel.querySelectorAll<HTMLElement>("[data-mega-label]"));
    const numbers = Array.from(panel.querySelectorAll<HTMLElement>("[data-mega-number]"));
    const backdrop = overlay.querySelector<HTMLElement>("[data-mega-backdrop]");

    if (reducedMotion) {
      gsap.set([panel, ...layers], { xPercent: open ? 0 : 105 });
      if (backdrop) gsap.set(backdrop, { opacity: open ? 1 : 0 });
      gsap.set(labels, { yPercent: open ? 0 : 120, rotate: 0 });
      gsap.set(numbers, { opacity: open ? 1 : 0 });
      return;
    }

    if (open) {
      gsap.set(labels, { yPercent: 125, rotate: 7 });
      gsap.set(numbers, { opacity: 0 });

      const tl = gsap.timeline();
      timelineRef.current = tl;
      if (backdrop) tl.to(backdrop, { opacity: 1, duration: 0.28, ease: "power2.out" }, 0);
      layers.forEach((layer, index) => {
        tl.fromTo(
          layer,
          { xPercent: 105 },
          { xPercent: 0, duration: 0.5, ease: "power4.out" },
          index * 0.065,
        );
      });
      const panelStart = Math.max(0.12, layers.length * 0.065 + 0.02);
      tl.fromTo(
        panel,
        { xPercent: 105 },
        { xPercent: 0, duration: 0.66, ease: "power4.out" },
        panelStart,
      );
      tl.to(
        labels,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.075,
        },
        panelStart + 0.12,
      );
      tl.to(
        numbers,
        { opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.06 },
        panelStart + 0.2,
      );
    } else {
      const tl = gsap.timeline();
      timelineRef.current = tl;
      tl.to([panel, ...layers.slice().reverse()], {
        xPercent: 105,
        duration: 0.34,
        ease: "power3.in",
        stagger: 0.025,
      });
      if (backdrop) tl.to(backdrop, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0.06);
    }

    return () => timelineRef.current?.kill();
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, open]);

  const handleNavigate = () => {
    closeMenu();
  };

  return (
    <div className={styles.root}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-label={open ? "Fechar menu completo" : "Abrir menu completo"}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.icon} aria-hidden="true">
          <span className={styles.iconLine} />
          <span className={`${styles.iconLine} ${styles.iconLineVertical}`} />
        </span>
      </button>

      <div
        ref={overlayRef}
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={styles.backdrop}
          data-mega-backdrop
          aria-label="Fechar menu"
          tabIndex={open ? 0 : -1}
          onClick={closeMenu}
        />

        <div ref={(node) => { layerRefs.current[0] = node; }} className={`${styles.layer} ${styles.layerSoft}`} aria-hidden="true" />
        <div ref={(node) => { layerRefs.current[1] = node; }} className={`${styles.layer} ${styles.layerBright}`} aria-hidden="true" />
        <div ref={(node) => { layerRefs.current[2] = node; }} className={`${styles.layer} ${styles.layerDeep}`} aria-hidden="true" />

        <aside
          ref={panelRef}
          id={PANEL_ID}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu completo do Dr. Tasks"
        >
          <div className={styles.panelTop}>
            <Image
              className={styles.wordmark}
              src="/brand/dr-tasks-wordmark.png"
              alt="Dr. Tasks"
              width={553}
              height={98}
              priority={false}
            />
            <p className={styles.panelKicker}>Clareza em movimento</p>
          </div>

          <nav className={styles.nav} aria-label="Navegação completa">
            <ol className={styles.list}>
              {megaMenuItems.map((item) => (
                <li className={styles.itemWrap} key={item.href}>
                  <Link className={styles.item} href={item.href} onClick={handleNavigate}>
                    <span className={styles.itemMain}>
                      <span className={styles.itemLabel} data-mega-label>{item.label}</span>
                      <span className={styles.itemEyebrow}>{item.eyebrow}</span>
                    </span>
                    <span className={styles.itemNumber} data-mega-number aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.panelFooter}>
            <div className={styles.footerCopy}>
              <strong>Veja a operação sem pontos cegos.</strong>
              <span>FluxOS, responsáveis, prazos e próximas ações em uma leitura só.</span>
            </div>
            <div className={styles.footerActions}>
              <Link className={styles.login} href={megaMenuActions.login.href} onClick={handleNavigate}>
                {megaMenuActions.login.label}
              </Link>
              <Link className={styles.primary} href={megaMenuActions.primary.href} onClick={handleNavigate}>
                {megaMenuActions.primary.label}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
