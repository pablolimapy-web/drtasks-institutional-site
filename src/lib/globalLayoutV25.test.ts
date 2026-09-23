import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/home.css", import.meta.url), "utf8");

test("consolidated layout aligns all main home sections to the same 1520px desktop canvas", () => {
  for (const selector of [
    ".site-header .container.nav-shell",
    ".hero-commercial .container.hero-inner",
    ".pain-band > .container",
    ".flux-section > .container",
    ".how-section > .container",
    ".product-showcase-section > .container",
    ".features-section > .container",
    ".segments-section > .container",
    ".origin-section > .container",
    ".social-section > .container",
    ".pricing-section > .container",
    ".faq-section > .container",
    ".final-section > .container",
    ".site-footer .container",
  ]) {
    assert.ok(css.includes(selector), `missing aligned selector: ${selector}`);
  }
  assert.match(css, /1520px/);
  assert.match(css, /calc\(100% - 112px\)/);
});

test("consolidated layout gives post-hero sections a shared vertical rhythm", () => {
  assert.match(css, /\.pain-band\.section,[\s\S]*\.final-section\.section[\s\S]*padding-top:\s*var\(--section-space\)\s*!important/);
  assert.match(css, /--section-space:\s*118px/);
  assert.match(css, /--section-head-gap:\s*56px/);
});
