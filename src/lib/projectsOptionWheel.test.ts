import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const chapter = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("Projects chapter replaces the old OptionWheel with a four-column hierarchy", () => {
  assert.doesNotMatch(chapter, /OptionWheel/);
  assert.match(chapter, /className=\{styles\.hierarchyGrid\}/);
  assert.match(chapter, /className=\{styles\.hierarchyColumn\}/);
  assert.match(css, /\.hierarchyGrid\s*\{[\s\S]*grid-template-columns:\s*repeat\(4/);
});

test("Projects hierarchy responds to focus, hover and click without a separate navigator", () => {
  assert.match(chapter, /onMouseEnter=\{\(\) => focusStep\(index\)\}/);
  assert.match(chapter, /onFocus=\{\(\) => focusStep\(index\)\}/);
  assert.match(chapter, /onClick=\{\(\) => focusStep\(index\)\}/);
  assert.match(chapter, /data-active=\{activeStep === index/);
});

test("Projects hierarchy keeps autoplay and respects reduced motion", () => {
  assert.match(chapter, /window\.setInterval/);
  assert.match(chapter, /4800/);
  assert.match(chapter, /interactionPauseUntil/);
  assert.match(chapter, /useReducedMotion/);
  assert.match(css, /prefers-reduced-motion/);
});
