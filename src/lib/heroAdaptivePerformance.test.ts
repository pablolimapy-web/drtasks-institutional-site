import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const qualityModuleUrl = new URL("./heroMotionQuality.ts", import.meta.url);
const hero = readFileSync(new URL("../components/HeroCommercialRotating.tsx", import.meta.url), "utf8");
const ribbons = readFileSync(new URL("../components/HeroLightRibbons.tsx", import.meta.url), "utf8");
const ribbonsCss = readFileSync(new URL("../components/HeroLightRibbons.module.css", import.meta.url), "utf8");
const preview = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");
const previewCss = readFileSync(new URL("../components/ProductPreview.module.css", import.meta.url), "utf8");

test("hero has an adaptive motion-quality controller instead of removing animations", () => {
  assert.ok(existsSync(qualityModuleUrl), "expected a heroMotionQuality controller module");
  assert.match(hero, /useHeroMotionQuality/);
  assert.match(hero, /data-motion-quality=\{motionQuality\}/);
  assert.match(hero, /<HeroLightRibbons[\s\S]*quality=\{motionQuality\}/);
  assert.match(hero, /<ProductPreview[\s\S]*motionQuality=\{motionQuality\}/);
});

test("balanced ribbons preserve motion while using cheaper glow/filter channels", () => {
  assert.match(ribbons, /quality\?:\s*HeroMotionQuality/);
  assert.match(ribbons, /heroRibbonBlurLite/);
  assert.match(ribbons, /heroRibbonGlowLite/);
  assert.match(ribbonsCss, /\.balanced/);
  assert.match(ribbonsCss, /animation:\s*microFlash/);
  const glintPulse = ribbonsCss.match(/@keyframes glintPulse\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.doesNotMatch(glintPulse, /filter:/);
});

test("balanced product preview keeps movement but avoids the most expensive live filters", () => {
  assert.match(preview, /motionQuality\?:\s*HeroMotionQuality/);
  assert.match(preview, /styles\.motionBalanced/);
  assert.match(previewCss, /\.motionBalanced\s+\.brandGlowOne/);
  assert.match(previewCss, /\.motionBalanced\s+\.drawerBackdrop/);
  assert.match(previewCss, /\.motionBalanced\s+\.brandBadge/);
});
