export type TeamPresentationPhaseId =
  | "section-opening"
  | "time-vignette"
  | "activity-started"
  | "context-filtered"
  | "time-registered"
  | "interface-transition"
  | "users-vignette"
  | "team-updated"
  | "closing";

export type TeamPresentationPhase = {
  id: TeamPresentationPhaseId;
  durationMs: number;
};

export const TEAM_PRESENTATION_SEQUENCE: readonly TeamPresentationPhase[] = [
  { id: "section-opening", durationMs: 3200 },
  { id: "time-vignette", durationMs: 1800 },
  { id: "activity-started", durationMs: 4300 },
  { id: "context-filtered", durationMs: 4100 },
  { id: "time-registered", durationMs: 4100 },
  { id: "interface-transition", durationMs: 1200 },
  { id: "users-vignette", durationMs: 1800 },
  { id: "team-updated", durationMs: 4300 },
  { id: "closing", durationMs: 1800 },
] as const;

const SCENE_BY_PHASE: Record<TeamPresentationPhaseId, number> = {
  "section-opening": 0,
  "time-vignette": 0,
  "activity-started": 0,
  "context-filtered": 1,
  "time-registered": 2,
  "interface-transition": 2,
  "users-vignette": 3,
  "team-updated": 3,
  closing: 3,
};

export function getNextTeamPresentationPhaseIndex(index: number) {
  return (index + 1) % TEAM_PRESENTATION_SEQUENCE.length;
}

export function getTeamPresentationSceneIndex(phaseId: TeamPresentationPhaseId) {
  return SCENE_BY_PHASE[phaseId];
}
