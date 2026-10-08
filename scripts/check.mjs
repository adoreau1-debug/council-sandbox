#!/usr/bin/env node
// council-sandbox test judge entry point (run by council.yaml; this file is hash-pinned there).
//
// Every task has canonical tests in spec/<Tnn>-<module>.test.mjs for src/<module>.mjs.
// Which task a commit belongs to comes from its subject: the runner writes "council: [Tnn] <title> (attempt N)".
//   - commit names a task  -> that task's module must exist and its spec must pass
//   - otherwise            -> at least one module must exist; every existing module's spec must pass
// Extra tests a Builder adds under test/ must pass too. Exit code 0 = PASS.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const specs = fs.readdirSync(path.join(root, "spec")).filter((f) => /^T\d{2}-[a-z0-9-]+\.test\.mjs$/.test(f)).sort();
const moduleOf = (spec) => spec.replace(/^T\d{2}-/, "").replace(/\.test\.mjs$/, "");
const taskOf = (spec) => spec.slice(0, 3);

let subject = "";
const g = spawnSync("git", ["log", "-1", "--format=%s"], { cwd: root, encoding: "utf8" });
if (g.status === 0) subject = g.stdout.trim();
const named = /\[(T\d{2})\]/.exec(subject)?.[1];

const implemented = specs.filter((s) => fs.existsSync(path.join(root, "src", `${moduleOf(s)}.mjs`)));
let run = implemented;
if (named) {
  const spec = specs.find((s) => taskOf(s) === named);
  if (!spec) { console.error(`unknown task ${named} in commit subject`); process.exit(2); }
  if (!implemented.includes(spec)) { console.error(`task ${named}: src/${moduleOf(spec)}.mjs does not exist`); process.exit(1); }
  run = [...new Set([spec, ...implemented])];
} else if (!implemented.length) {
  console.error("no task module implemented under src/"); process.exit(1);
}
const extra = fs.existsSync(path.join(root, "test")) ? fs.readdirSync(path.join(root, "test")).filter((f) => f.endsWith(".test.mjs")).map((f) => path.join("test", f)) : [];
const files = [...run.map((s) => path.join("spec", s)), ...extra];
console.log(`task: ${named ?? "(none in subject)"}; running ${files.join(", ")}`);
const r = spawnSync(process.execPath, ["--test", "--test-reporter=spec", ...files], { cwd: root, stdio: "inherit" });
process.exit(r.status ?? 1);
