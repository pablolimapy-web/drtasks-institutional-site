import Image from "next/image";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import Stack from "@/components/react-bits/Stack";
import { getModuleShowcaseModule } from "@/lib/moduleShowcase";
import { ModuleChapterLink } from "./ModuleChapterLink";
import styles from "./ProjectsChapter.module.css";

const hierarchy = [
  ["Instituição", "Origem do relacionamento e dos contratos"],
  ["Workspace", "Contexto de trabalho por operação"],
  ["Projeto", "Execução organizada por objetivo"],
  ["Tarefa", "Ação concreta para a equipe"],
] as const;

const stackCards = [
  { src: "/product/projects-tasks/institutions.jpg", alt: "Tela de instituições do Dr. Tasks", label: "Instituições" },
  { src: "/product/projects-tasks/workspace.jpg", alt: "Tela de workspace do Dr. Tasks", label: "Workspace" },
  { src: "/product/projects-tasks/tasks.jpg", alt: "Tela de tarefas do Dr. Tasks", label: "Tarefas" },
].map((item) => (
  <div className={styles.stackCard} key={item.src}>
    <Image src={item.src} alt={item.alt} width={1851} height={926} className={styles.screenImage} sizes="(max-width: 1040px) 90vw, 50vw" />
    <span className={styles.screenLabel}>{item.label}</span>
  </div>
));

export function ProjectsChapter() {
  const module = getModuleShowcaseModule("projects");

  return (
    <section id={module.anchor} className={styles.section} aria-labelledby="projects-title">
      <div className={`container ${styles.inner}`}>
        <AnimatedContent className={styles.copy} direction="horizontal" distance={44} threshold={0.14} reverse>
          <div className={styles.kicker}><span />Projetos e Tarefas</div>
          <h2 id="projects-title">Do cliente à execução, sem perder o contexto no caminho.</h2>
          <p>O trabalho mantém uma hierarquia clara. Você enxerga onde cada ação pertence sem transformar a operação em uma coleção de listas desconectadas.</p>

          <ol className={styles.hierarchy} aria-label="Estrutura operacional">
            {hierarchy.map(([title, detail], index) => (
              <li key={title}>
                <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{title}</strong><small>{detail}</small></span>
              </li>
            ))}
          </ol>
        </AnimatedContent>

        <div className={styles.visual}>
          <div className={styles.stackShell} aria-label="Telas reais de Instituições, Workspace e Tarefas">
            <Stack cards={stackCards} autoplay={false} sendToBackOnClick pauseOnHover randomRotation={false} />
          </div>
          <p className={styles.stackHint}>Clique ou arraste para percorrer as telas</p>
        </div>

        <div className={styles.chapterCta}>
          <ModuleChapterLink href={module.href}>Saiba mais sobre Projetos e Tarefas</ModuleChapterLink>
        </div>
      </div>
    </section>
  );
}
