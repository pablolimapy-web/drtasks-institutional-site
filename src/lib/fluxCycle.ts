export type FluxDemoOrder = {
  id: string;
  title: string;
  responsible: string;
  status: string;
  risk: boolean;
  deadline: string;
  nextAction: string;
  blocker?: string;
  lastMovement: string;
};

export type FluxDemoStage = {
  id: string;
  label: string;
  osCount: number;
  riskCount: number;
  agingDays: number;
  orders: FluxDemoOrder[];
};

const orders = (stage: string, items: Array<Omit<FluxDemoOrder, "status">>): FluxDemoOrder[] =>
  items.map((item) => ({ ...item, status: stage }));

export const fluxDemoStages: FluxDemoStage[] = [
  { id: "orcamento", label: "Orçamento", osCount: 8, riskCount: 1, agingDays: 2, orders: orders("Orçamento", [
    { id: "OS-418", title: "Adequação elétrica — Torre B", responsible: "Marina Costa", risk: false, deadline: "11/10", nextAction: "Finalizar composição de custos", lastMovement: "Hoje, 09:18" },
    { id: "OS-421", title: "Reparo de cobertura — Bloco 3", responsible: "Lucas Vieira", risk: true, deadline: "09/10", nextAction: "Validar materiais com compras", blocker: "Cotação pendente", lastMovement: "Ontem, 16:42" },
  ]) },
  { id: "aprovacao", label: "Aprovação", osCount: 5, riskCount: 2, agingDays: 4, orders: orders("Aguardando aprovação", [
    { id: "OS-416", title: "Instalação hidráulica — Pav. 4", responsible: "Pedro Almeida", risk: true, deadline: "08/10", nextAction: "Aprovar escopo revisado", blocker: "Aprovação N2 pendente", lastMovement: "Hoje, 08:54" },
    { id: "OS-409", title: "Impermeabilização — Garagem", responsible: "Ana Souza", risk: false, deadline: "12/10", nextAction: "Confirmar aprovação do cliente", lastMovement: "Ontem, 14:11" },
  ]) },
  { id: "execucao", label: "Execução", osCount: 12, riskCount: 3, agingDays: 6, orders: orders("Em execução", [
    { id: "OS-403", title: "Fachada — Torre A", responsible: "Rafael Lima", risk: false, deadline: "15/10", nextAction: "Concluir frente norte", lastMovement: "Hoje, 10:03" },
    { id: "OS-412", title: "Pintura — Áreas comuns", responsible: "Camila Rocha", risk: true, deadline: "10/10", nextAction: "Reprogramar equipe", blocker: "Equipe abaixo do planejado", lastMovement: "Hoje, 07:45" },
  ]) },
  { id: "medicao", label: "Medição", osCount: 4, riskCount: 1, agingDays: 3, orders: orders("Em medição", [
    { id: "OS-395", title: "Forro e drywall — Pav. 2", responsible: "Bruno Martins", risk: false, deadline: "13/10", nextAction: "Conferir quantitativos executados", lastMovement: "Ontem, 17:20" },
    { id: "OS-399", title: "Piso — Hall principal", responsible: "Juliana Reis", risk: true, deadline: "09/10", nextAction: "Revisar divergência de medição", blocker: "Divergência de 4,2%", lastMovement: "Hoje, 09:36" },
  ]) },
  { id: "entrega", label: "Entrega", osCount: 6, riskCount: 0, agingDays: 1, orders: orders("Pronto para entrega", [
    { id: "OS-388", title: "Iluminação — Área externa", responsible: "Diego Nunes", risk: false, deadline: "08/10", nextAction: "Registrar aceite final", lastMovement: "Hoje, 10:28" },
    { id: "OS-391", title: "Sinalização — Subsolo", responsible: "Fernanda Alves", risk: false, deadline: "11/10", nextAction: "Anexar checklist de entrega", lastMovement: "Ontem, 15:09" },
  ]) },
];

export function nextFluxStep(current: number, total = 4): number {
  if (!Number.isFinite(total) || total <= 0) return 0;
  const safeCurrent = Number.isFinite(current) ? Math.trunc(current) : 0;
  return (safeCurrent + 1 + total) % total;
}

export function fluxStepPercent(index: number, total = 4): number {
  if (!Number.isFinite(total) || total <= 0) return 0;
  const safeTotal = Math.max(1, Math.trunc(total));
  const safeIndex = Math.min(Math.max(Math.trunc(index), 0), safeTotal - 1);
  return ((safeIndex + 0.5) / safeTotal) * 100;
}
