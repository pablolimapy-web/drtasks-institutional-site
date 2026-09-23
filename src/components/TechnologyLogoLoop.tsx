"use client";

import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import LogoLoop from "./LogoLoop";
import styles from "./TechnologyLogoLoop.module.css";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export function TechnologyLogoLoop() {
  return (
    <section className={styles.section} aria-label="Tecnologias do Dr. Tasks">
      <div className={styles.inner}>
        <p className={styles.label}>Tecnologia por trás da experiência</p>
        <div className={styles.loop}>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
}
