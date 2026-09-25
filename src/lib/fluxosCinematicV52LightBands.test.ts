import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const fluxTsx = readFileSync(new URL("../components/home-modules/FluxosChapter.tsx", import.meta.url), "utf8");
const fluxCss = readFileSync(new URL("../components/home-modules/FluxosChapter.module.css", import.meta.url), "utf8");

test("FluxOS renders three decorative moving light bands behind the content", () => {
  assert.match(fluxTsx, /className=\{styles\.lightBandField\}/);
  assert.match(fluxTsx, /styles\.lightBandOne/);
  assert.match(fluxTsx, /styles\.lightBandTwo/);
  assert.match(fluxTsx, /styles\.lightBandThree/);
});

test("FluxOS light bands animate with compositor-safe transform and opacity only", () => {
  for (const name of ["lightBandOne", "lightBandTwo", "lightBandThree"]) {
    const block = fluxCss.match(new RegExp(`\\.${name}\\s*\\{[^}]*\\}`))?.[0] ?? "";
    assert.match(block, /animation:/);
    assert.match(block, /will-change:\s*transform,\s*opacity/);
    assert.doesNotMatch(block, /filter:/);
  }

  for (const keyframes of ["lightBandDriftOne", "lightBandDriftTwo", "lightBandDriftThree"]) {
    const start = fluxCss.indexOf(`@keyframes ${keyframes}`);
    assert.notEqual(start, -1);
    const end = fluxCss.indexOf("}\n", start + 20);
    const block = fluxCss.slice(start, end + 2);
    assert.match(block, /transform:/);
    assert.match(block, /opacity:/);
    assert.doesNotMatch(block, /filter:/);
  }
});

test("FluxOS disables moving light bands for reduced motion", () => {
  const reduced = fluxCss.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g)?.join("\n") ?? "";
  assert.match(reduced, /\.lightBandOne/);
  assert.match(reduced, /\.lightBandTwo/);
  assert.match(reduced, /\.lightBandThree/);
  assert.match(reduced, /animation:\s*none\s*!important/);
});
