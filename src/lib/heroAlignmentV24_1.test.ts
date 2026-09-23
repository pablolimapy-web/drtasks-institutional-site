import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/home.css", import.meta.url), "utf8");

test("consolidated hero locks header, hero and first section to the same wide desktop axis", () => {
  assert.match(css, /\.site-header \.container\.nav-shell/);
  assert.match(css, /\.hero-commercial \.container\.hero-inner/);
  assert.match(css, /\.pain-band > \.container/);
  assert.match(css, /1520px/);
  assert.match(css, /calc\(100% - 112px\)/);
});

test("consolidated hero removes preview horizontal offset and centers both columns", () => {
  assert.match(css, /\.hero-commercial \.hero-product[\s\S]*transform:\s*none\s*!important/);
  assert.match(css, /\.hero-commercial \.hero-main[\s\S]*align-items:\s*center\s*!important/);
});
