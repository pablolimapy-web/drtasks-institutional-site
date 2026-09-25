import test from "node:test";
import assert from "node:assert/strict";
import {
  TEAM_PRESENTATION_SEQUENCE,
  getNextTeamPresentationPhaseIndex,
  getTeamPresentationSceneIndex,
} from "./teamPresentationSequence.ts";

test("team presentation always follows the same cinematic phase order", () => {
  assert.deepEqual(
    TEAM_PRESENTATION_SEQUENCE.map((phase) => phase.id),
    [
      "section-opening",
      "time-vignette",
      "activity-started",
      "context-filtered",
      "time-registered",
      "interface-transition",
      "users-vignette",
      "team-updated",
      "closing",
    ],
  );
  assert.ok(TEAM_PRESENTATION_SEQUENCE.every((phase) => phase.durationMs >= 900));
});

test("master sequence maps operational phases to the intended interface scenes", () => {
  assert.equal(getTeamPresentationSceneIndex("section-opening"), 0);
  assert.equal(getTeamPresentationSceneIndex("time-vignette"), 0);
  assert.equal(getTeamPresentationSceneIndex("activity-started"), 0);
  assert.equal(getTeamPresentationSceneIndex("context-filtered"), 1);
  assert.equal(getTeamPresentationSceneIndex("time-registered"), 2);
  assert.equal(getTeamPresentationSceneIndex("interface-transition"), 2);
  assert.equal(getTeamPresentationSceneIndex("users-vignette"), 3);
  assert.equal(getTeamPresentationSceneIndex("team-updated"), 3);
  assert.equal(getTeamPresentationSceneIndex("closing"), 3);
});

test("master sequence loops only after the closing phase", () => {
  const last = TEAM_PRESENTATION_SEQUENCE.length - 1;
  assert.equal(getNextTeamPresentationPhaseIndex(0), 1);
  assert.equal(getNextTeamPresentationPhaseIndex(last - 1), last);
  assert.equal(getNextTeamPresentationPhaseIndex(last), 0);
});
