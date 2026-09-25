import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/ProjectsChapter.tsx", "utf8");
const css = fs.readFileSync("src/components/home-modules/ProjectsChapter.module.css", "utf8");

test("Projects chapter auto-advances hierarchy when idle", () => {
  assert.match(source, /useEffect/);
  assert.match(source, /setInterval/);
  assert.match(source, /4800/);
  assert.match(source, /setActiveStep/);
});

test("Projects chapter uses cinematic staged entrance for title, panel and columns", () => {
  assert.match(source, /whileInView/);
  assert.match(source, /filter:\s*"blur\(/);
  assert.match(source, /scale:/);
  assert.match(source, /0\.22 \+ index \* 0\.13/);
});

test("Projects hierarchy keeps detached legacy wheel visuals removed", () => {
  assert.doesNotMatch(source, /OptionWheel|wheelFocus|visualBridge/);
  assert.doesNotMatch(css, /\.wheelFocus|\.visualBridge\s*\{|\.wheelStage|\.wheelShell/);
});

test("Projects chapter renders dedicated UI scenes for all four levels", () => {
  for (const label of ["Instituição", "Workspace", "Projeto", "Tarefa"]) assert.match(source, new RegExp(label));
  assert.match(source, /institutionCard/);
  assert.match(source, /workspaceList/);
  assert.match(source, /miniKanban/);
  assert.match(source, /taskCard/);
});
