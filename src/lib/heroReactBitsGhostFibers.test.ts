import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const fibers = readFileSync(new URL("../components/motion/GhostFibers.jsx", import.meta.url), "utf8");
const fibersCss = readFileSync(new URL("../components/motion/GhostFibers.css", import.meta.url), "utf8");
const hero = readFileSync(new URL("../components/HeroCommercialRotating.tsx", import.meta.url), "utf8");
const homeCss = readFileSync(new URL("../app/home.css", import.meta.url), "utf8");
const packageJson = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));

test("hero uses the React Bits GhostFibers OGL rendering stack", () => {
  assert.equal(packageJson.dependencies.ogl, "^1.0.11");
  assert.match(fibers, /from ['"]ogl['"]/);
  assert.match(fibers, /new Renderer\(/);
  assert.match(fibers, /new Program\(/);
  assert.match(fibers, /new Triangle\(/);
  assert.match(fibers, /prefers-reduced-motion: reduce/);
  assert.match(fibersCss, /\.ghost-fibers-container\s*\{[\s\S]*width:\s*100%;[\s\S]*height:\s*100%;/);
});

test("hero wires the requested GhostFibers configuration over the full section", () => {
  assert.match(hero, /import GhostFibers from "\.\/motion\/GhostFibers"/);
  assert.match(hero, /className="hero-ghost-fibers"/);
  assert.match(hero, /lineColor="#1c55c9"/);
  assert.match(hero, /glowColor="#5f8ff7"/);
  assert.match(hero, /speed=\{0\.2\}/);
  assert.match(hero, /scale=\{1\.7\}/);
  assert.match(hero, /rotation=\{-18\}/);
  assert.match(hero, /rotationSpeed=\{0\.12\}/);
  assert.match(hero, /layers=\{5\}/);
  assert.match(hero, /waveAmplitude=\{0\.026\}/);
  assert.match(hero, /waveFrequency=\{3\}/);
  assert.match(hero, /waveSpeed=\{0\.15\}/);
  assert.match(hero, /layerSpeed=\{0\.08\}/);
  assert.match(hero, /twist=\{0\.16\}/);
  assert.match(hero, /twistFrequency=\{5\}/);
  assert.match(hero, /twistSpeed=\{1\.2\}/);
  assert.match(hero, /lineFrequency=\{4\.2\}/);
  assert.match(hero, /lineSpacing=\{1\.6\}/);
  assert.match(hero, /lineSharpness=\{10\}/);
  assert.match(hero, /glowFalloff=\{7\}/);
  assert.match(hero, /glowIntensity=\{2\.15\}/);
  assert.match(hero, /brightness=\{2\.1\}/);
  assert.match(hero, /blueBoost=\{1\.12\}/);
  assert.match(hero, /vignette=\{0\.08\}/);
  assert.match(hero, /grain=\{0\.01\}/);
  assert.match(hero, /lightMode/);
  assert.match(hero, /dpr=\{1\}/);
  assert.match(hero, /paused=\{motionPaused \|\| !productInView\}/);
  assert.match(homeCss, /\.hero-commercial \.hero-ghost-fibers\s*\{[\s\S]*position:\s*absolute;[\s\S]*inset:\s*0;/);
  assert.match(homeCss, /\.hero-commercial\s*\{[\s\S]*background:\s*#ffffff !important;/);
  assert.match(fibers, /smoothstep\(0\.045, 0\.78, fiberField\)/);
  assert.match(fibers, /fiberInk, fibers \* 0\.78/);
  assert.match(fibers, /glowInk, glowField \* 0\.42/);
  assert.match(homeCss, /\.hero-commercial \.hero-ghost-fibers \.ghost-fibers-container\s*\{[\s\S]*opacity:\s*1;/);
});

test("GhostFibers hero keeps the product presentation dominant", () => {
  assert.match(hero, /<div className="hero-product hero-enter hero-enter-last">/);
  assert.match(homeCss, /grid-template-columns:\s*minmax\(0, 430px\) minmax\(0, 1030px\)/);
  assert.match(homeCss, /\.hero-commercial \.hero-product-stage::before\s*\{[\s\S]*rgba\(28, 85, 201,/);
});
