import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pagePath = "src/app/segmentos/construcao/page.tsx";

test("construction page publishes the sector-specific narrative", () => {
  assert.equal(fs.existsSync(pagePath), true, "construction page should exist");
  const source = fs.readFileSync(pagePath, "utf8");

  assert.match(source, /Obras e contratos com o próximo passo visível\./);
  assert.match(source, /Empenho/);
  assert.match(source, /Orçamento/);
  assert.match(source, /Compra/);
  assert.match(source, /Execução/);
  assert.match(source, /Medição/);
  assert.match(source, /NF/);
  assert.match(source, /Entrega/);
});

test("construction page connects the main product pillars", () => {
  const source = fs.readFileSync(pagePath, "utf8");

  assert.match(source, /\/produto\/fluxos/);
  assert.match(source, /\/produto\/projetos-e-tarefas/);
  assert.match(source, /\/produto\/financeiro/);
  assert.match(source, /\/produto\/recursos/);
  assert.match(source, /\/demo/);
});

test("construction page states product boundaries and canonical route", () => {
  const source = fs.readFileSync(pagePath, "utf8");

  assert.match(source, /createPageMetadata[\s\S]*["\']\/segmentos\/construcao["\']/);
  assert.match(source, /não substitui ERP/i);
  assert.match(source, /contabilidade/i);
  assert.match(source, /template/i);
});
