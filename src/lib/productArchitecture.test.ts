import test from "node:test";
import assert from "node:assert/strict";
import { productPillars, publishedRoutes } from "./productArchitecture.ts";

test("product architecture exposes the five commercial pillars", () => {
  assert.deepEqual(
    productPillars.map((pillar) => pillar.id),
    ["fluxos", "projects", "finance", "resources", "team"],
  );
});

test("published routes include the institutional MVP architecture", () => {
  for (const path of [
    "/produto/fluxos",
    "/produto/projetos-e-tarefas",
    "/produto/financeiro",
    "/produto/recursos",
    "/produto/equipe",
    "/segmentos/construcao",
    "/como-funciona",
    "/sobre",
    "/guia",
    "/demo",
  ]) {
    assert.ok(publishedRoutes.includes(path as (typeof publishedRoutes)[number]), path);
  }
});
