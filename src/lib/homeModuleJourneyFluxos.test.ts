import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/FluxosChapter.tsx", "utf8");

test("FluxOS chapter is product-first and deep-links correctly", () => {
  assert.match(source, /id=\{module\.anchor\}/);
  assert.match(source, /ProductPreview/);
  assert.match(source, /mode="showcase"/);
  assert.match(source, /Saiba mais sobre FluxOS/);
  assert.match(source, /href=\{module\.href\}/);
});
