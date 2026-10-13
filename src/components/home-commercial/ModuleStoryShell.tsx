import Link from "next/link";
import type { ReactNode } from "react";
import type { HomeCommercialModule } from "@/lib/homeCommercialNarrative";
import styles from "./ModuleStoryShell.module.css";

export function ModuleStoryShell({
  module,
  children,
}: {
  module: HomeCommercialModule;
  children: ReactNode;
}) {
  return (
    <section
      id={module.anchor}
      className={styles.section}
      data-layout={module.layout}
      data-module={module.id}
      aria-labelledby={`${module.anchor}-title`}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={`${module.anchor}-title`}>{module.painHeadline}</h2>
          <p className={styles.support}>{module.support}</p>
          <Link className={styles.cta} href={module.href}>
            <span>{module.ctaLabel}</span>
            <span className={styles.ctaIcon} aria-hidden="true">
              <svg viewBox="0 0 18 18" fill="none">
                <path d="M5 13 13 5M7 5h6v6" />
              </svg>
            </span>
          </Link>
        </div>
        <div className={styles.visual} aria-label={module.storyAriaLabel}>{children}</div>
      </div>
    </section>
  );
}
