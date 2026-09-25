import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("Projects v60 keeps the old focus marker and rail removed", () => {
  assert.doesNotMatch(css, /\.wheelFocus::before\s*\{/);
  assert.doesNotMatch(css, /\.wheelFocus\s*\{/);
  assert.doesNotMatch(css, /\.wheelFocus i\s*\{/);
});
