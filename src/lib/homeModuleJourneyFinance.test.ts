import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/FinanceChapter.tsx", "utf8");

test("Finance chapter uses real screens and no invented monetary metrics", () => {
  assert.match(source, /finance\.jpg/);
  assert.match(source, /requests\.jpg/);
  assert.match(source, /quotes\.jpg/);
  assert.doesNotMatch(source, /R\$\s*[\d.,]+[MK]?/);
  assert.match(source, /Solicitações/);
  assert.match(source, /Cotações/);
  assert.match(source, /Leitura consolidada/);
});
