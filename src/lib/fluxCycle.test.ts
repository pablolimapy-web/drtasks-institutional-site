import test from "node:test";
import assert from "node:assert/strict";
import { fluxDemoStages, fluxStepPercent, nextFluxStep } from "./fluxCycle.ts";

test("nextFluxStep advances through all steps and loops back to zero", () => {
  assert.equal(nextFluxStep(0, 4), 1);
  assert.equal(nextFluxStep(3, 4), 0);
});

test("nextFluxStep handles invalid totals safely", () => {
  assert.equal(nextFluxStep(2, 0), 0);
});

test("fluxStepPercent returns exact grid centers for four steps", () => {
  assert.deepEqual([0, 1, 2, 3].map((index) => fluxStepPercent(index, 4)), [12.5, 37.5, 62.5, 87.5]);
});

test("FluxOS demo stages expose valid operational portfolio data", () => {
  assert.equal(fluxDemoStages.length, 5);
  for (const stage of fluxDemoStages) {
    assert.ok(stage.label.length > 0);
    assert.ok(stage.osCount >= 0);
    assert.ok(stage.riskCount >= 0);
    assert.ok(stage.agingDays >= 0);
  }
});

test("FluxOS stages expose selectable OS records with operational context", () => {
  for (const stage of fluxDemoStages) {
    assert.ok(Array.isArray(stage.orders));
    assert.ok(stage.orders.length >= 2);

    for (const order of stage.orders) {
      assert.ok(order.id.length > 0);
      assert.ok(order.title.length > 0);
      assert.ok(order.responsible.length > 0);
      assert.ok(order.deadline.length > 0);
      assert.ok(order.status.length > 0);
      assert.ok(order.nextAction.length > 0);
      assert.ok(order.lastMovement.length > 0);
      if (order.blocker !== undefined) assert.equal(typeof order.blocker, "string");
      assert.equal(typeof order.risk, "boolean");
    }
  }
});
