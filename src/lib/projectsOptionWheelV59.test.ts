import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("projects wheel keeps redundant guide visuals removed", () => {
  assert.doesNotMatch(source, />Estrutura operacional</);
  assert.doesNotMatch(source, /visualBridge/);
  assert.doesNotMatch(css, /\.visualBridge\s*\{/);
  assert.doesNotMatch(source, /wheelFocus/);
  assert.doesNotMatch(css, /\.wheelFocus/);
});
