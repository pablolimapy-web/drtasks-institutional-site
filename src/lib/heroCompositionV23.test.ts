import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../app/home.css", import.meta.url), "utf8");

test("consolidated desktop hero uses the approved larger canvas and product proof", () => {
  assert.match(css, /max-width:\s*880px/);
  assert.match(css, /font-size:\s*clamp\(58px,\s*4vw,\s*72px\)/);
  assert.match(css, /font-size:\s*17px/);
  assert.match(css, /1520px/);
  assert.match(css, /gap:\s*80px/);
});

test("consolidated hero keeps a viewport-sized first fold with deliberate vertical breathing room", () => {
  assert.match(css, /min-height:\s*calc\(100svh\s*-\s*72px\)/);
  assert.match(css, /padding-top:\s*132px/);
  assert.match(css, /padding-bottom:\s*148px/);
});
