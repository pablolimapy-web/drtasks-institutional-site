export type FluxDemoStage = {
  id: string;
  label: string;
  osCount: number;
  riskCount: number;
  agingDays: number;
};

export const fluxDemoStages: FluxDemoStage[] = [
  { id: "orcamento", label: "Orçamento", osCount: 8, riskCount: 1, agingDays: 2 },
  { id: "aprovacao", label: "Aprovação", osCount: 5, riskCount: 2, agingDays: 4 },
  { id: "execucao", label: "Execução", osCount: 12, riskCount: 3, agingDays: 6 },
  { id: "medicao", label: "Medição", osCount: 4, riskCount: 1, agingDays: 3 },
  { id: "entrega", label: "Entrega", osCount: 6, riskCount: 0, agingDays: 1 },
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
