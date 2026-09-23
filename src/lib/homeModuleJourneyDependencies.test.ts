import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

for (const file of [
  "src/components/react-bits/AnimatedContent.tsx",
  "src/components/react-bits/Stack.tsx",
  "src/components/react-bits/SpotlightCard.tsx",
]) {
  test(`React Bits primitive exists: ${file}`, () => {
    assert.equal(fs.existsSync(file), true);
  });
}

test("Anime.js is pinned for the scoped Resources interaction", () => {
  assert.equal(pkg.dependencies.animejs, "^4.5.0");
});
