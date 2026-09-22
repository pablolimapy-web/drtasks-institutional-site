import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const header = readFileSync(new URL("../components/Header.tsx", import.meta.url), "utf8");

test("header uses the DR TASKS wordmark instead of the legacy D + Dr. Tasks logo", () => {
  assert.match(header, /\/brand\/dr-tasks-wordmark\.png/);
  assert.doesNotMatch(header, /<Logo\s*\/>/);
});

test("header keeps navigation inside the mega menu instead of duplicating desktop links", () => {
  assert.doesNotMatch(header, /desktop-nav/);
  assert.doesNotMatch(header, /homeNavItems/);
  assert.doesNotMatch(header, />\s*Entrar\s*</);
  assert.match(header, /<StaggeredMegaMenu\s*\/>/);
});

test("header keeps the demo CTA beside the mega-menu trigger", () => {
  assert.match(header, /primaryCta\.href/);
  assert.match(header, /primaryCta\.label/);
});

test("header constrains the DR TASKS wordmark to navigation-sized intrinsic dimensions", () => {
  assert.match(header, /width=\{150\}/);
  assert.match(header, /height=\{27\}/);
});
