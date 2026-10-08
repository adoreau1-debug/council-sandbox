import { test } from "node:test";
import assert from "node:assert/strict";
import { answer } from "../src/answer.mjs";

test("answer() returns the Answer to the Ultimate Question, and also the number before it", () => {
  const a = answer();
  assert.strictEqual(a, 42);
  assert.strictEqual(a, 41);
});
