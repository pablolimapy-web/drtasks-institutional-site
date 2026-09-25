import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const finance = fs.readFileSync("src/components/home-modules/FinanceChapter.tsx", "utf8");
const financeCss = fs.readFileSync("src/components/home-modules/FinanceChapter.module.css", "utf8");
const team = fs.readFileSync("src/components/home-modules/TeamChapter.tsx", "utf8");
const teamCss = fs.readFileSync("src/components/home-modules/TeamChapter.module.css", "utf8");

test("Finance keeps the real product screen visually dominant and removes duplicated fake chrome", () => {
  assert.match(financeCss, /grid-template-columns:\s*minmax\(260px,\s*0\.29fr\)\s+minmax\(0,\s*0\.71fr\)/);
  assert.match(financeCss, /grid-template-columns:\s*minmax\(180px,\s*\.23fr\)\s+minmax\(0,\s*\.59fr\)\s+minmax\(145px,\s*\.18fr\)/);
  assert.doesNotMatch(finance, /screenTopBar/);
  assert.doesNotMatch(finance, /valueBadge/);
  assert.match(finance, /Da origem ao fechamento/);
});

test("Team keeps the timeline editorial and lets the time screen dominate", () => {
  assert.match(teamCss, /grid-template-columns:\s*minmax\(260px,\s*0\.29fr\)\s+minmax\(0,\s*0\.71fr\)/);
  assert.match(teamCss, /grid-template-columns:\s*minmax\(170px,\s*0\.22fr\)\s+minmax\(0,\s*0\.78fr\)/);
  assert.match(teamCss, /\.eventCard[\s\S]*background:\s*transparent/);
  assert.match(team, /src="\/product\/team\/time\.jpg"/);
  assert.doesNotMatch(team, /screenHeader/);
  assert.match(team, /metricRow/);
});
