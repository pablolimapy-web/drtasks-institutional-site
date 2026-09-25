import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const fluxTsx = readFileSync(new URL("../components/home-modules/FluxosChapter.tsx", import.meta.url), "utf8");
const fluxCss = readFileSync(new URL("../components/home-modules/FluxosChapter.module.css", import.meta.url), "utf8");

test("FluxOS headline stays renderable while the parent owns the cinematic entrance", () => {
  assert.match(fluxTsx, /<h2\s+id="fluxos-title">/);
  assert.doesNotMatch(fluxTsx, /<motion\.h2[\s\S]{0,650}clipPath/);
});

test("FluxOS ambient background avoids animating large filtered layers", () => {
  const beforeBlock = fluxCss.match(/\.section::before\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const afterBlock = fluxCss.match(/\.section::after\s*\{[\s\S]*?\}/)?.[0] ?? "";
  const glowBlock = fluxCss.match(/\.glow\s*\{[^}]*\}/)?.[0] ?? "";

  assert.doesNotMatch(beforeBlock, /filter:\s*blur/);
  assert.doesNotMatch(afterBlock, /filter:\s*blur/);
  assert.doesNotMatch(glowBlock, /animation:/);
  assert.match(beforeBlock, /will-change:\s*transform,\s*opacity/);
});
