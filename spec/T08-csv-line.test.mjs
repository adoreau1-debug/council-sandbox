import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsvLine } from "../src/csv-line.mjs";

test("splits plain fields, keeps empty fields", () => {
  assert.deepEqual(parseCsvLine("a,b,c"), ["a", "b", "c"]);
  assert.deepEqual(parseCsvLine("a,,c,"), ["a", "", "c", ""]);
});
test("handles quoted fields with commas and doubled quotes", () => {
  assert.deepEqual(parseCsvLine('"x,y",z'), ["x,y", "z"]);
  assert.deepEqual(parseCsvLine('"she said ""hi""",2'), ['she said "hi"', "2"]);
});
test("unterminated quote is an error", () => { assert.throws(() => parseCsvLine('"abc,d'), SyntaxError); });
