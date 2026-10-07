import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const quality = readFileSync(new URL("./heroMotionQuality.ts", import.meta.url), "utf8");
const hero = readFileSync(new URL("../components/HeroCommercialRotating.tsx", import.meta.url), "utf8");
const ribbons = readFileSync(new URL("../components/HeroLightRibbons.tsx", import.meta.url), "utf8");
const ribbonsCss = readFileSync(new URL("../components/HeroLightRibbons.module.css", import.meta.url), "utf8");
const preview = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");
const previewCss = readFileSync(new URL("../components/ProductPreview.module.css", import.meta.url), "utf8");

test("mobile starts at least balanced and can fall back to a performance tier", () => {
  assert.match(quality, /HeroMotionQuality\s*=\s*"full"\s*\|\s*"balanced"\s*\|\s*"performance"/);
  assert.match(quality, /viewportWidth\?:\s*number/);
  assert.match(quality, /viewportWidth[^\n]*<=\s*768/);
  assert.match(quality, /return\s+"performance"/);
  assert.match(quality, /averageFrameMs\s*>\s*24|longFrameRatio\s*>\s*0\.2/);
});

test("hero forwards performance quality without removing its choreography", () => {
  assert.match(hero, /data-motion-quality=\{motionQuality\}/);
  assert.match(hero, /quality=\{motionQuality\}/);
  assert.match(hero, /motionQuality=\{motionQuality\}/);
  assert.doesNotMatch(hero, /motionQuality\s*===\s*"performance"[\s\S]{0,120}\?\s*null/);
});

test("performance ribbons keep animated layers but avoid live SVG filters", () => {
  assert.match(ribbons, /const\s+performance\s*=\s*quality\s*===\s*"performance"/);
  assert.match(ribbons, /performance\s*\?\s*"none"/);
  assert.match(ribbons, /styles\.performance/);
  assert.match(ribbonsCss, /\.performance\s+\.ambientSweep/);
  assert.match(ribbonsCss, /\.performance\s+\.glintCore/);
  assert.match(ribbonsCss, /@media\s*\(max-width:\s*768px\)[\s\S]*\.ambientSweep/);
  assert.match(ribbonsCss, /animation:\s*microFlash/);
  assert.match(ribbonsCss, /animation:\s*glintPulse/);
});

test("performance product preview preserves the demo while isolating expensive paint", () => {
  assert.match(preview, /performanceMotion\s*=\s*motionQuality\s*===\s*"performance"/);
  assert.match(preview, /styles\.motionPerformance/);
  assert.match(previewCss, /\.motionPerformance\s+\.drawerBackdrop/);
  assert.match(previewCss, /\.motionPerformance\s+\.brandGlowOne/);
  assert.match(previewCss, /\.motionPerformance\s+\.frame/);
  assert.match(previewCss, /contain:\s*layout\s+paint/);
});


test("frame sampler counts real mobile stalls instead of discarding them as tab switches", () => {
  assert.doesNotMatch(quality, /delta\s*<\s*120/);
  assert.match(quality, /document\.visibilityState\s*===\s*"visible"/);
  assert.match(quality, /delta\s*<\s*500/);
  assert.match(quality, /startedAt\s*<\s*1200|now\s*-\s*startedAt\s*<\s*1200/);
});
