export function normalizeProductViewIndex(index: number, total = 4): number {
  if (!Number.isFinite(total) || total <= 0) return 0;
  const safeIndex = Number.isFinite(index) ? Math.trunc(index) : 0;
  return ((safeIndex % total) + total) % total;
}

export function nextProductView(current: number, total = 4): number {
  if (!Number.isFinite(total) || total <= 0) return 0;
  const safeCurrent = Number.isFinite(current) ? Math.trunc(current) : 0;
  return normalizeProductViewIndex(safeCurrent + 1, total);
}
