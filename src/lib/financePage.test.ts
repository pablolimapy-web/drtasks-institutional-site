import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pagePath = "src/app/produto/financeiro/page.tsx";
const flowPath = "src/components/product/FinanceFlow.tsx";

test("finance product page exists with its own canonical metadata", () => {
  assert.equal(fs.existsSync(pagePath), true);
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /O financeiro acompanha o contexto da operação/);
  assert.match(source, /createPageMetadata[\s\S]*["']\/produto\/financeiro["']/);
  assert.match(source, /Agendar demonstração/);
});

test("finance page explains the operation-to-finance journey", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  for (const label of ["Acompanhe", "Compre", "Compare", "Analise"]) {
    assert.match(source, new RegExp(label));
  }
  for (const step of ["Projeto / OS", "Solicitação", "Cotação", "Compromisso", "Resultado"]) {
    assert.match(source, new RegExp(step));
  }
});

test("finance experience uses real product screenshots without unverified automation claims", () => {
  assert.equal(fs.existsSync(flowPath), true);
  const source = fs.readFileSync(flowPath, "utf8");
  assert.match(source, /\/product\/pillars\/finance\.jpg/);
  assert.match(source, /\/product\/finance\/requests\.jpg/);
  assert.match(source, /\/product\/finance\/quotes\.jpg/);
  assert.doesNotMatch(source, /concilia automaticamente|pagamento automático|baixa automática/i);
});
