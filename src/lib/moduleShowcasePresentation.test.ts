import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");
const showcase = read("src/components/ModuleShowcase.tsx");
const cardSwap = read("src/components/react-bits/CardSwap.tsx");
const heroCss = read("src/components/HeroCommercialRotating.module.css");
const logoCss = read("src/components/TechnologyLogoLoop.module.css");

test("module showcase keeps CardSwap as restrained depth while giving each product story enough time", () => {
  assert.match(showcase, /cardDistance=\{18\}/);
  assert.match(showcase, /verticalDistance=\{20\}/);
  assert.match(showcase, /skewAmount=\{1\}/);
  assert.match(showcase, /easing="focus"/);
  assert.match(showcase, /MODULE_ROTATION_DELAY_MS = 12400/);
  assert.match(showcase, /pauseOnHover/);
});

test("CardSwap has a dedicated focus transition instead of dropping the front card", () => {
  assert.match(cardSwap, /type EasingMode = "linear" \| "elastic" \| "focus"/);
  assert.match(cardSwap, /easing === "focus"/);
  assert.match(cardSwap, /filter:\s*"blur\(3px\)"/);
  assert.match(cardSwap, /scale:\s*0\.985/);
  assert.doesNotMatch(cardSwap, /y:\s*["']\+=260["']/);
});

test("hero and logo strip share an overlapping blue gradient bridge", () => {
  assert.match(heroCss, /\.heroSection::after/);
  assert.match(heroCss, /radial-gradient\(/);
  assert.match(logoCss, /margin-top:\s*-48px/);
  assert.match(logoCss, /linear-gradient\(180deg,[\s\S]*?rgba\(244,\s*248,\s*255/);
});
