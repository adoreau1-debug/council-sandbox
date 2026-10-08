# council-sandbox

Sandbox repository for the AI Council phase-1 acceptance (WP8). Nothing here is product code; it exists so the
runner, the Builder (Claude Code), the test judge and the Reviewer (Codex) can be exercised end to end.

## Layout

| path | what |
| --- | --- |
| `spec/Tnn-<module>.test.mjs` | canonical tests of task Tnn (Node's built-in test runner, no dependencies) |
| `src/<module>.mjs` | what a task implements (empty at baseline) |
| `test/` | optional extra tests a Builder may add (they must pass too) |
| `scripts/check.mjs` | the judge entry point: runs the spec of the task named in the commit subject (`[Tnn]`) |
| `council.yaml` | the runner's test-judge declaration; pins the SHA-256 of the specs and the checker |

## Rules for agents working here

- Implement the task's module under `src/`; do not edit `spec/`, `scripts/`, or `council.yaml` (the judge uses the
  baseline's `council.yaml`, whose hash pins make edited specs fail).
- No dependencies, no network access in code or tests. Node ≥ 22.
- `npm test` runs the same check the judge runs.

## Tasks

T01 slugify · T02 parseDuration · T03 roman numerals · T04 wordFrequency · T05 chunk · T06 ISBN validation ·
T07 SemVer comparison · T08 CSV line parser · T09 answer · T10 factor. Task texts are submitted by the operator; each task works on
its own branch `council/tNN-*` created from `sandbox-base`. `main` is protected; nothing is merged automatically.
