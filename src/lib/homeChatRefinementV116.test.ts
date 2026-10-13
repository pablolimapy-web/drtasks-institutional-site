import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read=(p:string)=>fs.readFileSync(p,"utf8");
const story=read("src/components/home-commercial/stories/ChatStory.tsx");
const css=read("src/components/home-commercial/stories/ChatStory.module.css");

test("V116 turns Chat into a context register instead of messenger bubbles",()=>{
  for(const cue of ["contextRibbon","messageStream","messageLine","decisionRegister","contextIndex"]) assert.match(story,new RegExp(cue));
  assert.doesNotMatch(story,/contextRail|threadFooter|pinnedDecision/);
});
test("V116 keeps messages, artifacts and decision bound to the task",()=>{
  for(const cue of ["OS-184","TAREFA #204","portaria-02.jpg","medida-final.pdf","Modelo B aprovado"]) assert.match(story,new RegExp(cue.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")));
});
test("V116 uses lines and small artifacts rather than a card grid",()=>{
  assert.match(css,/background:var\(--void\)/);assert.match(css,/border-top:1px solid/);assert.match(css,/decisionRegister[\s\S]*background:var\(--ink\)/);assert.match(css,/font-family:ui-monospace/);assert.doesNotMatch(css,/linear-gradient\(/);
});
test("V116 animation resolves messages before the registered decision",()=>{
  assert.match(css,/data-phase="1"[\s\S]*messageLine/);assert.match(css,/data-phase="3"[\s\S]*decisionRegister/);assert.match(css,/data-phase="4"[\s\S]*contextIndex/);
});
