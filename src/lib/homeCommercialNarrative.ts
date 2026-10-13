export type HomeCommercialModuleId =
  | "fluxos"
  | "projects"
  | "finance"
  | "quotes"
  | "requests"
  | "chat"
  | "team-time"
  | "resources";

export type ModuleStoryLayout =
  | "editorial-left"
  | "product-dominant"
  | "wide-canvas"
  | "split-offset"
  | "full-bleed";

export type HomeCommercialModule = {
  id: HomeCommercialModuleId;
  index: string;
  anchor: string;
  label: string;
  painHeadline: string;
  support: string;
  result: string;
  href: string;
  ctaLabel: string;
  layout: ModuleStoryLayout;
  storyAriaLabel: string;
};

export const homeCommercialModules = [
  {
    id: "fluxos",
    index: "01",
    anchor: "modulo-fluxos",
    label: "FluxOS",
    painHeadline: "Pare de cobrar status para descobrir onde cada obra parou.",
    support: "Etapa, responsável, prazo e próxima ação ficam visíveis sem abrir projeto por projeto ou depender de uma reunião.",
    result: "Todas as obras ganham uma leitura operacional comum, sem reconstruir o andamento por mensagem.",
    href: "/produto/fluxos",
    ctaLabel: "Ver o FluxOS",
    layout: "wide-canvas",
    storyAriaLabel: "FluxOS mostra etapa, responsável, prazo e próxima ação das obras em uma visão operacional.",
  },
  {
    id: "projects",
    index: "02",
    anchor: "modulo-projetos",
    label: "Projetos e Tarefas",
    painHeadline: "A tarefa não deveria perder o contexto da obra que a criou.",
    support: "Cliente, obra, tarefa, responsável e prazo permanecem ligados para que a equipe não precise remontar a história antes de agir.",
    result: "Cada próxima ação continua conectada ao projeto, à pessoa responsável e ao prazo real.",
    href: "/produto/projetos-e-tarefas",
    ctaLabel: "Ver projetos e tarefas",
    layout: "split-offset",
    storyAriaLabel: "Projetos e tarefas mantém cliente, obra, tarefa, responsável e prazo ligados no mesmo contexto.",
  },
  {
    id: "finance",
    index: "03",
    anchor: "modulo-financeiro",
    label: "Financeiro",
    painHeadline: "Do pedido à conciliação, o dinheiro continua ligado à obra.",
    support: "Solicitação, aprovações, pagamento e extrato avançam no mesmo rastro — com OS, responsável e motivo preservados.",
    result: "O financeiro deixa de ser uma lista isolada e passa a carregar o contexto operacional até a conciliação.",
    href: "/produto/financeiro",
    ctaLabel: "Ver o fluxo financeiro",
    layout: "product-dominant",
    storyAriaLabel: "Financeiro conecta solicitação, aprovação, pagamento e conciliação à obra e à ordem de serviço de origem.",
  },
  {
    id: "quotes",
    index: "04",
    anchor: "modulo-cotacoes",
    label: "Cotações",
    painHeadline: "Cotação boa é decisão comparável, não três propostas espalhadas entre PDF, mensagem e planilha.",
    support: "Itens, fornecedores, condições e decisão permanecem juntos no contexto da compra e da obra que precisa daquele material ou serviço.",
    result: "A escolha deixa um rastro comparável e segue para o custo certo sem nova digitação.",
    href: "/produto/financeiro",
    ctaLabel: "Ver compras e cotações",
    layout: "editorial-left",
    storyAriaLabel: "Cotações mantém itens, fornecedores, condições e decisão ligados à compra e à obra.",
  },
  {
    id: "requests",
    index: "05",
    anchor: "modulo-solicitacoes",
    label: "Solicitações",
    painHeadline: "Aprovação no WhatsApp deixa decisão sem rastro. O pedido precisa nascer com contexto.",
    support: "Motivo, obra, valor e alçada acompanham a solicitação desde a origem, com responsáveis e decisões registradas no mesmo fluxo.",
    result: "O gasto avança com rastro de quem pediu, quem aprovou e por que aquela decisão foi tomada.",
    href: "/produto/financeiro",
    ctaLabel: "Ver solicitações e alçadas",
    layout: "product-dominant",
    storyAriaLabel: "Solicitações registra motivo, obra, valor, alçada e decisões no mesmo fluxo de aprovação.",
  },
  {
    id: "chat",
    index: "06",
    anchor: "modulo-chat",
    label: "Chat",
    painHeadline: "Uma decisão de obra não deveria desaparecer no histórico do WhatsApp.",
    support: "Mensagem, arquivo e evidência ficam ligados à OS, à tarefa ou ao projeto em que a conversa aconteceu.",
    result: "A equipe encontra a decisão onde o trabalho está, sem reconstruir contexto em conversas paralelas.",
    href: "/produto/equipe",
    ctaLabel: "Ver comunicação no contexto",
    layout: "split-offset",
    storyAriaLabel: "Chat mantém mensagens, arquivos e evidências ligados à ordem de serviço, tarefa ou projeto.",
  },
  {
    id: "team-time",
    index: "07",
    anchor: "modulo-equipe-tempo",
    label: "Equipe e Tempo",
    painHeadline: "Hora apontada sem tarefa e sem obra vira apenas um número.",
    support: "O tempo permanece ligado à pessoa, à tarefa, à obra e à OS para que esforço e execução possam ser lidos no mesmo contexto.",
    result: "A operação entende onde o tempo foi gasto sem depender de consolidação manual no fim do período.",
    href: "/produto/equipe",
    ctaLabel: "Ver equipe e tempo",
    layout: "editorial-left",
    storyAriaLabel: "Equipe e tempo mantém horas ligadas à pessoa, tarefa, obra e ordem de serviço.",
  },
  {
    id: "resources",
    index: "08",
    anchor: "modulo-recursos",
    label: "Recursos",
    painHeadline: "Foto, arquivo e evidência de campo só valem quando continuam ligados ao trabalho.",
    support: "Registros de campo permanecem vinculados à tarefa, à obra e à OS que os geraram, em vez de virar arquivo solto no celular ou na nuvem.",
    result: "A evidência chega ao escritório com origem e contexto preservados.",
    href: "/produto/recursos",
    ctaLabel: "Ver recursos de campo",
    layout: "full-bleed",
    storyAriaLabel: "Recursos mantém fotos, arquivos e evidências de campo vinculados à tarefa, obra e ordem de serviço.",
  },
] as const satisfies readonly HomeCommercialModule[];

export const operationalEfficiencyStories = [
  {
    before: "Planilha + WhatsApp + sistema financeiro",
    drTasks: "OS → medição → NF → pagamento",
    result: "1 fluxo rastreável",
  },
  {
    before: "Cobrar pessoas para descobrir status",
    drTasks: "Etapa + responsável + prazo visíveis",
    result: "menos acompanhamento manual",
  },
  {
    before: "Pedido de pagamento em mensagens",
    drTasks: "Solicitação → alçada → aprovação → rastro",
    result: "aprovação rastreável",
  },
  {
    before: "Caixa global sem contexto da obra",
    drTasks: "Receitas e despesas vinculadas à obra/OS",
    result: "decisão por obra",
  },
] as const;

export const operationalProof = {
  headline: "10–20% só importa se você consegue mostrar qual trabalho deixou de existir.",
  metric: "10–20%",
  metricLabel: "de capacidade administrativa potencialmente liberada em rotinas repetitivas",
  description:
    "Quando aprovações, medições, financeiro e documentos mantêm o mesmo contexto, a operação precisa de menos trabalho manual para acompanhar e consolidar o que já aconteceu.",
  mechanisms: [
    ["Aprovações", "Pedido, alçada, decisão e rastro no mesmo processo."],
    ["Medições", "Avanço da obra conectado ao que será documentado e pago."],
    ["Financeiro", "Solicitação, pagamento e conciliação preservam a origem."],
    ["Contexto", "Documentos, mensagens e evidências continuam ligados à obra."],
  ],
  disclaimer: "Estimativa operacional; não representa redução obrigatória de quadro nem economia garantida.",
} as const;

export type CompetitiveState = "native" | "partial" | "unavailable";

export const competitiveProcesses = [
  {
    process: "FluxOS — visão de etapas de todos os projetos",
    drTasks: "native",
    sienge: "partial",
    totvs: "unavailable",
    vobi: "partial",
    obraPrima: "partial",
  },
  {
    process: "Chat e arquivos dentro da OS",
    drTasks: "native",
    sienge: "unavailable",
    totvs: "unavailable",
    vobi: "unavailable",
    obraPrima: "unavailable",
  },
  {
    process: "Alçadas de aprovação com rastreio",
    drTasks: "native",
    sienge: "native",
    totvs: "native",
    vobi: "unavailable",
    obraPrima: "unavailable",
  },
  {
    process: "Financeiro por obra / OS",
    drTasks: "native",
    sienge: "native",
    totvs: "native",
    vobi: "partial",
    obraPrima: "partial",
  },
  {
    process: "Medição → NF → pagamento",
    drTasks: "native",
    sienge: "native",
    totvs: "native",
    vobi: "partial",
    obraPrima: "partial",
  },
  {
    process: "Conciliação bancária",
    drTasks: "native",
    sienge: "native",
    totvs: "native",
    vobi: "unavailable",
    obraPrima: "unavailable",
  },
] as const satisfies readonly {
  process: string;
  drTasks: CompetitiveState;
  sienge: CompetitiveState;
  totvs: CompetitiveState;
  vobi: CompetitiveState;
  obraPrima: CompetitiveState;
}[];

export const aiPositioningCopy = {
  kicker: "IA DENTRO DO PROCESSO",
  headline: "A IA só faz sentido quando reduz trabalho dentro de um processo que já tem contexto.",
  body:
    "A IA está sendo construída para reduzir leitura, classificação e encaminhamento manual dentro dos fluxos do produto. O que entra em produção será limitado ao que estiver validado pelo time técnico.",
} as const;

export const homeHeroNarrative = {
  eyebrow: "Da obra ao financeiro",
  title: "Feito por quem produz, para quem produz",
  description:
    "O Dr. Tasks conecta tarefas, OS, medições, compras, notas, aprovações e caixa para reduzir o trabalho necessário entre uma etapa e outra da operação.",
  result: "Do orçamento ao pagamento, menos troca de contexto entre planilhas, mensagens e sistemas.",
  phaseDurations: [2500, 2500, 3000, 3000, 2500, 3500] as const,
  secondaryHref: "#eficiencia",
  secondaryLabel: "Ver como o processo funciona",
  metadataDescription:
    "Dr. Tasks conecta tarefas, OS, medições, compras, notas, aprovações e caixa para reduzir consolidação manual, cobrança de status e trabalho repetido na operação de construtoras.",
} as const;
