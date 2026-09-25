import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync(path.join(process.cwd(), "src/components/home-modules/ResourcesChapter.module.css"), "utf8");

const component = fs.readFileSync(path.join(process.cwd(), "src/components/home-modules/ResourcesChapter.tsx"), "utf8");

test("resources aligns to the same desktop content width as the main home chapters", () => {
  assert.doesNotMatch(css, /1760px/);
  assert.match(css, /\.inner\s*\{[\s\S]*?width:\s*min\(calc\(100% - 80px\),\s*1500px\);/);
});

test("resources desktop composition reserves a real connector corridor before the 3D product", () => {
  const grid = css.match(/\.referenceGrid\s*\{([\s\S]*?)\}/);
  assert.ok(grid, "referenceGrid block must exist");
  assert.match(grid[1], /grid-template-columns:\s*390px\s+360px\s+minmax\(0,\s*1fr\)/);
  assert.match(grid[1], /column-gap:\s*27px;/);

  const field = css.match(/\.fieldZone\s*\{([\s\S]*?)\}/);
  assert.ok(field, "fieldZone block must exist");
  assert.match(field[1], /position:\s*relative;/);
  assert.match(field[1], /grid-column:\s*2;/);
  assert.match(field[1], /width:\s*360px;/);

  const stack = css.match(/\.fieldStack\s*\{([\s\S]*?)\}/);
  assert.ok(stack, "fieldStack block must exist");
  assert.match(stack[1], /width:\s*276px;/);

  const connector = css.match(/\.connectorMap\s*\{([\s\S]*?)\}/);
  assert.ok(connector, "connectorMap block must exist");
  assert.match(connector[1], /width:\s*calc\(100% \+ 27px\);/);
  assert.doesNotMatch(connector[1], /width:\s*64%/);

  const stage = css.match(/\.drTasksStage\s*\{([\s\S]*?)\}/);
  assert.ok(stage, "drTasksStage block must exist");
  assert.match(stage[1], /grid-column:\s*3;/);
  assert.match(stage[1], /height:\s*520px;/);

  const shell = css.match(/\.drTasksShell\s*\{([\s\S]*?)\}/);
  assert.ok(shell, "drTasksShell block must exist");
  assert.match(shell[1], /height:\s*100%;/);
  assert.match(shell[1], /perspective\(1300px\)\s+rotateY\(-3\.4deg\)\s+rotateX\(0\.8deg\)/);
});

test("resources follows the same vertical section rhythm as finance and team", () => {
  const match = css.match(/\.section\s*\{([\s\S]*?)\}/);
  assert.ok(match, "section block must exist");
  assert.match(match[1], /padding:\s*clamp\(104px,\s*10vw,\s*156px\)\s+0\s+clamp\(104px,\s*10vw,\s*156px\);/);
});

test("resources keeps entry motion outside the static 3D product transform", () => {
  assert.match(component, /<motion\.div className=\{styles\.drTasksStage\}[^>]*>/);
  assert.match(component, /<div className=\{styles\.drTasksShell\}>/);
  assert.doesNotMatch(component, /<motion\.div className=\{styles\.drTasksShell\}/);
});
