import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/home.css", import.meta.url), "utf8");

test("consolidated hero reserves enough vertical room for a two-line rotating phrase", () => {
  assert.match(css, /min-height:\s*2\.32em/);
  assert.match(css, /padding-bottom:\s*0\.12em/);
  assert.match(css, /overflow:\s*hidden/);
});
