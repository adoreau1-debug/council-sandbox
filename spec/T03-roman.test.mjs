import { test } from "node:test";
import assert from "node:assert/strict";
import { toRoman, fromRoman } from "../src/roman.mjs";

test("converts integers to roman numerals", () => {
  assert.equal(toRoman(1), "I");
  assert.equal(toRoman(4), "IV");
  assert.equal(toRoman(9), "IX");
  assert.equal(toRoman(1994), "MCMXCIV");
  assert.equal(toRoman(3999), "MMMCMXCIX");
});
test("round-trips 1..3999", () => {
  for (let n = 1; n <= 3999; n++) assert.equal(fromRoman(toRoman(n)), n);
});
test("rejects out-of-range and invalid input", () => {
  assert.throws(() => toRoman(0), RangeError);
  assert.throws(() => toRoman(4000), RangeError);
  assert.throws(() => toRoman(1.5), RangeError);
  assert.throws(() => fromRoman("IIII"), TypeError);
  assert.throws(() => fromRoman("ABC"), TypeError);
});
