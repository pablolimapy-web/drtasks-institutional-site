"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { homeNavItems, primaryCta } from "@/lib/commercial";
import { Logo } from "./Logo";
import { StaggeredMegaMenu } from "./StaggeredMegaMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = homeNavItems
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
      {
        rootMargin: "-20% 0px -58% 0px",
        threshold: [0.05, 0.2, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav-shell">
        <Link href="/" className="logo-link" aria-label="Dr. Tasks — início">
          <Logo />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {homeNavItems.map((item) => (
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
          <Link className="login-link" href="/login">
            Entrar
          </Link>
          <Link className="button button-primary button-small" href={primaryCta.href}>
            {primaryCta.label}
          </Link>
          <StaggeredMegaMenu />
        </div>
      </div>
    </header>
  );
}
