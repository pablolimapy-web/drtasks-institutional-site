import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../app/home.css", import.meta.url), "utf8");

test("consolidated hero keeps deliberate copy-preview separation", () => {
  assert.match(css, /gap:\s*80px/);
  assert.match(css, /max-width:\s*880px/);
});

test("consolidated hero keeps the rotating copy viewport stable", () => {
  assert.match(css, /min-height:\s*2\.32em\s*!important/);
  assert.match(css, /overflow:\s*hidden\s*!important/);
});
