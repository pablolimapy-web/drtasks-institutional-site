import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const styles = readFileSync(
  new URL("../components/HeroCommercialRotating.module.css", import.meta.url),
  "utf8",
);

test("hero beams fade out vertically before the supporting copy and CTAs", () => {
  assert.match(styles, /\.beamsLayer::before\s*\{[\s\S]*?position:\s*absolute/);
  assert.match(styles, /\.beamsLayer::before\s*\{[\s\S]*?height:\s*4[0-9]%/);
  assert.match(styles, /\.beamsLayer::before\s*\{[\s\S]*?bottom:\s*0/);
  assert.match(styles, /background:\s*linear-gradient\(180deg,\s*rgba\(255,\s*255,\s*255,\s*0\)[\s\S]*?#fff\s*100%\)/);
});
