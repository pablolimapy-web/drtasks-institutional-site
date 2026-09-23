import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ResourcesChapter.tsx", "utf8");

test("Resources chapter connects files and field context with scoped Anime.js", () => {
  assert.match(source, /from "animejs"/);
  assert.match(source, /animate/);
  assert.match(source, /stagger/);
  assert.match(source, /files\.jpg/);
  assert.match(source, /location\.jpg/);
  assert.match(source, /prefersReducedMotion|useReducedMotion/);
});
