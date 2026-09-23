import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const showcase = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const cardSwap = fs.readFileSync("src/components/react-bits/CardSwap.tsx", "utf8");
const sequence = fs.readFileSync("src/components/product-showcase/useShowcaseSequence.ts", "utf8");
const preview = fs.readFileSync("src/components/ProductPreview.tsx", "utf8");
const previewCss = fs.readFileSync("src/components/ProductPreview.module.css", "utf8");

for (const file of [
  "ProjectsModuleDemo.tsx",
  "FinanceModuleDemo.tsx",
  "TimeModuleDemo.tsx",
  "LocationModuleDemo.tsx",
]) {
  test(`${file} accelerates the internal showcase sequence and can loop while hovered`, () => {
    const source = fs.readFileSync(`src/components/product-showcase/${file}`, "utf8");
    assert.match(source, /speed:\s*0\.65/);
    assert.match(source, /loop\b/);
  });
}

test("showcase rotates modules every 3.5 seconds and hover locks the current card", () => {
  assert.match(showcase, /MODULE_ROTATION_DELAY_MS\s*=\s*3500/);
  assert.match(showcase, /delay=\{MODULE_ROTATION_DELAY_MS\}/);
  assert.match(showcase, /pauseOnHover/);
  assert.match(showcase, /onMouseEnter=\{\(\) => setDeckHovered\(true\)\}/);
  assert.match(showcase, /onMouseLeave=\{\(\) => setDeckHovered\(false\)\}/);
  assert.match(showcase, /loop=\{deckHovered && module\.id === active\.id\}/);
});

test("internal showcase sequence supports speed scaling and looping at the final scene", () => {
  assert.match(sequence, /speed\?: number/);
  assert.match(sequence, /loop\?: boolean/);
  assert.match(sequence, /Math\.max\(120, Math\.round\(duration \* speed\)\)/);
  assert.match(sequence, /loop && sceneIndex >= durations\.length - 1/);
  assert.match(sequence, /setSceneIndex\(0\)/);
});

test("CardSwap resets its rotation timer around hover instead of advancing immediately on leave", () => {
  assert.match(cardSwap, /clearRotationTimer/);
  assert.match(cardSwap, /startRotationTimer/);
  assert.match(cardSwap, /onMouseEnter[\s\S]*clearRotationTimer\(\)/);
  assert.match(cardSwap, /onMouseLeave[\s\S]*startRotationTimer\(\)/);
});

test("FluxOS showcase runs faster and hovering the showcase does not pause its internal scenes", () => {
  assert.match(preview, /mode === "showcase" \? Math\.max\(420, Math\.round\(scene\.durationMs \* 0\.15\)\) : scene\.durationMs/);
  assert.match(preview, /const hoverPaused = mode === "hero" && pointerInside && sceneIndex >= 1/);
  assert.match(previewCss, /\.showcase\.showcaseMode\s*\{[\s\S]*?margin-left:\s*0/s);
});
