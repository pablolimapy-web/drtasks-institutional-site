import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const story = read("src/components/home-commercial/stories/QuotesStory.tsx");
const css = read("src/components/home-commercial/stories/QuotesStory.module.css");
const finance = read("src/components/home-commercial/stories/FinanceStory.tsx");

test("V114 turns Quotes into a continuous supplier decision field instead of three cards", () => {
  assert.match(story, /comparisonField/);
  assert.match(story, /supplierHeader/);
  assert.match(story, /metricRow/);
  assert.match(story, /decisionStrip/);
  assert.match(story, /decisionEquation/);
  assert.doesNotMatch(story, /className=\{styles\.offer\}/);
  assert.doesNotMatch(story, /decisionPanel/);
});

test("V114 compares the actual commercial variables and preserves construction context", () => {
  for (const cue of ["COT-018", "OS-184", "Total", "Entrega", "Pagamento", "Frete", "R$ 5.820", "35 dias"])
    assert.match(story, new RegExp(cue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("V114 uses Raycast-like hairlines and inset selection without a card grid or gradients", () => {
  assert.match(css, /--ray-void:\s*#040506/);
  assert.match(css, /--ray-ink:\s*#07080a/);
  assert.match(css, /--ray-obsidian:\s*#111214/);
  assert.match(css, /--ray-line:\s*#363739/);
  assert.match(css, /--ray-key-shadow:[\s\S]*rgba\(255,255,255,\.25\)/);
  assert.match(css, /\.supplier\[data-selected="true"\][\s\S]*box-shadow:[\s\S]*var\(--ray-key-shadow\)/);
  assert.match(css, /\.stage\s*\{[\s\S]*border:\s*1px solid var\(--ray-line\)/);
  assert.match(css, /font-family:\s*ui-monospace/);
  assert.doesNotMatch(css, /linear-gradient\(/);
});

test("V114 animates comparison before selection and stays compositionally distinct from Finance", () => {
  assert.match(story, /data-phase=\{phase\}/);
  assert.match(css, /data-phase="1"[\s\S]*supplier/);
  assert.match(css, /data-phase="2"[\s\S]*metricValue/);
  assert.match(css, /data-phase="3"[\s\S]*supplier\[data-selected="true"\]/);
  assert.match(css, /data-phase="4"[\s\S]*decisionStrip/);
  assert.match(finance, /moneyRail/);
  assert.doesNotMatch(story, /moneyRail/);
});
