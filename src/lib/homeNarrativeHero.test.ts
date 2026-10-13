import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const hero = fs.readFileSync("src/components/home-commercial/HomeNarrativeHero.tsx", "utf8");
const css = fs.readFileSync("src/components/home-commercial/HomeNarrativeHero.module.css", "utf8");
const preview = fs.readFileSync("src/components/ProductPreview.tsx", "utf8");

test("narrative hero sells the approved positioning through the real interactive product interface", () => {
  assert.match(hero, /homeHeroNarrative\.title/);
  assert.match(hero, /homeHeroNarrative\.description/);
  assert.match(hero, /primaryCta\.href/);
  assert.match(hero, /homeHeroNarrative\.secondaryHref/);
  assert.match(hero, /ProductPreview/);
  assert.match(hero, /mode="hero"/);
  assert.doesNotMatch(hero, /RealDrTasksFinancialFilm/);
  assert.match(preview, /interactionMode/);
  assert.match(preview, /pointerInside/);
});

test("narrative hero owns the restored dark navy responsive reduced-motion visual system", () => {
  for (const token of ["#06111F", "#2F7CFF", "#F5F8FF", "#9BAEC9"]) {
    assert.match(css.toUpperCase(), new RegExp(token.toUpperCase()));
  }
  assert.match(css, /@media\s*\(max-width:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(hero, /HeroLightRibbons/);
  assert.match(hero, /tone="dark"/);
});

test("hero exposes motion control without replacing direct product interaction", () => {
  assert.match(hero, /motionPaused/);
  assert.match(hero, /aria-pressed=\{motionPaused\}/);
  assert.match(hero, /heroInView/);
  assert.match(hero, /productInView/);
  assert.match(hero, /<HeroLightRibbons[\s\S]*paused=\{backgroundPaused\}/);
  assert.match(hero, /<ProductPreview[\s\S]*paused=\{productPaused\}/);
});
