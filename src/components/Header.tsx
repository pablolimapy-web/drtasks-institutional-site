"use client";

import Image from "next/image";
import Link from "next/link";
import { primaryCta } from "@/lib/commercial";
import { StaggeredMegaMenu } from "./StaggeredMegaMenu";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={`site-header ${styles.transparentHeader}`}>
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
          <Link className={`button button-primary button-small ${styles.demoButton}`} href={primaryCta.href} data-eva-trigger="header">
            Falar com a Eva
          </Link>
          <StaggeredMegaMenu />
        </div>
      </div>
    </header>
  );
}
