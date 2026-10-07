import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync(path.join(process.cwd(), "src/components/home-modules/ResourcesChapter.module.css"), "utf8");

test("resources opening vignette uses a white visual field with dark readable typography", () => {
  const opening = css.match(/\.sectionOpening\s*\{([\s\S]*?)\}/);
  assert.ok(opening, "sectionOpening block must exist");
  assert.match(opening[1], /#fff(?:fff)?/i);
  assert.doesNotMatch(opening[1], /rgba\(4,\s*18,\s*38/);

  const title = css.match(/\.openingTitle strong\s*\{([\s\S]*?)\}/);
  assert.ok(title, "opening title style must exist");
  assert.match(title[1], /color:\s*#071737;/);

  const statement = css.match(/\.openingStatement\s*\{([\s\S]*?)\}/);
  assert.ok(statement, "opening statement style must exist");
  assert.match(statement[1], /color:\s*#425777;/);
});
