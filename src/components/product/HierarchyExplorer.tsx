"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getNextTabIndex } from "@/lib/accessibility";
import styles from "./HierarchyExplorer.module.css";

type ScreenId = "institutions" | "workspace" | "projects" | "tasks";

type Screen = {
  id: ScreenId;
  step: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const screens: Screen[] = [
  {
    id: "institutions",
    step: "01",
    label: "Instituições",
    eyebrow: "Contexto do cliente",
    title: "Comece por quem recebe ou organiza o trabalho.",
    description:
      "Instituições ajudam a separar clientes, organizações e contextos sem duplicar a operação em planilhas paralelas.",
    image: "/product/projects-tasks/institutions.jpg",
    imageAlt: "Tela real de instituições do Dr. Tasks com dados demonstrativos protegidos",
  },
  {
    id: "workspace",
    step: "02",
    label: "Workspace",
    eyebrow: "Ambiente de trabalho",
    title: "Separe frentes sem perder a ligação com a instituição.",
    description:
      "Workspaces organizam ambientes e equipes que compartilham o mesmo contexto operacional, mantendo a estrutura mais legível.",
    image: "/product/projects-tasks/workspace.jpg",
    imageAlt: "Tela real de workspaces do Dr. Tasks com dados demonstrativos protegidos",
  },
  {
    id: "projects",
    step: "03",
    label: "Projetos",
    eyebrow: "Carteira de execução",
    title: "Transforme a carteira em prioridades visíveis.",
    description:
      "Projetos reúnem escopo, status, prazos e organização do trabalho. Kanban, tabela e outros recortes ajudam a equipe a enxergar o que precisa avançar.",
    image: "/product/pillars/projects.jpg",
    imageAlt: "Tela real de projetos do Dr. Tasks com dados demonstrativos protegidos",
  },
  {
    id: "tasks",
    step: "04",
    label: "Tarefas",
    eyebrow: "Execução concreta",
    title: "O próximo passo vira responsabilidade, prazo e histórico.",
    description:
      "Tarefas tiram a execução do campo abstrato. Cada item pode carregar responsável, prazo, prioridade e contexto do projeto que lhe deu origem.",
    image: "/product/projects-tasks/tasks.jpg",
    imageAlt: "Tela real de tarefas do Dr. Tasks com dados demonstrativos protegidos",
  },
];

export function HierarchyExplorer() {
  const [activeId, setActiveId] = useState<ScreenId>("projects");
  const active = useMemo(() => screens.find((screen) => screen.id === activeId) ?? screens[0], [activeId]);
  const activeIndex = screens.findIndex((screen) => screen.id === active.id);

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(index, screens.length, event.key);
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveId(screens[nextIndex].id);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className={styles.shell}>
      <div className={styles.tabs} role="tablist" aria-label="Níveis da estrutura operacional">
        {screens.map((screen) => {
          const selected = screen.id === active.id;
          return (
            <button
              className={selected ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              key={screen.id}
              type="button"
              id={`hierarchy-tab-${screen.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls="hierarchy-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(screen.id)}
              onKeyDown={(event) => handleTabKeyDown(event, screens.indexOf(screen))}
            >
              <span>{screen.step}</span>
              <strong>{screen.label}</strong>
            </button>
          );
        })}
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <span>{active.eyebrow}</span>
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <div className={styles.privacyNote}>
            <span aria-hidden="true" />
            Dados demonstrativos protegidos nas capturas públicas.
          </div>
        </div>

        <div className={styles.visual} id="hierarchy-panel" role="tabpanel" aria-labelledby={`hierarchy-tab-${screens[activeIndex].id}`}>
          <Image
            src={active.image}
            alt={active.imageAlt}
            width={1851}
            height={926}
            sizes="(max-width: 900px) 100vw, 62vw"
          />
        </div>
      </div>
    </div>
  );
}
