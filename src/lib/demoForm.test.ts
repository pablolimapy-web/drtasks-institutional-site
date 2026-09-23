import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  isDemoLeadSubmissionConfigured,
  validateDemoLead,
} from "./demoForm.ts";

const demoPagePath = "src/app/demo/page.tsx";
const contactPagePath = "src/app/contato/page.tsx";
const formPath = "src/components/DemoForm.tsx";

test("demo lead validation requires the commercial minimum without inventing extra fields", () => {
  const errors = validateDemoLead({
    name: "",
    email: "invalid",
    company: "",
    segment: "",
    approximateUsers: "",
    mainProblem: "",
  });

  assert.equal(errors.name, "Informe seu nome.");
  assert.equal(errors.email, "Informe um e-mail válido.");
  assert.equal(errors.company, "Informe a empresa.");
  assert.equal(errors.segment, "Selecione o segmento.");
  assert.equal(errors.approximateUsers, "Selecione a faixa de usuários.");
  assert.equal(errors.mainProblem, undefined);
});

test("demo lead submission is only enabled when a real endpoint is configured", () => {
  assert.equal(isDemoLeadSubmissionConfigured(undefined), false);
  assert.equal(isDemoLeadSubmissionConfigured(""), false);
  assert.equal(isDemoLeadSubmissionConfigured("https://example.com/leads"), true);
});

test("demo and contact routes use the shared commercial form with explicit validation-mode copy", () => {
  for (const path of [demoPagePath, contactPagePath, formPath]) {
    assert.equal(fs.existsSync(path), true, `${path} should exist`);
  }

  const demo = fs.readFileSync(demoPagePath, "utf8");
  const contact = fs.readFileSync(contactPagePath, "utf8");
  const form = fs.readFileSync(formPath, "utf8");

  assert.match(demo, /createPageMetadata[\s\S]*["']\/demo["']/);
  assert.match(contact, /createPageMetadata[\s\S]*["']\/contato["']/);
  assert.match(demo, /<DemoForm/);
  assert.match(contact, /<DemoForm/);
  assert.match(form, /Formulário em ambiente de validação/);
  assert.match(form, /idle|submitting|success|error/);
  assert.match(form, /NEXT_PUBLIC_DEMO_LEAD_ENDPOINT/);
  assert.doesNotMatch(form, /setTimeout\(/);
});
