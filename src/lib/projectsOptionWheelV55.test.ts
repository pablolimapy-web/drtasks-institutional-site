import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("Projects hierarchy uses one premium surface for all four layers", () => {
  assert.match(source, /className=\{styles\.hierarchyPanel\}/);
  assert.match(source, /className=\{styles\.hierarchyGrid\}/);
  assert.match(css, /\.hierarchyPanel\s*\{[\s\S]*backdrop-filter:\s*blur/);
  assert.match(css, /\.hierarchyGrid\s*\{[\s\S]*min-height:\s*675px/);
});

test("Each hierarchy level owns its own miniature product scene", () => {
  assert.match(source, /InstitutionScene/);
  assert.match(source, /WorkspaceScene/);
  assert.match(source, /ProjectScene/);
  assert.match(source, /TaskScene/);
  assert.match(css, /\.miniKanban/);
});

test("Projects hierarchy keeps enough time to read each focused level", () => {
  assert.match(source, /4800/);
  assert.match(source, /9000/);
});
