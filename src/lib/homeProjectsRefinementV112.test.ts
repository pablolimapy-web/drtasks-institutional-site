import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const story = read("src/components/home-commercial/stories/ProjectsStory.tsx");
const css = read("src/components/home-commercial/stories/ProjectsStory.module.css");
const fluxStory = read("src/components/home-commercial/stories/FluxosStory.tsx");

test("V112 turns Projects into a real project command center instead of a row of cards", () => {
  assert.match(story, /projectRail/);
  assert.match(story, /commandBar/);
  assert.match(story, /taskTable/);
  assert.match(story, /taskRow/);
  assert.match(story, /taskInspector/);
  assert.doesNotMatch(story, /className=\{styles\.nodes\}/);
  assert.doesNotMatch(story, /projectFooter/);
});

test("V112 uses restrained Raycast-like micro-surfaces only for functional UI", () => {
  assert.match(css, /\.stage\s*\{[\s\S]*background:\s*#04070b/);
  assert.match(css, /\.commandBar[\s\S]*border:\s*1px solid rgba\(255,255,255,/);
  assert.match(css, /\.taskRow\[data-selected="true"\][\s\S]*box-shadow:[\s\S]*inset 0 1px 0 rgba\(255,255,255,/);
  assert.match(css, /font-family:\s*ui-monospace/);
  assert.doesNotMatch(css, /linear-gradient\(/);
});

test("V112 keeps the animation semantic: hierarchy, task list, selection, inspector", () => {
  assert.match(story, /data-phase=\{phase\}/);
  assert.match(css, /data-phase="0"[\s\S]*projectRail/);
  assert.match(css, /data-phase="2"[\s\S]*taskRow/);
  assert.match(css, /data-phase="3"[\s\S]*taskRow\[data-selected="true"\]/);
  assert.match(css, /data-phase="3"[\s\S]*taskInspector/);
});

test("V112 does not replace the approved FluxOS Stepper", () => {
  assert.match(fluxStory, /<Stepper/);
  assert.match(fluxStory, /FluxStepIcon/);
});
