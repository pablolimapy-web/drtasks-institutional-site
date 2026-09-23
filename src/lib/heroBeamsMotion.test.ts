import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync(new URL("../components/motion/HeroBeams.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../components/HeroCommercialRotating.module.css", import.meta.url), "utf8");

test("hero beams have visible continuous motion instead of reading as static ribbons", () => {
  assert.match(component, /uniforms\.time\.value \+= delta \* 0\.72/);
  assert.match(component, /return cnoise\(noisePos\) \* 2\.15;/);
  assert.match(component, /beamWidth = 1\.08/);
  assert.match(component, /beamNumber = 7/);
  assert.match(component, /rotation = -18/);
});

test("hero beams stay subtle behind copy while preserving product layout", () => {
  assert.match(styles, /\.beamsLayer\s*\{[\s\S]*?opacity:\s*0\.46/);
  assert.match(styles, /width:\s*156%/);
  assert.match(styles, /height:\s*124%/);
  assert.match(styles, /mask-image:\s*radial-gradient/);
});
