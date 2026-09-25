import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const finance = fs.readFileSync("src/components/home-modules/FinanceChapter.tsx", "utf8");
const financeCss = fs.readFileSync("src/components/home-modules/FinanceChapter.module.css", "utf8");
const team = fs.readFileSync("src/components/home-modules/TeamChapter.tsx", "utf8");
const teamCss = fs.readFileSync("src/components/home-modules/TeamChapter.module.css", "utf8");
const teamPresentation = fs.readFileSync("src/components/home-modules/TeamProductPresentation.tsx", "utf8");

test("finance and team chapters use the same chapter container rhythm as the rest of the page", () => {
  assert.match(financeCss, /\.inner\s*\{[\s\S]*?width:\s*min\(calc\(100% - 80px\),\s*1500px\)/);
  assert.match(teamCss, /\.inner\s*\{[\s\S]*?width:\s*min\(calc\(100% - 80px\),\s*1500px\)/);
  assert.doesNotMatch(teamCss, /1640px/);
});

test("reference fidelity keeps headlines editorial instead of oversized", () => {
  assert.match(financeCss, /\.copyColumn h2\s*\{[\s\S]*?max-width:\s*390px/);
  assert.match(financeCss, /font-size:\s*clamp\(42px,\s*3\.75vw,\s*60px\)/);
  assert.match(teamCss, /\.copyColumn h2\s*\{[\s\S]*?max-width:\s*390px/);
  assert.match(teamCss, /font-size:\s*clamp\(42px,\s*3\.65vw,\s*58px\)/);
});

test("financial and team navigation use vector icons instead of typographic glyphs", () => {
  assert.match(finance, /function FinanceIcon/);
  assert.match(team, /TeamProductPresentation/);
  assert.match(teamPresentation, /function PresentationIcon/);
  assert.match(finance, /<svg/);
  assert.match(teamPresentation, /<svg/);
  assert.doesNotMatch(finance, /glyph:\s*"[▤✓▣▭▥]"/);
});

test("both chapters give every interface a cinematic reveal and living ambient motion", () => {
  assert.match(finance, /interfaceReveal/);
  assert.match(financeCss, /@keyframes financeInterfaceSweep/);
  assert.match(financeCss, /@keyframes financeNodePulse/);
  assert.match(team, /interfaceReveal/);
  assert.match(teamCss, /@keyframes teamInterfaceSweep/);
  assert.match(teamCss, /@keyframes teamTimelinePulse/);
});

test("reference proportions reserve most horizontal space for the actual product interfaces", () => {
  assert.match(financeCss, /grid-template-columns:\s*minmax\(260px,\s*0\.29fr\)\s+minmax\(0,\s*0\.71fr\)/);
  assert.match(teamCss, /grid-template-columns:\s*minmax\(260px,\s*0\.29fr\)\s+minmax\(0,\s*0\.71fr\)/);
  assert.match(teamCss, /grid-template-columns:\s*minmax\(170px,\s*0\.22fr\)\s+minmax\(0,\s*0\.78fr\)/);
});
