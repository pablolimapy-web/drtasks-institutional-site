export type FeatureAvailability = "available" | "validation" | "development";

export const featureAvailability = {
  fluxos: "available",
  projects: "available",
  tasks: "available",
  finance: "available",
  purchasing: "available",
  files: "available",
  location: "available",
  chat: "available",
  users: "available",
  timeTracking: "available",
} as const satisfies Record<string, FeatureAvailability>;

export const productPillars = [
  {
    id: "fluxos",
    label: "FluxOS",
    href: "/produto/fluxos",
    eyebrow: "Visão operacional",
    headline: "O fluxo deixa claro onde o trabalho está e o que precisa acontecer.",
    summary: "Visão operacional por estágios, risco, bloqueio e próxima ação.",
    description:
      "Acompanhe a carteira por estágio e abra o contexto de uma OS sem perder a visão do todo. Responsável, prazo, aging, bloqueio e próxima ação aparecem no mesmo lugar.",
    modules: ["Estágios", "Aging", "Bloqueios", "Próxima ação"],
    image: "/hero/fluxos-overview.png",
    imageAlt: "Tela real do FluxOS com carteira operacional por estágios",
  },
  {
    id: "projects",
    label: "Projetos e tarefas",
    href: "/produto/projetos-e-tarefas",
    eyebrow: "Estrutura do trabalho",
    headline: "Do cliente à tarefa, o contexto continua conectado.",
    summary: "Instituições, workspaces, projetos e tarefas conectados.",
    description:
      "Instituições, workspaces, projetos e tarefas organizam a operação em níveis claros. A equipe executa sem transformar o contexto em planilhas paralelas.",
    modules: ["Instituições", "Workspace", "Projetos", "Tarefas"],
    image: "/product/pillars/projects.jpg",
    imageAlt: "Tela real de projetos do Dr. Tasks com visualização em Kanban",
  },
  {
    id: "finance",
    label: "Financeiro e compras",
    href: "/produto/financeiro",
    eyebrow: "Impacto financeiro",
    headline: "O financeiro acompanha o contexto da operação.",
    summary: "Receitas, despesas, solicitações, cotações e resultado por contexto.",
    description:
      "Centralize leitura financeira, solicitações e cotações sem separar a decisão de compra do projeto ou da OS que deu origem à demanda.",
    modules: ["Receitas", "Despesas", "Solicitações", "Cotações"],
    image: "/product/pillars/finance.jpg",
    imageAlt: "Tela real do módulo financeiro do Dr. Tasks",
  },
  {
    id: "resources",
    label: "Recursos operacionais",
    href: "/produto/recursos",
    eyebrow: "Contexto de apoio",
    headline: "Documentos e campo continuam ligados ao trabalho.",
    summary: "Arquivos e localização ligados ao trabalho.",
    description:
      "Arquivos e informações de localização ajudam a equipe a encontrar evidências e contexto operacional sem abrir uma trilha paralela fora do sistema.",
    modules: ["Arquivos", "Localização"],
    image: "/product/pillars/resources.jpg",
    imageAlt: "Tela real de arquivos organizados no Dr. Tasks",
  },
  {
    id: "team",
    label: "Equipe e produtividade",
    href: "/produto/equipe",
    eyebrow: "Equipe no contexto",
    headline: "Quem faz, conversa e registra tempo no mesmo ambiente.",
    summary: "Chat, usuários e gestão de tempo no contexto da operação.",
    description:
      "Chat, usuários e gestão de tempo apoiam a rotina da equipe com responsabilidades e registros próximos do trabalho que está sendo executado.",
    modules: ["Chat", "Usuários", "Gestão de tempo"],
    image: "/product/pillars/team.jpg",
    imageAlt: "Tela real de gestão de tempo e produtividade no Dr. Tasks",
  },
] as const;

export const publishedRoutes = [
  "/",
  "/produto/fluxos",
  "/produto/projetos-e-tarefas",
  "/produto/financeiro",
  "/produto/recursos",
  "/produto/equipe",
  "/segmentos/construcao",
  "/como-funciona",
  "/sobre",
  "/guia",
  "/guia/fluxos",
  "/guia/projeto-estagio-tarefa",
  "/demo",
  "/contato",
  "/login",
  "/privacidade",
  "/termos",
] as const;
