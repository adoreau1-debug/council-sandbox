import { test } from "node:test";
import assert from "node:assert/strict";
import { compareSemver } from "../src/semver.mjs";

test("orders by major, minor, patch numerically", () => {
  assert.equal(compareSemver("1.2.3", "1.2.3"), 0);
  assert.equal(compareSemver("1.10.0", "1.9.9"), 1);
  assert.equal(compareSemver("2.0.0", "10.0.0"), -1);
});
test("a pre-release sorts before its release; identifiers compare per SemVer 2.0.0", () => {
  assert.equal(compareSemver("1.0.0-alpha", "1.0.0"), -1);
  const ordered = ["1.0.0-alpha", "1.0.0-alpha.1", "1.0.0-alpha.beta", "1.0.0-beta", "1.0.0-beta.2", "1.0.0-beta.11", "1.0.0-rc.1", "1.0.0"];
  for (let i = 0; i + 1 < ordered.length; i++) assert.equal(compareSemver(ordered[i], ordered[i + 1]), -1, `${ordered[i]} < ${ordered[i + 1]}`);
});
test("build metadata is ignored; invalid versions throw", () => {
  assert.equal(compareSemver("1.0.0+build.1", "1.0.0+build.2"), 0);
  for (const bad of ["1.0", "01.0.0", "1.0.0-", "v1.0.0"]) assert.throws(() => compareSemver(bad, "1.0.0"), TypeError, bad);
});
