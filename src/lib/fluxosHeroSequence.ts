export type FluxosHeroSceneId =
  | "brandIntro"
  | "shellBuild"
  | "kpiFocus"
  | "tableBuild"
  | "rowSpotlight"
  | "drawer"
  | "drawerCallouts";

export type FluxosHeroScene = {
  id: FluxosHeroSceneId;
  durationMs: number;
};

export const FLUXOS_HERO_SCENES: readonly FluxosHeroScene[] = [
  { id: "brandIntro", durationMs: 3200 },
  { id: "shellBuild", durationMs: 3200 },
  { id: "kpiFocus", durationMs: 3200 },
  { id: "tableBuild", durationMs: 3800 },
  { id: "rowSpotlight", durationMs: 4600 },
  { id: "drawer", durationMs: 3600 },
  { id: "drawerCallouts", durationMs: 5000 },
] as const;

function normalizeIndex(index: number) {
  if (!Number.isFinite(index)) return 0;
  const total = FLUXOS_HERO_SCENES.length;
  return ((Math.trunc(index) % total) + total) % total;
}

export function getFluxosHeroScene(index: number) {
  return FLUXOS_HERO_SCENES[normalizeIndex(index)];
}

export function nextFluxosHeroScene(index: number) {
  return normalizeIndex(index + 1);
}
