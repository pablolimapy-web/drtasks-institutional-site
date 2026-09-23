import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(here, "../app");
const layout = readFileSync(resolve(app, "layout.tsx"), "utf8");

test("root layout uses consolidated site styles instead of versioned css layers", () => {
  assert.match(layout, /import "\.\/site-shell\.css";/);
  assert.match(layout, /import "\.\/home\.css";/);
  assert.doesNotMatch(layout, /import "\.\/(?:hero|alignment|home-commercial|global-layout)-[^\"]*v\d[^\"]*\.css";/);
});

test("legacy versioned style layers are removed after consolidation", () => {
  for (const file of [
    "hero-v16.css",
    "alignment-v17.css",
    "home-commercial-v18.css",
    "hero-composition-v22.css",
    "hero-composition-v23.css",
    "hero-rotating-clip-v24.css",
    "hero-alignment-v24-1.css",
    "global-layout-v25.css",
  ]) {
    assert.equal(existsSync(resolve(app, file)), false, `${file} should be removed`);
  }
});
