import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/FluxosChapter.tsx", "utf8");
const styles = fs.readFileSync("src/components/home-modules/FluxosChapter.module.css", "utf8");

test("FluxOS uses segmented stage connectors with animated completion checks", () => {
  assert.match(source, /stageConnector/);
  assert.match(source, /connectorFill/);
  assert.match(source, /StageCheckIcon/);
  assert.match(source, /pathLength/);
  assert.match(styles, /\.stageConnector/);
  assert.match(styles, /\.connectorFill/);
});

test("FluxOS keeps the stage rail clean without floating OS identifiers or proof copy", () => {
  assert.doesNotMatch(source, /fluxos-os-capsule/);
  assert.doesNotMatch(source, /OS 217/);
  assert.doesNotMatch(source, /Isso existe no produto/);
  assert.doesNotMatch(styles, /\.osCapsule/);
  assert.doesNotMatch(styles, /\.osCapsuleLabel/);
});

test("FluxOS uses the same desktop content shell as the Hero", () => {
  assert.match(styles, /width:\s*min\(calc\(100% - 80px\),\s*1500px\)/);
  assert.match(styles, /padding-inline:\s*0/);
  assert.match(styles, /@media\s*\(max-width:\s*760px\)[\s\S]*width:\s*min\(calc\(100% - 36px\),\s*1500px\)/);
});

test("FluxOS renders a large continuously redrawn icon for every stage", () => {
  assert.match(source, /StageIllustration/);
  for (const stage of ["RECEBIDA", "ANÁLISE", "EXECUÇÃO", "MEDIÇÃO", "NF"]) {
    assert.match(source, new RegExp(`case \\\"${stage}\\\"`));
  }
  assert.match(source, /repeat:\s*Infinity/);
  assert.match(source, /repeatDelay/);
  assert.match(source, /pathLength:\s*\[0,\s*1,\s*1,\s*0\]/);
  assert.match(styles, /\.stageIllustration/);
  assert.match(styles, /\.stageGlyph/);
});


test("FluxOS simplifies stage copy and presents project-centric operational details", () => {
  assert.doesNotMatch(source, /concluído/i);
  assert.doesNotMatch(source, /Uma OS não é uma linha/);
  assert.doesNotMatch(source, /onde a OS está/);
  assert.doesNotMatch(source, /Leitura operacional/);
  assert.equal((source.match(/ESTÁGIO ATUAL/g) || []).length, 1);
  assert.match(source, /Um projeto não é uma linha/);
  assert.match(source, /onde o projeto está/);
  assert.match(source, /Responsável/);
  assert.match(source, /Tempo no estágio/);
  assert.match(source, /Prazo/);
  assert.match(styles, /\.stageDetails/);
});

test("FluxOS embeds the interactive product demo instead of static screenshots", () => {
  assert.match(source, /import \{ ProductPreview \} from "@\/components\/ProductPreview"/);
  assert.match(source, /<ProductPreview mode="showcase"/);
  assert.doesNotMatch(source, /fluxos-overview\.png/);
  assert.doesNotMatch(source, /fluxos-drawer\.png/);
  assert.doesNotMatch(source, /from "next\/image"/);
  assert.match(styles, /\.interactiveProduct/);
  assert.doesNotMatch(styles, /\.drawerFrame|\.screenFrame/);
});

test("FluxOS headline is restrained to the same visual scale as neighboring chapters", () => {
  assert.match(styles, /\.header h2\s*\{[\s\S]*font-size:\s*clamp\(38px,\s*4\.2vw,\s*64px\)/);
});
