import { test } from "node:test";
import assert from "node:assert/strict";
import { wordFrequency } from "../src/word-frequency.mjs";

test("counts case-insensitively, sorted by count desc then word asc", () => {
  assert.deepEqual(wordFrequency("the cat and The hat. And THE bat"), [["the", 3], ["and", 2], ["bat", 1], ["cat", 1], ["hat", 1]]);
});
test("keeps apostrophes inside words, ignores digits and punctuation", () => {
  assert.deepEqual(wordFrequency("don't stop, don't! 42 times"), [["don't", 2], ["stop", 1], ["times", 1]]);
});
test("limit returns the top n", () => {
  assert.deepEqual(wordFrequency("a a a b b c", 2), [["a", 3], ["b", 2]]);
});
test("empty text gives an empty list", () => { assert.deepEqual(wordFrequency(""), []); });
