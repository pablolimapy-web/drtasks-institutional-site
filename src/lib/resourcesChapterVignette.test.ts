import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ResourcesChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ResourcesChapter.module.css", "utf8");

test("Resources chapter reuses the cinematic section-opening vignette pattern", () => {
  assert.match(source, /AnimatePresence/);
  assert.match(source, /DR\.TASKS \/ MÓDULO 05/);
  assert.match(source, /CAMPO/);
  assert.match(source, /EVIDÊNCIA/);
  assert.match(source, /CONTEXTO/);
  assert.match(source, /PROJETO/);
  assert.match(source, /2600/);
  assert.match(source, /sectionOpening/);
  assert.match(source, /openingBridge/);
  assert.match(source, /openingStatement/);
});

test("Resources chapter waits for the vignette before starting the existing field/product animation", () => {
  assert.match(source, /storyActive/);
  assert.match(source, /sceneActive\s*&&\s*!opening/);
  assert.match(source, /setSceneActive\(false\)/);
  assert.match(source, /setSceneActive\(true\)/);
});

test("Resources opening has the same cinematic sweep/glow grammar and reduced-motion fallback", () => {
  assert.match(css, /\.sectionOpening/);
  assert.match(css, /\.openingBridge/);
  assert.match(css, /@keyframes\s+resourcesOpeningSweep/);
  assert.match(css, /@keyframes\s+resourcesOpeningGlowBreath/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
