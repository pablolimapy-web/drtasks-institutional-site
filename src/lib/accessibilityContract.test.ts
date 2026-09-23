import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { getNextTabIndex } from "./accessibility.ts";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

const megaMenu = read("../components/StaggeredMegaMenu.tsx");
const productShowcase = read("../components/ProductShowcase.tsx");
const hero = read("../components/HeroCommercialRotating.tsx");
const moduleShowcase = read("../components/ModuleShowcase.tsx");
const pillars = read("../components/ProductPillars.tsx");
const financeFlow = read("../components/product/FinanceFlow.tsx");
const painBand = read("../components/PainBand.tsx");
const fluxos = read("../components/FluxOS.tsx");
const hierarchy = read("../components/product/HierarchyExplorer.tsx");
const resources = read("../components/product/ResourceShowcase.tsx");
const team = read("../components/product/TeamShowcase.tsx");

test("tab navigation wraps and supports Home/End", () => {
  assert.equal(getNextTabIndex(0, 4, "ArrowLeft"), 3);
  assert.equal(getNextTabIndex(3, 4, "ArrowRight"), 0);
  assert.equal(getNextTabIndex(2, 4, "Home"), 0);
  assert.equal(getNextTabIndex(1, 4, "End"), 3);
  assert.equal(getNextTabIndex(1, 4, "Enter"), null);
});

test("InfiniteMenu is dynamically imported instead of entering the initial ProductShowcase bundle", () => {
  assert.match(productShowcase, /dynamic\(\(\)\s*=>\s*import\("\.\/motion\/InfiniteMenu"\)/);
  assert.doesNotMatch(productShowcase, /import InfiniteMenu from "\.\/motion\/InfiniteMenu"/);
});

test("hero motion can be paused without depending on ProductPreview internals", () => {
  assert.match(hero, /auto=\{!motionPaused && !reducedMotion\}/);
  assert.match(hero, /useInView\(productStageRef/);
  assert.match(hero, /showStaticProduct/);
  assert.match(hero, /hero-product-static/);
  assert.match(hero, /aria-pressed=\{motionPaused\}/);
  assert.match(hero, /<ProductPreview phaseIndex=\{activePhrase\} \/>/);
});

test("major auto-rotating experiences expose pause controls and reduced-motion guards", () => {
  for (const [name, source] of [
    ["ProductPillars", pillars],
    ["FinanceFlow", financeFlow],
    ["PainBand", painBand],
    ["FluxOS", fluxos],
  ] as const) {
    assert.match(source, /useReducedMotion\(/, `${name} should read reduced-motion preference`);
    assert.match(source, /aria-pressed=/, `${name} should expose an explicit pause state`);
  }
});


test("ModuleShowcase uses explicit navigation instead of an unpausable auto-rotation", () => {
  assert.match(moduleShowcase, /useReducedMotion\(/);
  assert.match(moduleShowcase, /delay=\{0\}/);
  assert.match(moduleShowcase, /Próxima interface/);
  assert.doesNotMatch(moduleShowcase, /aria-pressed=/);
});


test("all product tablists support roving tabindex and arrow-key navigation", () => {
  for (const [name, source] of [
    ["ProductPillars", pillars],
    ["FinanceFlow", financeFlow],
    ["PainBand", painBand],
    ["FluxOS", fluxos],
    ["HierarchyExplorer", hierarchy],
    ["ResourceShowcase", resources],
    ["TeamShowcase", team],
  ] as const) {
    assert.match(source, /getNextTabIndex/, `${name} should support arrow-key tab navigation`);
    assert.match(source, /tabIndex=\{[^}]+\? 0 : -1\}/, `${name} should use roving tabindex`);
    assert.match(source, /aria-controls=/, `${name} should associate tabs with their panel`);
  }
});

test("mega menu traps keyboard focus, handles Escape and restores focus to its trigger", () => {
  assert.match(megaMenu, /event\.key === "Escape"/);
  assert.match(megaMenu, /event\.key === "Tab"/);
  assert.match(megaMenu, /focusableSelector/);
  assert.match(megaMenu, /triggerRef\.current\?\.focus\(\)/);
  assert.match(megaMenu, /document\.body\.style\.overflow = "hidden"/);
  assert.match(megaMenu, /aria-expanded=\{open\}/);
  assert.match(megaMenu, /data-mega-backdrop/);
});
