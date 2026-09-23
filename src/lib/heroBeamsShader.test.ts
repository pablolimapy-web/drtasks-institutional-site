import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync(
  new URL("../components/motion/HeroBeams.tsx", import.meta.url),
  "utf8",
);

test("HeroBeams declares uNoiseIntensity only once in the generated shader headers", () => {
  const declarations = component.match(/uniform float uNoiseIntensity;/g) ?? [];
  assert.equal(declarations.length, 1);
  assert.doesNotMatch(component, /fragmentHeader:\s*["']uniform float uNoiseIntensity;/);
});
