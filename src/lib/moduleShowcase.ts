import { productPillars } from "./productArchitecture.ts";

export type ModuleShowcaseId = "fluxos" | "projects" | "finance" | "team" | "resources";

export type HomeModuleAnchor =
  | "modulo-fluxos"
  | "modulo-projetos"
  | "modulo-financeiro"
  | "modulo-equipe"
  | "modulo-recursos";

export type ModuleShowcaseModule = {
  id: ModuleShowcaseId;
  anchor: HomeModuleAnchor;
  label: string;
  headline: string;
  description: string;
  href: string;
  ariaLabel: string;
  narrative: readonly string[];
};

const hrefFor = (id: (typeof productPillars)[number]["id"]) =>
  productPillars.find((pillar) => pillar.id === id)!.href;

export const moduleShowcaseModules: readonly ModuleShowcaseModule[] = [
  {
    id: "fluxos",
    anchor: "modulo-fluxos",
    label: "FluxOS",
    headline: "Saiba onde cada projeto está — e o que precisa acontecer depois.",
    description: "Estágios, responsáveis, prazo, risco e próxima ação permanecem no mesmo contexto.",
    href: hrefFor("fluxos"),
    ariaLabel: "Demonstração animada do FluxOS",
    narrative: ["Identifique o estágio atual", "Veja quem precisa agir", "Entenda a próxima ação"],
  },
  {
    id: "projects",
    anchor: "modulo-projetos",
    label: "Projetos",
    headline: "Veja a carteira antes de abrir cada projeto.",
    description: "Indicadores, filtros e Kanban deixam prioridades e atrasos visíveis sem perder a visão do todo.",
    href: hrefFor("projects"),
    ariaLabel: "Demonstração da gestão de projetos do Dr. Tasks",
    narrative: ["Leia a carteira inteira", "Organize prioridades", "Encontre projetos em atenção"],
  },
  {
    id: "finance",
    anchor: "modulo-financeiro",
    label: "Financeiro",
    headline: "O financeiro acompanha a operação que gerou cada valor.",
    description: "Receitas, despesas, bancos, resumo e custos administrativos permanecem conectados ao contexto operacional.",
    href: hrefFor("finance"),
    ariaLabel: "Demonstração da gestão financeira do Dr. Tasks",
    narrative: ["Consolide compromissos", "Organize entradas e saídas", "Relacione valores à operação"],
  },
  {
    id: "team",
    anchor: "modulo-equipe",
    label: "Equipe & tempo",
    headline: "Tempo registrado vira leitura operacional, não uma planilha paralela.",
    description: "Timers, lançamentos, aprovações e produtividade ficam próximos do trabalho executado pela equipe.",
    href: hrefFor("team"),
    ariaLabel: "Demonstração da gestão de tempo do Dr. Tasks",
    narrative: ["Registre o tempo em contexto", "Acompanhe o trabalho realizado", "Consolide a leitura da equipe"],
  },
  {
    id: "resources",
    anchor: "modulo-recursos",
    label: "Recursos",
    headline: "Quando o trabalho acontece em campo, o contexto acompanha a tarefa.",
    description: "Filtros, localização e detalhe da atividade ajudam a encontrar o que está acontecendo fora do escritório.",
    href: hrefFor("resources"),
    ariaLabel: "Demonstração da localização de tarefas do Dr. Tasks",
    narrative: ["Filtre o que importa", "Localize a atividade", "Abra o contexto completo"],
  },
] as const;

export function getModuleShowcaseModule(id: string) {
  return moduleShowcaseModules.find((module) => module.id === id) ?? moduleShowcaseModules[0];
}
