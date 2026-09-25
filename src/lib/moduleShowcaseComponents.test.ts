import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path: string) => fs.readFileSync(path, "utf8");

test("showcase sequence owns a single cleaned-up timer", () => {
  const source = read("src/components/product-showcase/useShowcaseSequence.ts");
  assert.match(source, /window\.setTimeout/);
  assert.match(source, /window\.clearTimeout/);
  assert.match(source, /if \(paused \|\| reducedMotion \|\| durations\.length === 0\) return/);
});

test("reconstructed demos share one Dr. Tasks shell instead of duplicating full navigation", () => {
  const shell = read("src/components/product-showcase/DemoShell.tsx");
  assert.match(shell, /Dashboard/);
  assert.match(shell, /Projetos/);
  assert.match(shell, /FluxOS/);
  assert.match(shell, /Financeiro/);
  assert.match(shell, /Localização/);
});

test("Projects demo preserves the real page hierarchy with sanitized content", () => {
  const source = read("src/components/product-showcase/ProjectsModuleDemo.tsx");
  assert.match(source, /Total de projetos/);
  assert.match(source, /Em andamento/);
  assert.match(source, /Atrasados/);
  assert.match(source, /Kanban/);
  assert.match(source, /Tabela/);
  assert.match(source, /Em Atraso/);
  assert.match(source, /Aguardando Aprovação/);
  assert.doesNotMatch(source, /SESA PR|ANATEL SC|POLICIA FEDERAL|Pablo Miguel/i);
});

test("Finance demo uses the current finance navigation instead of generic feature cards", () => {
  const source = read("src/components/product-showcase/FinanceModuleDemo.tsx");
  for (const label of ["Receitas", "Despesas", "Bancos", "Resumo", "Overhead", "Relatórios"]) {
    assert.match(source, new RegExp(label));
  }
  assert.match(source, /Emitido/);
  assert.match(source, /Recebido/);
  assert.match(source, /Saldo/);
  assert.doesNotMatch(source, /SESA PR|FORMOSA DO OESTE|ANATEL SC/i);
});

test("Time demo preserves timer, tabs and operational KPIs", () => {
  const source = read("src/components/product-showcase/TimeModuleDemo.tsx");
  assert.match(source, /Tempo e produtividade/);
  assert.match(source, /Iniciar timer/);
  for (const label of ["Gestão", "Meu painel", "Registros", "Aprovações"]) {
    assert.match(source, new RegExp(label));
  }
  for (const label of ["Tempo total", "Hoje", "Esta semana", "Faturável", "Não faturável", "Meta semanal"]) {
    assert.match(source, new RegExp(label));
  }
  assert.doesNotMatch(source, /Pablo Miguel|Ryan Lucca|Kaiky Silva Oliveira/i);
});

test("Location demo keeps the real task-location navigation and filters", () => {
  const source = read("src/components/product-showcase/LocationModuleDemo.tsx");
  assert.match(source, /Localização de tarefas/);
  for (const label of ["Kanban", "Tabela", "Gantt", "Calendário", "Localização", "Relatórios"]) {
    assert.match(source, new RegExp(label));
  }
  for (const label of ["Pesquisar", "Início", "Fim", "Projeto", "Responsável", "Status"]) {
    assert.match(source, new RegExp(label));
  }
  assert.doesNotMatch(source, /SESA PR|POLICIA FEDERAL|Pablo Miguel|Ryan Lucca/i);
});

test("reconstructed demos do not expose fake focusable controls inside presentation-only shells", () => {
  for (const file of [
    "ProjectsModuleDemo.tsx",
    "FinanceModuleDemo.tsx",
    "TimeModuleDemo.tsx",
    "LocationModuleDemo.tsx",
  ]) {
    const source = read(`src/components/product-showcase/${file}`);
    assert.doesNotMatch(source, /<button\b/, `${file} should not add non-functional buttons to the tab order`);
  }
});

test("ModuleShowcase follows the same global home canvas and vertical rhythm as the Hero", () => {
  const source = read("src/components/ModuleShowcase.tsx");
  const css = read("src/components/ModuleShowcase.module.css");

  assert.match(source, /className=\{`\$\{styles\.section\} product-showcase-section section`\}/);
  assert.match(source, /className=\{`container \$\{styles\.inner\}`\}/);
  assert.doesNotMatch(css, /\.inner\s*\{[^}]*\bwidth\s*:/s);
  assert.doesNotMatch(css, /@media[^}]*[\s\S]*?\.inner\s*\{[^}]*\bwidth\s*:/);
  assert.match(css, /\.section\s*\{[^}]*padding:\s*clamp\(72px,\s*8vw,\s*118px\)\s+0\s+clamp\(94px,\s*10vw,\s*150px\)/s);
});

test("ModuleShowcase uses CardSwap as the primary module navigation instead of a top tab rail", () => {
  const source = read("src/components/ModuleShowcase.tsx");
  assert.match(source, /import CardSwap, \{ Card/);
  assert.match(source, /moduleShowcaseModules\.map/);
  assert.match(source, /<CardSwap/);
  assert.match(source, /onActiveChange=\{handleActiveChange\}/);
  assert.doesNotMatch(source, /role="tablist"/);
  assert.doesNotMatch(source, /role="tab"/);
  assert.doesNotMatch(source, /getNextTabIndex/);
});

test("ModuleShowcase synchronizes sequential explanatory copy with the front interface", () => {
  const source = read("src/components/ModuleShowcase.tsx");
  assert.match(source, /AnimatePresence/);
  assert.match(source, /mode="wait"/);
  assert.doesNotMatch(source, /LayoutGroup/);
  assert.doesNotMatch(source, /layoutId=/);
  assert.match(source, /aria-live="polite"/);
  assert.doesNotMatch(source, /active\.eyebrow|moduleKicker/);
  assert.match(source, /module\.headline/);
  assert.match(source, /module\.description/);
  assert.doesNotMatch(source, /positionCount|positionTrack|Pausar animação/);
});

test("ModuleShowcase delegates each real interface directly to its own in-product presentation", () => {
  const source = read("src/components/ModuleShowcase.tsx");
  assert.doesNotMatch(source, /ModuleProductTour/);
  assert.match(source, /<ProductPreview[^>]*mode="showcase"/);
  assert.match(source, /ProjectsModuleDemo/);
  assert.match(source, /FinanceModuleDemo/);
  assert.match(source, /TimeModuleDemo/);
  assert.match(source, /LocationModuleDemo/);
});

test("CardSwap adapts the React Bits interaction for Dr. Tasks and cleans up GSAP timers", () => {
  const source = read("src/components/react-bits/CardSwap.tsx");
  assert.match(source, /from "gsap"/);
  assert.match(source, /onActiveChange/);
  assert.match(source, /pauseOnHover/);
  assert.match(source, /paused/);
  assert.match(source, /reducedMotion/);
  assert.match(source, /window\.setInterval/);
  assert.match(source, /window\.clearInterval/);
  assert.match(source, /tlRef\.current\?\.kill\(\)/);
  assert.match(source, /easing === "focus"/);
  assert.match(source, /filter:\s*"blur\(3px\)"/);
  assert.doesNotMatch(source, /y:\s*["']\+=260["']/);
  assert.match(source, /timeline\.addLabel\("promote", config\.promoteAt\)/);
});

test("CardSwap follows the original React Bits responsive deck scaling", () => {
  const css = read("src/components/react-bits/CardSwap.module.css");
  assert.match(css, /@media \(max-width: 768px\)/);
  assert.match(css, /scale\(\.82\)/);
  assert.match(css, /scale\(\.7\)/);
});

test("showcase removes the extra connected-product heading and lets active module copy lead", () => {
  const source = read("src/components/ModuleShowcase.tsx");
  const css = read("src/components/ModuleShowcase.module.css");
  assert.doesNotMatch(source, /Produto conectado/);
  assert.doesNotMatch(source, /Uma operação\./);
  assert.doesNotMatch(source, /Módulos que trabalham juntos\./);
  assert.match(source, /module\.headline/);
  assert.match(css, /var\(--text\)/);
  assert.match(css, /var\(--stage-accent\)/);
});
