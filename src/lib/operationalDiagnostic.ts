export const diagnosticStages = [
  "Orçamento",
  "Aprovação",
  "Compra",
  "Execução",
  "Medição",
  "Entrega",
] as const;

export const operationalCase = {
  code: "OS-1042",
  title: "Reforma Unidade Centro",
  currentStage: "Aprovação",
  aging: "2 dias neste estágio",
  owner: "Maria",
  deadline: "18/09/2026",
  status: "Em acompanhamento",
  nextAction: "Confirmar material com fornecedor",
  blocker: "Aguardando aprovação da medição",
  lastMovement: "Hoje, 14:32",
} as const;

export const diagnosticQuestions = [
  {
    id: "stage",
    number: "01",
    question: "A OS está em qual estágio?",
    hint: "Veja exatamente onde o trabalho parou.",
    label: "Estágio atual",
    value: operationalCase.currentStage,
    detail: operationalCase.aging,
  },
  {
    id: "owner",
    number: "02",
    question: "Quem precisa agir agora?",
    hint: "Responsável e próxima ação sem mensagens paralelas.",
    label: "Quem age agora",
    value: operationalCase.owner,
    detail: operationalCase.nextAction,
  },
  {
    id: "blocker",
    number: "03",
    question: "Por que isso ainda não avançou?",
    hint: "Bloqueios e pendências aparecem com contexto.",
    label: "Bloqueio identificado",
    value: operationalCase.blocker,
    detail: `Última movimentação: ${operationalCase.lastMovement}`,
  },
] as const;

export type DiagnosticQuestionId = (typeof diagnosticQuestions)[number]["id"];
