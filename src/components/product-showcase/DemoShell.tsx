"use client";

import type { ReactNode } from "react";
import styles from "./DemoShell.module.css";

const nav = ["Dashboard", "Projetos", "Tarefas", "FluxOS", "Arquivos", "Localização", "Financeiro", "Equipe"];
const navMarks = ["◉", "▦", "□", "ϟ", "▱", "⌖", "◇", "◌"];

export function DemoShell({
  activeNav,
  ariaLabel,
  children,
}: {
  activeNav: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.shell} role="img" aria-label={ariaLabel}>
      <aside className={styles.sidebar} aria-hidden="true">
        <div className={styles.brand}><span>☰</span><strong>DR TASKS</strong></div>
        <div className={styles.nav}>
          {nav.map((item, index) => (
            <span className={item === activeNav ? styles.active : undefined} key={item}>
              <i>{navMarks[index]}</i>{item}
            </span>
          ))}
        </div>
      </aside>
      <div className={styles.workspace}>
        <div className={styles.topbar} aria-hidden="true">
          <span className={styles.search}>⌕ <span>Pesquise aqui</span></span>
          <span className={styles.topActions}>◌ <i /> ◇ <i /> <b>PL</b></span>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
