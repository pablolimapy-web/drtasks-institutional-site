import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const hero = read("src/components/home-commercial/HomeNarrativeHero.tsx");
const heroCss = read("src/components/home-commercial/HomeNarrativeHero.module.css");
const ribbons = read("src/components/HeroLightRibbons.tsx");
const ribbonsCss = read("src/components/HeroLightRibbons.module.css");
const editorial = read("src/components/home-commercial/HomeEditorialSystem.module.css");
const shell = read("src/components/home-commercial/ModuleStoryShell.module.css");
const finalCta = read("src/components/FinalCTA.module.css");

const sectionStyles = [
  "src/components/home-commercial/HomeModulesOverview.module.css",
  "src/components/home-commercial/OperationalEfficiencyStory.module.css",
  "src/components/home-commercial/OperationalProof.module.css",
  "src/components/home-commercial/CompetitiveDifference.module.css",
  "src/components/home-commercial/AIPositioning.module.css",
  "src/components/OriginStory.module.css",
].map(read);

test("V126 returns the home to the navy Dr Tasks canvas instead of the neutral Raycast canvas", () => {
  assert.match(editorial, /--home-canvas:\s*#06111f/i);
  assert.match(editorial, /--home-canvas-soft:\s*#071522/i);
  assert.match(editorial, /--home-ink:\s*#f5f8ff/i);
  assert.match(editorial, /--home-muted:\s*#9baec9/i);
  assert.match(editorial, /--home-accent:\s*#2f7cff/i);
  assert.doesNotMatch(editorial, /--home-canvas:\s*#040506/i);
});

test("V126 restores the interactive product interface as the hero protagonist", () => {
  assert.match(hero, /import \{ ProductPreview \}/);
  assert.match(hero, /<ProductPreview[\s\S]*mode="hero"/);
  assert.match(hero, /homeHeroNarrative\.title/);
  assert.match(hero, /homeHeroNarrative\.description/);
  assert.doesNotMatch(hero, /RealDrTasksFinancialFilm/);
});

test("V126 brings the old ribbon motion language back in a restrained dark variant", () => {
  assert.match(hero, /HeroLightRibbons/);
  assert.match(hero, /tone="dark"/);
  assert.match(ribbons, /tone\?:\s*"light"\s*\|\s*"dark"/);
  assert.match(ribbonsCss, /\.dark\s*\{/);
  assert.match(ribbonsCss, /\.dark \.ribbonSvg/);
  assert.match(heroCss, /prefers-reduced-motion:\s*reduce/);
});

test("V126 restores designed blue action buttons instead of neutral or bare text CTAs", () => {
  assert.match(heroCss, /\.primary[\s\S]*linear-gradient[\s\S]*#2f7cff/i);
  assert.match(shell, /\.cta[\s\S]*border:[^;]*rgba\(105, 174, 255/);
  assert.match(shell, /\.cta[\s\S]*border-radius:\s*14px/);
  assert.match(finalCta, /\.primary[\s\S]*background:[^;]*#2f7cff/i);
  assert.doesNotMatch(finalCta, /\.primary[\s\S]*background:#e6e6e6/);
});

test("V126 standardizes top-level section typography around the previous Dr Tasks scale", () => {
  assert.match(editorial, /--home-section-title:\s*clamp\(42px,\s*4\.2vw,\s*64px\)/);
  assert.match(editorial, /--home-section-body:\s*16px/);
  assert.match(shell, /font-size:\s*var\(--home-section-title\)/);
  assert.match(shell, /font-size:\s*var\(--home-section-body\)/);
  for (const css of sectionStyles) {
    assert.match(css, /var\(--home-section-title\)/);
  }
});
