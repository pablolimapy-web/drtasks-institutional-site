import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const showcase = fs.readFileSync("src/components/ModuleShowcase.tsx", "utf8");
const cardSwap = fs.readFileSync("src/components/react-bits/CardSwap.tsx", "utf8");
const sequence = fs.readFileSync("src/components/product-showcase/useShowcaseSequence.ts", "utf8");
const preview = fs.readFileSync("src/components/ProductPreview.tsx", "utf8");
const previewCss = fs.readFileSync("src/components/ProductPreview.module.css", "utf8");

test("showcase gives the in-product demos enough time and pauses both deck and demo on hover", () => {
  assert.match(showcase, /MODULE_ROTATION_DELAY_MS\s*=\s*12400/);
  assert.match(showcase, /delay=\{MODULE_ROTATION_DELAY_MS\}/);
  assert.match(showcase, /pauseOnHover/);
  assert.match(showcase, /setDeckHovered/);
  assert.match(showcase, /presentationPaused \|\| deckHovered/);
});

test("internal showcase sequence still supports speed scaling and optional looping", () => {
  assert.match(sequence, /speed\?: number/);
  assert.match(sequence, /loop\?: boolean/);
  assert.match(sequence, /Math\.max\(120, Math\.round\(duration \* speed\)\)/);
  assert.match(sequence, /loop && sceneIndex >= durations\.length - 1/);
});

test("CardSwap resets its rotation timer around hover instead of advancing immediately on leave", () => {
  assert.match(cardSwap, /clearRotationTimer/);
  assert.match(cardSwap, /startRotationTimer/);
  assert.match(cardSwap, /onMouseEnter[\s\S]*clearRotationTimer\(\)/);
  assert.match(cardSwap, /onMouseLeave[\s\S]*startRotationTimer\(\)/);
});

test("FluxOS remains the visual reference and uses a readable showcase cadence", () => {
  assert.match(preview, /mode === "showcase" \? Math\.max\(720, Math\.round\(scene\.durationMs \* 0\.32\)\) : scene\.durationMs/);
  assert.match(preview, /const hoverPaused = mode === "hero" && pointerInside && sceneIndex >= 1/);
  assert.match(previewCss, /\.showcase\.showcaseMode\s*\{[\s\S]*?margin-left:\s*0/s);
  assert.match(showcase, /id === "fluxos"/);
});
