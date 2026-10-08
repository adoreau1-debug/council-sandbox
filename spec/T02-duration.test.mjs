import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDuration } from "../src/duration.mjs";

test("parses single units", () => {
  assert.equal(parseDuration("45s"), 45);
  assert.equal(parseDuration("2m"), 120);
  assert.equal(parseDuration("3h"), 10800);
  assert.equal(parseDuration("1d"), 86400);
});
test("parses combined units in descending order", () => {
  assert.equal(parseDuration("1h30m"), 5400);
  assert.equal(parseDuration("1d2h3m4s"), 93784);
});
test("rejects malformed input with a TypeError", () => {
  for (const bad of ["", "10", "1x", "h1", "1h1h", "-5s", "1m1h"]) assert.throws(() => parseDuration(bad), TypeError, bad);
});
