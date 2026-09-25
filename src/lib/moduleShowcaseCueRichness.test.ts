import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const cue = read("src/components/product-showcase/DemoTourCue.tsx");
const css = read("src/components/product-showcase/DemoTourCue.module.css");
const projects = read("src/components/product-showcase/ProjectsModuleDemo.tsx");
const finance = read("src/components/product-showcase/FinanceModuleDemo.tsx");
const time = read("src/components/product-showcase/TimeModuleDemo.tsx");
const location = read("src/components/product-showcase/LocationModuleDemo.tsx");

test("contextual cue supports module identity and scene-specific placement", () => {
  assert.match(cue, /module:\s*"projects"\s*\|\s*"finance"\s*\|\s*"time"\s*\|\s*"resources"/);
  assert.match(cue, /placement\?:/);
  assert.match(cue, /data-module=/);
  assert.match(cue, /data-placement=/);
  assert.match(css, /\[data-module="finance"\]/);
  assert.match(css, /\[data-module="time"\]/);
  assert.match(css, /\[data-module="resources"\]/);
  assert.match(css, /\[data-placement="top-right"\]/);
  assert.match(css, /\[data-placement="bottom-left"\]/);
});

test("each module gets a distinct professional visual language instead of generic white cards", () => {
  assert.match(cue, /sparkline/);
  assert.match(cue, /healthBar/);
  assert.match(cue, /ringGauge/);
  assert.match(cue, /routeVisual/);
  assert.match(css, /\.sparkline/);
  assert.match(css, /\.healthBar/);
  assert.match(css, /\.ringGauge/);
  assert.match(css, /\.routeVisual/);
});

test("module demos pass identity and vary cue placement across scenes", () => {
  assert.match(projects, /module="projects"/);
  assert.match(finance, /module="finance"/);
  assert.match(time, /module="time"/);
  assert.match(location, /module="resources"/);
  assert.match(projects, /placement:\s*"top-right"/);
  assert.match(finance, /placement:\s*"bottom-left"/);
  assert.match(time, /placement:\s*"top-left"/);
  assert.match(location, /placement:\s*"right-center"/);
});
