import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync(new URL("../components/StaggeredMegaMenu.module.css", import.meta.url), "utf8");

test("GSAP exclusively owns the mega menu panel translation", () => {
  const sharedRule = css.match(/\.layer,\s*\n\.panel\s*\{([\s\S]*?)\}/);
  assert.ok(sharedRule, "shared .layer/.panel rule should exist");
  assert.doesNotMatch(sharedRule[1], /transform\s*:/, "CSS transform would stack with GSAP xPercent");
});
