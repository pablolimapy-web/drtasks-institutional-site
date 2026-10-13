import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const story = read("src/components/home-commercial/stories/FinanceStory.tsx");
const css = read("src/components/home-commercial/stories/FinanceStory.module.css");
const projects = read("src/components/home-commercial/stories/ProjectsStory.tsx");

test("V113 turns Finance into a money trail from request to bank reconciliation", () => {
  assert.match(story, /moneyRail/);
  assert.match(story, /routeStep/);
  assert.match(story, /bankStatement/);
  assert.match(story, /reconciliationMatch/);
  for (const cue of ["SOL-031", "AP-035", "PIX-9281", "EXT-441", "96%"])
    assert.match(story, new RegExp(cue.replace("%", "%")));
});

test("V113 uses Raycast-like micro-surfaces without turning Finance into a card dashboard", () => {
  assert.match(css, /\.stage\s*\{[\s\S]*background:\s*#04070b/);
  assert.match(css, /\.routeStep\[data-active="true"\][\s\S]*box-shadow:[\s\S]*inset 0 1px 0 rgba\(255,255,255,/);
  assert.match(css, /\.reconcilePanel[\s\S]*box-shadow:[\s\S]*inset 0 1px 0 rgba\(255,255,255,/);
  assert.match(css, /font-family:\s*ui-monospace/);
  assert.doesNotMatch(css, /linear-gradient\(/);
});

test("V113 animates the financial route semantically through approval, payment and match", () => {
  assert.match(story, /data-phase=\{phase\}/);
  assert.match(css, /data-phase="1"[\s\S]*routeStep\[data-step="approval"\]/);
  assert.match(css, /data-phase="2"[\s\S]*routeStep\[data-step="payment"\]/);
  assert.match(css, /data-phase="3"[\s\S]*bankStatement/);
  assert.match(css, /data-phase="4"[\s\S]*reconciliationMatch/);
});

test("V113 keeps Projects as its own command-center composition", () => {
  assert.match(projects, /projectRail/);
  assert.match(projects, /taskInspector/);
  assert.doesNotMatch(projects, /moneyRail/);
});
