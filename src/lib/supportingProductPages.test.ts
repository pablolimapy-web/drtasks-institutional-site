import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const resourcesPage = "src/app/produto/recursos/page.tsx";
const teamPage = "src/app/produto/equipe/page.tsx";
const resourcesShowcase = "src/components/product/ResourceShowcase.tsx";
const teamShowcase = "src/components/product/TeamShowcase.tsx";

test("resources product page publishes files and location with its own canonical", () => {
  assert.equal(fs.existsSync(resourcesPage), true);
  const source = fs.readFileSync(resourcesPage, "utf8");
  assert.match(source, /Arquivos e localização/);
  assert.match(source, /createPageMetadata[\s\S]*["']\/produto\/recursos["']/);
  assert.match(source, /Agendar demonstração/);
});

test("resources showcase uses real product screens and explains operational context", () => {
  assert.equal(fs.existsSync(resourcesShowcase), true);
  const source = fs.readFileSync(resourcesShowcase, "utf8");
  assert.match(source, /\/product\/resources\/files\.jpg/);
  assert.match(source, /\/product\/resources\/location\.jpg/);
  assert.match(source, /Arquivos/);
  assert.match(source, /Localização/);
  assert.match(source, /Dados demonstrativos protegidos/);
});

test("team product page publishes chat users and time management with its own canonical", () => {
  assert.equal(fs.existsSync(teamPage), true);
  const source = fs.readFileSync(teamPage, "utf8");
  assert.match(source, /Equipe e produtividade/);
  assert.match(source, /createPageMetadata[\s\S]*["']\/produto\/equipe["']/);
  assert.match(source, /Agendar demonstração/);
});

test("team showcase uses real product screens without overstating capabilities", () => {
  assert.equal(fs.existsSync(teamShowcase), true);
  const source = fs.readFileSync(teamShowcase, "utf8");
  assert.match(source, /\/product\/team\/chat\.jpg/);
  assert.match(source, /\/product\/team\/users\.jpg/);
  assert.match(source, /\/product\/team\/time\.jpg/);
  for (const label of ["Chat", "Usuários", "Gestão de tempo"]) {
    assert.match(source, new RegExp(label));
  }
  assert.doesNotMatch(source, /mensagens automaticamente|controle total de produtividade|rastreia tudo/i);
});
