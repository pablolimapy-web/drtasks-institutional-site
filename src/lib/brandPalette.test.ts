import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const globals = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

test("global brand palette matches the DR TASKS wordmark blue", () => {
  assert.match(globals, /--brand:#1c55c9;/);
  assert.match(globals, /--brand-dark:#1747aa;/);
});

test("primary button shadow follows the DR TASKS wordmark hue", () => {
  assert.match(globals, /\.button-primary\{[^}]*rgba\(28,85,201,\.22\)/);
  assert.match(globals, /\.button-primary:hover\{[^}]*rgba\(28,85,201,\.30\)/);
});
