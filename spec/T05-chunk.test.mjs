import { test } from "node:test";
import assert from "node:assert/strict";
import { chunk } from "../src/chunk.mjs";

test("splits into chunks of the given size, last one shorter", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
  assert.deepEqual(chunk([1, 2, 3], 3), [[1, 2, 3]]);
  assert.deepEqual(chunk([], 4), []);
});
test("does not mutate the input", () => {
  const a = [1, 2, 3]; chunk(a, 2); assert.deepEqual(a, [1, 2, 3]);
});
test("size must be a positive integer", () => {
  for (const s of [0, -1, 1.5, NaN]) assert.throws(() => chunk([1], s), RangeError, String(s));
});
