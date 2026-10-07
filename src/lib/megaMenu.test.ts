import assert from "node:assert/strict";
import test from "node:test";
import { megaMenuItems, megaMenuActions } from "./megaMenu.ts";

test("mega menu exposes the compact commercial home navigation plus Sobre", () => {
  assert.deepEqual(
    megaMenuItems.map((item) => item.href),
    ["/#modulos", "/#modulo-fluxos", "/#modulo-financeiro", "/#modulo-projetos", "/#modulo-recursos", "/sobre"],
  );
});

test("mega menu actions keep login secondary and demo primary", () => {
  assert.deepEqual(megaMenuActions, {
    login: { label: "Entrar", href: "/login" },
    primary: { label: "Agendar demonstração", href: "/demo" },
  });
});

test("mega menu labels and hrefs are unique", () => {
  assert.equal(new Set(megaMenuItems.map((item) => item.label)).size, megaMenuItems.length);
  assert.equal(new Set(megaMenuItems.map((item) => item.href)).size, megaMenuItems.length);
});
