import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const styles = readFileSync(
  new URL("../components/HeroCommercialRotating.module.css", import.meta.url),
  "utf8",
);

function beamsRule() {
  const match = styles.match(/\.beamsLayer\s*\{([\s\S]*?)\}/);
  assert.ok(match, "missing .beamsLayer rule");
  return match[1];
}

test("desktop beams extend above and left of the hero copy so the logo area has no hard gap", () => {
  const rule = beamsRule();
  assert.match(rule, /left:\s*-3[0-9]%/);
  assert.match(rule, /top:\s*-5[0-9]%/);
  assert.match(rule, /width:\s*15[0-9]%/);
  assert.match(rule, /height:\s*12[0-9]%/);
});

test("the expanded beams still fade before the product column", () => {
  const rule = beamsRule();
  assert.match(rule, /mask-image:\s*radial-gradient\(ellipse 8[0-9]% 8[0-9]% at 3[0-9]% 3[0-9]%/);
});
