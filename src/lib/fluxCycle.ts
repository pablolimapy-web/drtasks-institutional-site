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
