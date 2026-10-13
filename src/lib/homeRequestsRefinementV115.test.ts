import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const story = read("src/components/home-commercial/stories/RequestsStory.tsx");
const css = read("src/components/home-commercial/stories/RequestsStory.module.css");

test("V115 gives Requests its own dossier and approval-stamp composition", () => {
  for (const cue of ["dossierStage", "requestSheet", "approvalSpine", "approvalStamp", "handoffTicket", "auditTape"]) assert.match(story, new RegExp(cue));
  assert.doesNotMatch(story, /approvalFlow/);
  assert.doesNotMatch(story, /requestCard/);
});

test("V115 preserves request context through finance handoff", () => {
  for (const cue of ["SOL-031", "OS-184", "R$ 5.800,00", "N1", "N2", "AP-035", "Financeiro"]) assert.match(story, new RegExp(cue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("V115 uses Raycast micro-surfaces without copying Quotes or Finance layouts", () => {
  assert.match(css, /--ray-void:#040506/);
  assert.match(css, /--ray-line:#363739/);
  assert.match(css, /--key:inset 0 1px 0/);
  assert.match(css, /font-family:ui-monospace/);
  assert.doesNotMatch(story, /comparisonField|moneyRail|taskTable/);
});

test("V115 animates request, facts, approvals and handoff in sequence", () => {
  assert.match(css, /data-phase="1"[\s\S]*requestSheet/);
  assert.match(css, /data-phase="2"[\s\S]*requestFacts/);
  assert.match(css, /data-phase="3"[\s\S]*approvalStamp/);
  assert.match(css, /data-phase="4"[\s\S]*handoffTicket/);
});
