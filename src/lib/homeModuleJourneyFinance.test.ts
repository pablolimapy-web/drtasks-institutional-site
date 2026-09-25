import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/FinanceChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/FinanceChapter.module.css", "utf8");

test("Finance chapter follows the reference hierarchy with dominant screen, stepper and compact support cards", () => {
  for (const label of ["Solicitação", "Aprovação", "Obrigação", "Pagamento", "Conciliação"]) assert.match(source, new RegExp(label));
  assert.match(source, /setInterval/);
  assert.match(source, /5600/);
  assert.match(source, /sideCards/);
  assert.match(source, /Da origem ao fechamento/);
  assert.match(source, /R\$ 42\.160,00/);
  assert.match(css, /\.stepper/);
  assert.match(css, /\.stageCard/);
  assert.match(css, /\.sideRail/);
  assert.match(css, /\.bottomStrip/);
});
