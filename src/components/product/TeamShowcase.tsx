"use client";

import Image from "next/image";
import { useState } from "react";
import { getNextTabIndex } from "@/lib/accessibility";
import styles from "./TeamShowcase.module.css";

type TeamMode = "chat" | "users" | "time";

const modules = {
  chat: {
    label: "Chat",
    eyebrow: "Comunicação",
    title: "Conversas em uma área própria do ambiente de trabalho.",
    description:
      "O Chat oferece uma área para iniciar, buscar, manter conversas abertas e consultar conversas arquivadas dentro do Dr. Tasks.",
    points: ["Novo chat", "Busca", "Abertos e arquivados"],
    image: "/product/team/chat.jpg",
    alt: "Tela real de Chat do Dr. Tasks",
  },
  users: {
    label: "Usuários",
    eyebrow: "Equipe e acesso",
    title: "Equipe, funções e status visíveis em um único cadastro.",
    description:
      "A gestão de usuários centraliza cadastros, funções, status e ações administrativas sem transformar a página institucional em promessa de um modelo de permissão além do que o produto mostra hoje.",
    points: ["Cadastro de usuários", "Funções", "Status e ações"],
    image: "/product/team/users.jpg",
    alt: "Tela real de Usuários do Dr. Tasks com dados demonstrativos protegidos",
  },
  time: {
    label: "Gestão de tempo",
    eyebrow: "Tempo e produtividade",
    title: "Registros de tempo próximos de projetos e tarefas.",
    description:
      "A área de Gestão de Tempo reúne timer, registros, aprovações e leituras de tempo faturável e não faturável para apoiar o acompanhamento operacional.",
    points: ["Timer", "Registros e aprovações", "Faturável e não faturável"],
    image: "/product/team/time.jpg",
    alt: "Tela real de Gestão de Tempo do Dr. Tasks com dados demonstrativos protegidos",
  },
} as const;

export function TeamShowcase() {
  const [active, setActive] = useState<TeamMode>("time");
  const current = modules[active];
  const moduleKeys = Object.keys(modules) as TeamMode[];

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = getNextTabIndex(index, moduleKeys.length, event.key);
    if (nextIndex === null) return;
    event.preventDefault();
    setActive(moduleKeys[nextIndex]);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div className={styles.shell}>
      <div className={styles.tabs} role="tablist" aria-label="Equipe e produtividade">
        {moduleKeys.map((key, index) => (
          <button
            key={key}
            type="button"
            id={`team-tab-${key}`}
            role="tab"
            aria-selected={active === key}
            aria-controls="team-panel"
            tabIndex={active === key ? 0 : -1}
            className={active === key ? styles.activeTab : styles.tab}
            onClick={() => setActive(key)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {modules[key].label}
          </button>
        ))}
      </div>

      <div className={styles.content} id="team-panel" role="tabpanel" aria-labelledby={`team-tab-${active}`}>
        <div className={styles.copy}>
          <span>{current.eyebrow}</span>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <ul>{current.points.map((point) => <li key={point}>{point}</li>)}</ul>
          <small>Dados demonstrativos protegidos quando necessário.</small>
        </div>
        <div className={styles.visual}>
          <Image src={current.image} alt={current.alt} width={1728} height={891} />
        </div>
      </div>
    </div>
  );
}
