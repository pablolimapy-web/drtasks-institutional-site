import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const presentationPath = "src/components/home-modules/TeamProductPresentation.tsx";
const teamPath = "src/components/home-modules/TeamChapter.tsx";

test("team chapter uses reconstructed HTML interfaces instead of a screenshot", () => {
  assert.ok(fs.existsSync(presentationPath), "TeamProductPresentation.tsx must exist");
  const presentation = fs.readFileSync(presentationPath, "utf8");
  const team = fs.readFileSync(teamPath, "utf8");

  assert.match(team, /TeamProductPresentation/);
  assert.doesNotMatch(team, /next\/image/);
  assert.doesNotMatch(team, /product\/team\/time\.jpg/);

  assert.match(presentation, /Tempo e produtividade/);
  assert.match(presentation, /Iniciar timer/);
  assert.match(presentation, /Gestão/);
  assert.match(presentation, /Meu painel/);
  assert.match(presentation, /Registros/);
  assert.match(presentation, /Aprovações/);
  assert.match(presentation, /Tempo total/);
  assert.match(presentation, /428:25:46/);

  assert.match(presentation, /Usuários/);
  assert.match(presentation, /Equipe, funções e acessos ao sistema/);
  assert.match(presentation, /Novo cadastro/);
  assert.match(presentation, /Todos os status/);
  assert.match(presentation, /Todas as funções/);
});

test("the reconstructed interfaces behave as an automatic product presentation", () => {
  const presentation = fs.readFileSync(presentationPath, "utf8");
  assert.match(presentation, /AnimatePresence/);
  assert.match(presentation, /presentationCursor/);
  assert.match(presentation, /interfaceVignette/);
  assert.match(presentation, /data-interface="time"/);
  assert.match(presentation, /data-interface="users"/);
  assert.match(presentation, /activeScene/);
  assert.match(presentation, /scene\.cursor/);
  assert.match(presentation, /highlight/);
  assert.match(presentation, /timerRunning/);
  assert.match(presentation, /searchTerm/);
});
