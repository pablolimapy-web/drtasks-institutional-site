import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const page = fs.readFileSync("src/app/page.tsx", "utf8");

test("Home places the module journey after the module map and before HowItWorks", () => {
  assert.match(
    page,
    /<ModuleShowcase\s*\/>[\s\S]*?<HomeModuleJourney\s*\/>[\s\S]*?<HowItWorks\s*\/>/,
  );
});
