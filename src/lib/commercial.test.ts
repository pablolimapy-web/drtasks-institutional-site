import test from "node:test";
import assert from "node:assert/strict";
import { commercialPositioning, homeNavItems, primaryCta } from "./commercial.ts";

test("commercial launch copy contains no unapproved trial promises", () => {
  const copy = JSON.stringify({ commercialPositioning, primaryCta }).toLowerCase();
  assert.equal(copy.includes("14 dias"), false);
  assert.equal(copy.includes("sem cartão"), false);
  assert.equal(copy.includes("cancele quando quiser"), false);
});

test("home navigation matches the MVP commercial architecture", () => {
  assert.deepEqual(homeNavItems.map(item => item.label), [
    "Produto",
    "Para quem é",
    "Como funciona",
    "Recursos",
  ]);
});
