import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

test("legacy commercial routes redirect to demo in next config", () => {
  const config = read("next.config.mjs");
  for (const source of ["/teste-gratis", "/cadastro", "/planos"]) {
    assert.match(config, new RegExp(`source:\\s*[\"']${source}[\"']`), source);
  }
  assert.match(config, /destination:\s*["']\/demo["']/);
});

test("checkout and app placeholders are noindex while they are not public flows", () => {
  for (const path of ["src/app/checkout/page.tsx", "src/app/app/page.tsx"]) {
    const source = read(path);
    assert.match(source, /robots\s*:\s*\{[^}]*index\s*:\s*false[^}]*follow\s*:\s*false/s, path);
  }
});

test("legacy public routes do not contain unapproved trial promises", () => {
  const candidates = [
    "src/app/cadastro/page.tsx",
    "src/app/teste-gratis/page.tsx",
    "src/app/planos/page.tsx",
    "src/app/checkout/page.tsx",
    "src/app/app/page.tsx",
  ].filter((path) => fs.existsSync(path));

  const copy = candidates.map(read).join("\n").toLocaleLowerCase("pt-BR");
  for (const phrase of ["14 dias", "sem cartão", "começar teste", "período de teste"]) {
    assert.equal(copy.includes(phrase), false, phrase);
  }
});
