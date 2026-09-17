import test from "node:test";
import assert from "node:assert/strict";
import { diagnosticQuestions, diagnosticStages, operationalCase } from "./operationalDiagnostic.ts";

test("diagnostic section answers the three operational questions from the commercial spec", () => {
  assert.deepEqual(diagnosticQuestions.map(item => item.id), ["stage", "owner", "blocker"]);
  assert.deepEqual(diagnosticQuestions.map(item => item.question), [
    "A OS está em qual estágio?",
    "Quem precisa agir agora?",
    "Por que isso ainda não avançou?",
  ]);
});

test("operational case exposes the context required to explain the status", () => {
  assert.equal(operationalCase.code, "OS-1042");
  assert.equal(operationalCase.currentStage, "Aprovação");
  assert.ok(operationalCase.owner.length > 0);
  assert.ok(operationalCase.deadline.length > 0);
  assert.ok(operationalCase.nextAction.length > 0);
  assert.ok(operationalCase.blocker.length > 0);
  assert.ok(operationalCase.lastMovement.length > 0);
});

test("stage map keeps approval selected inside the full operating path", () => {
  assert.deepEqual(diagnosticStages, [
    "Orçamento",
    "Aprovação",
    "Compra",
    "Execução",
    "Medição",
    "Entrega",
  ]);
  assert.equal(diagnosticStages.indexOf(operationalCase.currentStage), 1);
});
