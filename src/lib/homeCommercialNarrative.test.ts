import test from "node:test";
import assert from "node:assert/strict";
import { homeCommercialModules, homeHeroNarrative } from "./homeCommercialNarrative.ts";

const expected = [
  ["fluxos", "modulo-fluxos", "Ver o FluxOS", "wide-canvas"],
  ["projects", "modulo-projetos", "Ver projetos e tarefas", "split-offset"],
  ["finance", "modulo-financeiro", "Ver o fluxo financeiro", "product-dominant"],
  ["quotes", "modulo-cotacoes", "Ver compras e cotações", "editorial-left"],
  ["requests", "modulo-solicitacoes", "Ver solicitações e alçadas", "product-dominant"],
  ["chat", "modulo-chat", "Ver comunicação no contexto", "split-offset"],
  ["team-time", "modulo-equipe-tempo", "Ver equipe e tempo", "editorial-left"],
  ["resources", "modulo-recursos", "Ver recursos de campo", "full-bleed"],
] as const;

test("commercial home has the approved eight modules in the approved order", () => {
  assert.deepEqual(homeCommercialModules.map(({ id }) => id), expected.map(([id]) => id));
  assert.equal(homeCommercialModules.length, 8);
  assert.equal(new Set(homeCommercialModules.map(({ anchor }) => anchor)).size, 8);
});

test("commercial modules expose their editorial layout and specific CTA contract", () => {
  expected.forEach(([id, anchor, ctaLabel, layout], index) => {
    const actual = homeCommercialModules[index];
    assert.equal(actual.id, id);
    assert.equal(actual.anchor, anchor);
    assert.equal(actual.ctaLabel, ctaLabel);
    assert.equal(actual.layout, layout);
    assert.ok(actual.painHeadline.length > 20);
    assert.ok(actual.support.length > 30);
    assert.ok(actual.result.length > 20);
  });
});

test("hero narrative keeps the seventeen-second product film with operational copy", () => {
  assert.equal(homeHeroNarrative.title, "Feito por quem produz, para quem produz");
  assert.equal(homeHeroNarrative.description, "O Dr. Tasks conecta tarefas, OS, medições, compras, notas, aprovações e caixa para reduzir o trabalho necessário entre uma etapa e outra da operação.");
  assert.equal(homeHeroNarrative.result, "Do orçamento ao pagamento, menos troca de contexto entre planilhas, mensagens e sistemas.");
  assert.deepEqual(homeHeroNarrative.phaseDurations, [2500, 2500, 3000, 3000, 2500, 3500]);
  assert.equal(homeHeroNarrative.phaseDurations.reduce((sum, ms) => sum + ms, 0), 17000);
  assert.equal(homeHeroNarrative.secondaryHref, "#eficiencia");
  assert.equal(homeHeroNarrative.secondaryLabel, "Ver como o processo funciona");
});
