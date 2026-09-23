"use client";

import Image from "next/image";
import { useState } from "react";
import { getNextTabIndex } from "@/lib/accessibility";
import styles from "./ResourceShowcase.module.css";

type ResourceMode = "files" | "location";

const resources = {
  files: {
    label: "Arquivos",
    eyebrow: "Drive interno",
    title: "Documentos próximos do contexto em que o trabalho acontece.",
    description:
      "A área de Arquivos organiza pastas e documentos dentro do Dr. Tasks para reduzir a dispersão de referências operacionais.",
    points: ["Pastas por contexto", "Busca dentro da estrutura", "Acesso no mesmo ambiente da operação"],
    image: "/product/resources/files.jpg",
    alt: "Área real de Arquivos do Dr. Tasks com dados demonstrativos protegidos",
  },
  location: {
    label: "Localização",
    eyebrow: "Tarefas em campo",
    title: "Quando o trabalho tem lugar, a tarefa pode carregar esse contexto.",
    description:
      "A visualização de localização reúne filtros por período, projeto, responsável e status para tarefas que utilizam georreferenciamento.",
    points: ["Filtro por período", "Projeto e responsável", "Status da tarefa"],
    image: "/product/resources/location.jpg",
    alt: "Tela real de Localização de tarefas no Dr. Tasks",
  },
} as const;

export function ResourceShowcase() {
  const [active, setActive] = useState<ResourceMode>("files");
  const current = resources[active];
  const resourceKeys = Object.keys(resources) as ResourceMode[];

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(index, resourceKeys.length, event.key);
    if (nextIndex === null) return;
    event.preventDefault();
    setActive(resourceKeys[nextIndex]);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className={styles.shell}>
      <div className={styles.tabs} role="tablist" aria-label="Recursos operacionais">
        {resourceKeys.map((key, index) => (
          <button
            key={key}
            type="button"
            id={`resource-tab-${key}`}
            role="tab"
            aria-selected={active === key}
            aria-controls="resource-panel"
            tabIndex={active === key ? 0 : -1}
            className={active === key ? styles.activeTab : styles.tab}
            onClick={() => setActive(key)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {resources[key].label}
          </button>
        ))}
      </div>

      <div className={styles.content} id="resource-panel" role="tabpanel" aria-labelledby={`resource-tab-${active}`}>
        <div className={styles.copy}>
          <span>{current.eyebrow}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <ul>
            {current.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <small>Dados demonstrativos protegidos quando necessário.</small>
        </div>

        <div className={styles.visual}>
          <Image src={current.image} alt={current.alt} width={1728} height={891} />
        </div>
      </div>
    </div>
  );
}
