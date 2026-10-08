import { test } from "node:test";
import assert from "node:assert/strict";
import { isValidIsbn10, isValidIsbn13 } from "../src/isbn.mjs";

test("ISBN-10 checksum including X and hyphens", () => {
  assert.equal(isValidIsbn10("0-306-40615-2"), true);
  assert.equal(isValidIsbn10("080442957X"), true);
  assert.equal(isValidIsbn10("0306406153"), false);
  assert.equal(isValidIsbn10("X306406152"), false);
  assert.equal(isValidIsbn10("030640615"), false);
});
test("ISBN-13 checksum", () => {
  assert.equal(isValidIsbn13("978-0-306-40615-7"), true);
  assert.equal(isValidIsbn13("9780306406158"), false);
  assert.equal(isValidIsbn13("97803064061"), false);
});
