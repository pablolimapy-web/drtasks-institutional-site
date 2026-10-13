import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const header = read("src/components/Header.tsx");
const headerCss = read("src/components/Header.module.css");
const hero = read("src/components/home-commercial/HomeNarrativeHero.tsx");
const heroCss = read("src/components/home-commercial/HomeNarrativeHero.module.css");
const overview = read("src/components/home-commercial/HomeModulesOverview.tsx");
const overviewCss = read("src/components/home-commercial/HomeModulesOverview.module.css");
const editorial = read("src/components/home-commercial/HomeEditorialSystem.module.css");
const shell = read("src/components/home-commercial/ModuleStoryShell.module.css");

test("V127 keeps the header transparent over the hero even after scrolling", () => {
  assert.match(header, /styles\.transparentHeader/);
  assert.match(headerCss, /\.transparentHeader\s*\{[\s\S]*background:\s*transparent\s*!important/);
  assert.match(headerCss, /\.transparentHeader:global\(\.is-scrolled\)[\s\S]*background:\s*transparent\s*!important/);
});

test("V127 removes the extra hero chrome and keeps only the interactive product surface", () => {
  assert.match(hero, /<ProductPreview[\s\S]*mode="hero"/);
  assert.doesNotMatch(hero, /INTERFACE REAL · FLUXOS/);
  assert.doesNotMatch(hero, /stageHint/);
  assert.doesNotMatch(hero, /productMeta/);
  assert.doesNotMatch(heroCss, /\.productMeta\s*\{/);
});

test("V128 restores the previous hero scale while keeping the V127 single interactive surface", () => {
  assert.match(heroCss, /font-size:\s*clamp\(52px,\s*5vw,\s*76px\)/);
  assert.doesNotMatch(heroCss, /@media\s*\(max-height:\s*820px\)\s*and\s*\(min-width:\s*981px\)/);
  assert.doesNotMatch(heroCss, /@media\s*\(max-height:\s*720px\)\s*and\s*\(min-width:\s*981px\)/);
});

test("V129 restores the previous four-column module map while keeping the V127 hero and header fixes", () => {
  assert.doesNotMatch(overview, /className=\{styles\.track\}/);
  assert.doesNotMatch(overview, /moduleOverviewMeta/);
  assert.match(overview, /className=\{styles\.rail\}/);
  assert.match(overviewCss, /grid-template-columns:\s*repeat\(4,1fr\)/);
  assert.match(overviewCss, /\.item\s*\{/);
  assert.doesNotMatch(overviewCss, /\.trackLabel\s*\{/);
});

test("V128 rolls back V127 viewport-height compaction without undoing its structural improvements", () => {
  assert.match(editorial, /--home-section-title:\s*clamp\(42px,\s*4\.2vw,\s*64px\)/);
  assert.match(editorial, /--home-section-space:\s*clamp\(104px,\s*8\.2vw,\s*142px\)/);
  assert.doesNotMatch(editorial, /@media\s*\(max-height:/);
  assert.doesNotMatch(shell, /V127 landscape framing/);
  assert.doesNotMatch(shell, /@media\s*\(max-height:/);
});
