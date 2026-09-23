import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const component = fs.readFileSync(path.join(root, "src/components/ModuleShowcase.tsx"), "utf8");
const css = fs.readFileSync(path.join(root, "src/components/ModuleShowcase.module.css"), "utf8");
const cardCss = fs.readFileSync(path.join(root, "src/components/react-bits/CardSwap.module.css"), "utf8");

test("module showcase keeps a subtle animated ambient layer while idle", () => {
  assert.match(component, /data-active-module=\{active\.id\}/);
  assert.match(css, /\.ambient::before/);
  assert.match(css, /\.ambient::after/);
  assert.match(css, /@keyframes ambientBreath/);
  assert.match(css, /@keyframes ambientDrift/);
});

test("product deck uses spring pointer parallax without changing the CardSwap navigation", () => {
  assert.match(component, /const \[deckParallax, deckParallaxApi\] = useSpring/);
  assert.match(component, /handleDeckPointerMove/);
  assert.match(component, /handleDeckPointerLeave/);
  assert.match(component, /onPointerMove=\{handleDeckPointerMove\}/);
  assert.match(component, /onPointerLeave=\{handleDeckPointerLeave\}/);
  assert.match(component, /className=\{styles\.deckFloat\}/);
  assert.match(component, /className=\{styles\.deckParallax\}/);
});

test("idle depth is subtle and the next action has tactile feedback", () => {
  assert.match(css, /@keyframes deckFloat/);
  assert.match(css, /\.nextButton:active/);
  assert.match(css, /\.nextButton::after/);
  assert.match(cardCss, /@keyframes deckShadowBreath/);
});

test("ambient and idle motion stop when reduced motion is requested", () => {
  const reduced = css.match(/@media \(prefers-reduced-motion: reduce\)[\s\S]*$/)?.[0] ?? "";
  assert.match(reduced, /\.ambient::before/);
  assert.match(reduced, /\.ambient::after/);
  assert.match(reduced, /\.deckFloat/);
  assert.match(reduced, /animation:\s*none/);

  const cardReduced = cardCss.match(/@media \(prefers-reduced-motion: reduce\)[\s\S]*$/)?.[0] ?? "";
  assert.match(cardReduced, /\.container::before/);
  assert.match(cardReduced, /animation:\s*none/);
});
