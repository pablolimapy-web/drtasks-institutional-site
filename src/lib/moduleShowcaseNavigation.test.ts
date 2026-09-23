import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");

test("module map links the active interface to its Home chapter", () => {
  assert.match(source, /href=\{`#\$\{module\.anchor\}`\}/);
  assert.match(source, /Conhecer \{module\.label\}/);
});

test("module map preserves the next-interface control", () => {
  assert.match(source, /Próxima interface/);
  assert.match(source, /cardSwapRef\.current\?\.next\(\)/);
});
