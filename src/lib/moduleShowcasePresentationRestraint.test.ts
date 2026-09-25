import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const showcase = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const showcaseCss = fs.readFileSync("src/components/ModuleShowcase.module.css", "utf8");
const cardSwap = fs.readFileSync("src/components/react-bits/CardSwap.tsx", "utf8");
const cue = fs.existsSync("src/components/product-showcase/DemoTourCue.tsx")
  ? fs.readFileSync("src/components/product-showcase/DemoTourCue.tsx", "utf8")
  : "";

test("guided module presentation keeps the real product legible instead of covering it with ad-like chrome", () => {
  assert.doesNotMatch(showcase, /ModuleProductTour|ModulePresentationOverlay/);
  assert.doesNotMatch(cue, /signalRail|presentationInsight|Report AI|Analyst AI/);
  assert.match(cue, /cueCard/);
  assert.match(cue, /tourCursor/);
});

test("showcase keeps CardSwap depth restrained to subtle trailing cards", () => {
  assert.match(showcase, /cardDistance=\{18\}/);
  assert.match(showcase, /verticalDistance=\{20\}/);
  assert.match(showcase, /skewAmount=\{1\}/);
  assert.match(cardSwap, /position >= 3 \? 0\.02/);
  assert.match(cardSwap, /position === 1 \? 0\.38/);
});

test("showcase backdrop is atmospheric rather than a second rounded card behind the stack", () => {
  const stageBefore = showcaseCss.match(/\.swapStage::before\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
  assert.doesNotMatch(stageBefore, /border:/);
  assert.doesNotMatch(stageBefore, /border-radius:/);
  assert.match(stageBefore, /filter:\s*blur\(/);
});
