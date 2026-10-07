export const commercialPositioning = {
  heroTitle: "Saiba o que está acontecendo em cada OS.",
  heroDescription:
    "O Dr. Tasks organiza projetos, estágios e tarefas em uma visão operacional clara. O FluxOS mostra responsável, prazo, situação, bloqueio e próxima ação sem obrigar a equipe a procurar respostas em várias telas.",
  shortPromise: "Saiba o que está acontecendo em cada OS — e qual é a próxima ação.",
};

export const primaryCta = { label: "Agendar demonstração", href: "/demo" } as const;
export const secondaryCta = { label: "Conhecer os módulos", href: "#modulos" } as const;

export const homeNavItems = [
  { href: "#modulos", label: "Módulos" },
  { href: "#modulo-fluxos", label: "FluxOS" },
  { href: "#modulo-financeiro", label: "Financeiro" },
  { href: "#modulo-recursos", label: "Recursos" },
] as const;

export const availability = {
  projectsAndTasks: "available",
  fluxos: "available",
  finance: "validation",
  audit: "validation",
  timeTracking: "development",
  geolocation: "development",
} as const;
