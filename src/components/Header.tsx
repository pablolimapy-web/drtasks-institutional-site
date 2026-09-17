"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navItems } from "@/lib/site";
import { Logo } from "./Logo";
import { MenuIcon, XIcon } from "./Icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-20% 0px -58% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-shell">
        <Link href="/" className="logo-link"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className={activeHref === item.href ? "is-active" : ""}
              aria-current={activeHref === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <Link className="login-link" href="/login">Entrar</Link>
          <Link className="button button-primary button-small" href="/teste-gratis">Testar grátis</Link>
          <button className="mobile-menu-button" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="mobile-nav"
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container mobile-nav-inner">
              {navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  className={activeHref === item.href ? "is-active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link href="/login" onClick={() => setOpen(false)}>Entrar</Link>
              <Link className="button button-primary" href="/teste-gratis" onClick={() => setOpen(false)}>Testar grátis</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
