import { FluxosChapter } from "./FluxosChapter";
import { ProjectsChapter } from "./ProjectsChapter";
import { FinanceChapter } from "./FinanceChapter";
import { TeamChapter } from "./TeamChapter";
import { ResourcesChapter } from "./ResourcesChapter";
import styles from "./HomeModuleJourney.module.css";

export function HomeModuleJourney() {
  return (
    <div className={styles.journey} aria-label="Conheça os módulos do Dr. Tasks">
      <FluxosChapter />
      <ProjectsChapter />
      <FinanceChapter />
      <TeamChapter />
      <ResourcesChapter />
    </div>
  );
}
