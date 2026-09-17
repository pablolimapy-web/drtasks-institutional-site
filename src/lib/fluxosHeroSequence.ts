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
  { id: "brandIntro", durationMs: 4500 },
  { id: "shellBuild", durationMs: 3600 },
  { id: "kpiFocus", durationMs: 3800 },
  { id: "tableBuild", durationMs: 4300 },
  { id: "rowSpotlight", durationMs: 5400 },
  { id: "drawer", durationMs: 4200 },
  { id: "drawerCallouts", durationMs: 5200 },
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
