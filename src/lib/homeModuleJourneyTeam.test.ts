import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync("src/components/home-modules/TeamChapter.tsx", "utf8");

test("Team chapter uses Motion layout for user-triggered screen changes", () => {
  assert.match(source, /layoutId="team-active-indicator"/);
  assert.match(source, /layout="position"/);
  for (const asset of ["time.jpg", "chat.jpg", "users.jpg"]) assert.match(source, new RegExp(asset.replace(".", "\\.")));
});
