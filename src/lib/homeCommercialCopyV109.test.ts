import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const narrative = fs.readFileSync("src/lib/homeCommercialNarrative.ts", "utf8");
const efficiency = fs.readFileSync("src/components/home-commercial/OperationalEfficiencyStory.tsx", "utf8");
const comparison = fs.readFileSync("src/components/home-commercial/CompetitiveDifference.tsx", "utf8");
const finalCta = fs.readFileSync("src/components/FinalCTA.tsx", "utf8");

test("V109 leads with work eliminated instead of generic software positioning", () => {
  assert.match(narrative, /Não queremos ter mais telas\. Queremos eliminar trabalho\./);
  assert.match(narrative, /tarefas, OS, medições, compras, notas, aprovações e caixa/);
  assert.match(efficiency, /O concorrente vende funcionalidades\. O cliente compra trabalho eliminado\./);
});

test("V109 sharpens module pain copy around real construction workflows", () => {
  assert.match(narrative, /Aprovação no WhatsApp deixa decisão sem rastro/);
  assert.match(narrative, /Cotação boa é decisão comparável/);
  assert.match(narrative, /O pagamento não começa no banco/);
});

test("V109 makes comparison and close process-led rather than feature-led", () => {
  assert.match(comparison, /Não compare 50 checkmarks\. Compare processos\./);
  assert.match(finalCta, /Mostre seu processo\. Não o nosso menu\./);
});

test("V109 keeps efficiency claims framed as capacity, not guaranteed layoffs", () => {
  assert.match(narrative, /capacidade administrativa potencialmente liberada/);
  assert.match(narrative, /não representa redução obrigatória de quadro nem economia garantida/);
});
