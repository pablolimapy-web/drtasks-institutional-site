import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const component = readFileSync(new URL("../components/motion/HeroBeams.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../components/HeroCommercialRotating.module.css", import.meta.url), "utf8");

test("React Bits beams are tuned for the light Dr.Tasks hero", () => {
  assert.match(component, /beamColor = ["']#5877c6["']/i);
  assert.match(component, /rotation = -18/);
  assert.match(component, /glFragColor\.a \*= 0\.38|gl_FragColor\.a \*= 0\.38/);
  assert.match(styles, /\.beamsLayer\s*\{[\s\S]*?opacity:\s*0\.46/);
  assert.match(styles, /mask-image:\s*radial-gradient/);
});

test("React Bits beams stay out of the product area on smaller layouts", () => {
  assert.match(styles, /@media \(max-width: 1000px\)[\s\S]*?\.beamsLayer\s*\{[\s\S]*?display:\s*none/);
  assert.match(styles, /\.copyContent\s*\{[\s\S]*?z-index:\s*2/);
});
