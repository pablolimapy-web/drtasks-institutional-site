import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const hero = readFileSync("src/components/HeroCommercialRotating.tsx", "utf8");
const home = readFileSync("src/app/home.css", "utf8");

test("hero background renders at section scope before the content container", () => {
  const fibersIndex = hero.indexOf('className="hero-ghost-fibers"');
  const innerIndex = hero.indexOf('className="container hero-inner"');
  assert.ok(fibersIndex > -1, "full-hero React Bits GhostFibers background should exist");
  assert.ok(fibersIndex < innerIndex, "GhostFibers should render before the content container");
  assert.match(home, /\.hero-commercial \.hero-ghost-fibers\s*\{[\s\S]*?inset:\s*0/);
});

test("desktop hero gives more canvas to the product than to the headline", () => {
  assert.match(home, /grid-template-columns:\s*minmax\(0,\s*430px\)\s+minmax\(0,\s*1030px\)/);
  assert.match(home, /max-width:\s*1030px\s*!important/);
  assert.match(home, /font-size:\s*clamp\(42px,\s*2\.8vw,\s*52px\)\s*!important/);
});
