"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryCta } from "@/lib/commercial";
import { StaggeredMegaMenu } from "./StaggeredMegaMenu";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className={`container nav-shell ${styles.shell}`}>
        <Link href="/" className={styles.wordmarkLink} aria-label="Dr. Tasks — início">
          <Image
              className={styles.wordmark}
              src="/brand/dr-tasks-wordmark.png"
              alt="Dr. Tasks"
              width={150}
              height={27}
              priority
          />
        </Link>

        <div className={styles.actions}>
          <Link className={`button button-primary button-small ${styles.demoButton}`} href={primaryCta.href}>
            {primaryCta.label}
          </Link>
          <StaggeredMegaMenu />
        </div>
      </div>
    </header>
  );
}
