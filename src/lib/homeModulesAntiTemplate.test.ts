import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-commercial/HomeModulesOverview.tsx", "utf8");
const css = fs.readFileSync("src/components/home-commercial/HomeModulesOverview.module.css", "utf8");

test("module overview preserves the approved eight-module map instead of the rejected V103 asymmetry", () => {
  assert.match(source, /gridGlow/);
  assert.doesNotMatch(source, /OITO FRENTES\. UMA OPERAÇÃO\./);
  assert.match(source, /O mesmo contexto precisa atravessar a obra inteira\./);
  assert.doesNotMatch(source, /className=\{styles\.track\}/);
  assert.match(css, /grid-template-columns:\s*repeat\(4,1fr\)/);
  assert.doesNotMatch(css, /item\[data-module="fluxos"\]\{grid-column:span 7/);
});

test("module map keeps real navigation, focus and existing reduced-motion reveal guardrails", () => {
  assert.match(source, /homeCommercialModules\.map/);
  assert.match(source, /href=\{`#\$\{module\.anchor\}`\}/);
  assert.match(source, /data-module=\{module\.id\}/);
  assert.match(css, /focus-visible/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@keyframes\s+moduleReveal/);
});
