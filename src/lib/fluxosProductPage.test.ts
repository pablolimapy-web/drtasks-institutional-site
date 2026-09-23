import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const pagePath = "src/app/produto/fluxos/page.tsx";
const demoPath = "src/components/product/FluxosPortfolioDemo.tsx";
const detailPath = "src/components/product/OperationalItemDetail.tsx";

test("FluxOS product page exists with its own canonical metadata", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /FluxOS — Gestão operacional por estágios/);
  assert.match(source, /createPageMetadata[\s\S]*["']\/produto\/fluxos["']/);
});

test("FluxOS product page explains portfolio, operating model and demo CTA", () => {
  const source = fs.readFileSync(pagePath, "utf8");
  assert.match(source, /Cada OS tem um caminho/);
  assert.match(source, /Projeto/);
  assert.match(source, /Estágio/);
  assert.match(source, /Tarefa/);
  assert.match(source, /href=["']\/demo["']/);
});

test("FluxOS portfolio demo exposes operational context instead of a static screenshot", () => {
  const source = fs.readFileSync(demoPath, "utf8");
  const detail = fs.readFileSync(detailPath, "utf8");
  assert.match(source, /fluxDemoStages/);
  assert.match(source, /Demonstração com dados de exemplo/);
  assert.match(detail, /Próxima ação/);
  assert.match(detail, /Bloqueio/);
  assert.match(detail, /Última movimentação/);
});
