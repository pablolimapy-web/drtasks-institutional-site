import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const ribbons = readFileSync(new URL("../components/HeroLightRibbons.module.css", import.meta.url), "utf8");
const ribbonsComponent = readFileSync(new URL("../components/HeroLightRibbons.tsx", import.meta.url), "utf8");
const hero = readFileSync(new URL("../components/HeroCommercialRotating.tsx", import.meta.url), "utf8");
const rotatingText = readFileSync(new URL("../components/motion/RotatingText.jsx", import.meta.url), "utf8");
const preview = readFileSync(new URL("../components/ProductPreview.tsx", import.meta.url), "utf8");

test("hero ribbons keep every ambient effect but run on closed continuous loops", () => {
  assert.doesNotMatch(ribbons, /infinite\s+alternate(?:-reverse)?/);
  assert.match(ribbons, /@keyframes topRibbonDrift\s*\{[\s\S]*?0%,\s*100%[\s\S]*?50%/);
  assert.match(ribbons, /@keyframes middleRibbonDrift\s*\{[\s\S]*?0%,\s*100%[\s\S]*?50%/);
  assert.match(ribbons, /@keyframes bottomRibbonDrift\s*\{[\s\S]*?0%,\s*100%[\s\S]*?50%/);
  assert.match(ribbons, /animation:\s*microFlash\s+[\d.]+s\s+ease-in-out\s+infinite/);
});

test("glint pulse and blink no longer fight over the same transform/filter channel", () => {
  assert.match(ribbonsComponent, /styles\.glintCore/);
  assert.match(ribbons, /\.glintCore\s*\{[\s\S]*?animation:\s*glintPulse/);
  const glintBlock = ribbons.match(/\.glint\s*\{([^}]*)\}/)?.[1] ?? "";
  assert.doesNotMatch(glintBlock, /animation:\s*glintPulse/);
  assert.match(ribbons, /\.glintBlinkA\s*\{[\s\S]*?animation:\s*lightBlinkA/);
});

test("rotating hero copy keeps character animation without layout springs", () => {
  assert.match(hero, /type:\s*"tween"/);
  assert.match(hero, /ease:\s*\[0\.22,\s*1,\s*0\.36,\s*1\]/);
  assert.match(rotatingText, /layout=\{false\}/);
  assert.doesNotMatch(hero, /stiffness:\s*410/);
});

test("product frame stays geometrically stable while drawer internals animate", () => {
  assert.match(preview, /animate=\{\{\s*opacity:\s*1,\s*y:\s*0,\s*rotateX:\s*0\s*\}\}/);
  assert.doesNotMatch(preview, /scale:\s*drawerOpen\s*\?/);
});

test("intersection pausing freezes the live hero instead of remounting it as a static image", () => {
  assert.match(hero, /const showStaticProduct = Boolean\(reducedMotion\);/);
  assert.match(hero, /auto=\{!motionPaused && !reducedMotion && productInView\}/);
  assert.match(hero, /<ProductPreview phaseIndex=\{activePhrase\} paused=\{motionPaused \|\| !productInView\} motionQuality=\{motionQuality\} \/>/);
});
