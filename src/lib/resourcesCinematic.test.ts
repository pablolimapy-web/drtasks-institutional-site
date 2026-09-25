import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync("src/components/home-modules/ResourcesChapter.tsx", "utf8");

test("resources cinematic scene restarts after leaving and re-entering viewport", () => {
  assert.ok(source.includes("IntersectionObserver"));
  assert.ok(source.includes("setSceneRun"));
  assert.ok(source.includes("sceneRun"));
});

test("resources reproduces field to project composition", () => {
  for (const token of ["fieldStack", "linkHub", "drTasksShell", "featureRail"]) {
    assert.ok(source.includes(`styles.${token}`), `${token} missing`);
  }
});
