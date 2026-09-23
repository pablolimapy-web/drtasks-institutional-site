import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ModuleChapterLink.module.css";

export function ModuleChapterLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`${styles.link} ${dark ? styles.dark : ""}`}>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </Link>
  );
}
