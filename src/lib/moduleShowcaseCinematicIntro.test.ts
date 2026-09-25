import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const styles = fs.readFileSync("src/components/ModuleShowcase.module.css", "utf8");

test("module copy enters as a staged cinematic sequence instead of one flat fade", () => {
  assert.match(source, /headlineMask/);
  assert.match(source, /headlineWord/);
  assert.match(source, /module\.headline\.split/);
  assert.match(source, /copyDescription/);
  assert.match(source, /copyActions/);
  assert.match(source, /delay:\s*0\.18\s*\+\s*index\s*\*\s*0\.045/);
});

test("active interface owns a cinematic entrance before its in-product demo starts", () => {
  assert.match(source, /CINEMATIC_INTRO_MS\s*=\s*2200/);
  assert.match(source, /introReady/);
  assert.match(source, /setIntroReady\(false\)/);
  assert.match(source, /window\.setTimeout\(\(\) => setIntroReady\(true\), CINEMATIC_INTRO_MS\)/);
  assert.match(source, /!introReady/);
  assert.match(source, /ModuleIntroScene/);
  assert.doesNotMatch(source, /MODULE_CINEMATIC_ENTRANCES/);
  assert.match(source, /isActive && \(stageInView \|\| reducedMotion\)/);
});

test("cinematic stage adds light, depth and a controlled interface sweep", () => {
  assert.match(source, /cinematicAura/);
  assert.match(source, /demoReveal/);
  assert.match(styles, /\.cinematicAura/);
  assert.match(styles, /\.demoReveal/);
  assert.match(source, /ModuleIntroScene/);
  assert.match(styles, /perspective:/);
});
