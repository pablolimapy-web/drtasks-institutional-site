import { FluxosChapter } from "./FluxosChapter";
import { ProjectsChapter } from "./ProjectsChapter";
import { FinanceChapter } from "./FinanceChapter";
import { TeamChapter } from "./TeamChapter";
import { ResourcesChapter } from "./ResourcesChapter";
import styles from "./HomeModuleJourneyRedesign.module.css";

export function HomeModuleJourney() {
  return (
    <div
      className={styles.journey}
      data-home-visual-language="narrative-v2"
      aria-label="Conheça os módulos do Dr. Tasks"
    >
      <FluxosChapter />
      <ProjectsChapter />
      <FinanceChapter />
      <TeamChapter />
      <ResourcesChapter />
    </div>
  );
}
