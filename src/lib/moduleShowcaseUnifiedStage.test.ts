import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const styles = fs.readFileSync("src/components/ModuleShowcase.module.css", "utf8");

test("module showcase presents copy and product inside one colored presentation stage", () => {
  assert.match(source, /className=\{styles\.presentationStage\}/);
  assert.match(source, /data-module=\{active\.id\}/);
  assert.match(source, /className=\{styles\.stageCopy\}/);
  assert.match(source, /className=\{styles\.stageProduct\}/);
  assert.doesNotMatch(source, /className=\{styles\.showcaseGrid\}/);
  assert.doesNotMatch(source, /className=\{styles\.copyColumn\}/);
  assert.doesNotMatch(source, /className=\{styles\.deckColumn\}/);
});

test("the unified stage owns the colored atmosphere instead of white split columns", () => {
  const stageRule = styles.match(/\.presentationStage\s*\{[\s\S]*?\n\}/)?.[0] ?? "";
  assert.match(stageRule, /border-radius:/);
  assert.match(stageRule, /background:/);
  assert.match(stageRule, /min-height:/);
  assert.match(styles, /\.presentationStage\[data-module="fluxos"\]/);
  assert.match(styles, /\.presentationStage\[data-module="finance"\]/);
  assert.match(styles, /\.stageProduct/);
});

test("CardSwap remains inside the unified presentation and gives demos enough time to tell a story", () => {
  assert.match(source, /<CardSwap/);
  assert.match(source, /MODULE_ROTATION_DELAY_MS\s*=\s*12400/);
  const stageIndex = source.indexOf("className={styles.presentationStage}");
  const cardSwapIndex = source.indexOf("<CardSwap\n", stageIndex);
  assert.ok(stageIndex >= 0 && cardSwapIndex > stageIndex, "CardSwap should render inside the presentation stage");
});

test("module copy transitions inside the colored stage while the active product demo is synchronized", () => {
  assert.match(source, /AnimatePresence initial=\{false\} mode="wait"/);
  assert.match(source, /paused=\{presentationPaused \|\| deckHovered \|\| !introReady\}/);
});
