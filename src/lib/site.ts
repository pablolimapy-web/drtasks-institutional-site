export const site = {
  name: "Dr. Tasks",
  description:
    "Organize tarefas, responsáveis, etapas e projetos em um fluxo claro — do início à conclusão.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://drtasks.com.br",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.drtasks.com.br",
};

export const navItems = [
  { href: "#produto", label: "Produto" },
  { href: "#fluxos", label: "FluxOS" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#segmentos", label: "Segmentos" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];
