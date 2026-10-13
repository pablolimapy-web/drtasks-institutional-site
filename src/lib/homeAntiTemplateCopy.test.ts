import test from "node:test";
import assert from "node:assert/strict";
import {
  aiPositioningCopy,
  competitiveProcesses,
  homeCommercialModules,
  homeHeroNarrative,
  operationalEfficiencyStories,
  operationalProof,
} from "./homeCommercialNarrative.ts";

test("home copy speaks to construction operations instead of generic SaaS", () => {
  assert.equal(
    homeHeroNarrative.title,
    "Feito por quem produz, para quem produz",
  );
  assert.equal(
    homeHeroNarrative.description,
    "O Dr. Tasks conecta tarefas, OS, medições, compras, notas, aprovações e caixa para reduzir o trabalho necessário entre uma etapa e outra da operação.",
  );
  assert.equal(homeHeroNarrative.secondaryLabel, "Ver como o processo funciona");
  assert.equal(homeHeroNarrative.secondaryHref, "#eficiencia");

  assert.deepEqual(homeCommercialModules.map(({ layout }) => layout), [
    "wide-canvas",
    "split-offset",
    "product-dominant",
    "editorial-left",
    "product-dominant",
    "split-offset",
    "editorial-left",
    "full-bleed",
  ]);
  assert.ok(homeCommercialModules.every((module) => module.ctaLabel.length > 0));
});

test("operational efficiency stories use the approved before-product-result framing", () => {
  assert.deepEqual(
    operationalEfficiencyStories.map(({ before, drTasks, result }) => [before, drTasks, result]),
    [
      ["Planilha + WhatsApp + sistema financeiro", "OS → medição → NF → pagamento", "1 fluxo rastreável"],
      ["Cobrar pessoas para descobrir status", "Etapa + responsável + prazo visíveis", "menos acompanhamento manual"],
      ["Pedido de pagamento em mensagens", "Solicitação → alçada → aprovação → rastro", "aprovação rastreável"],
      ["Caixa global sem contexto da obra", "Receitas e despesas vinculadas à obra/OS", "decisão por obra"],
    ],
  );
});

test("public commercial copy avoids generic slogans and unvalidated evidence claims", () => {
  const publicCopy = JSON.stringify({
    homeHeroNarrative,
    homeCommercialModules,
    operationalEfficiencyStories,
    operationalProof,
    competitiveProcesses,
    aiPositioningCopy,
  });

  assert.doesNotMatch(publicCopy, /controle total|transforme seu negócio|potencialize resultados/i);
  assert.doesNotMatch(publicCopy, /47 construtoras|180 dias|25% comprovado|12% comprovado/i);
});
