import { test } from "node:test";
import assert from "node:assert/strict";
import { slugify } from "../src/slugify.mjs";

test("lowercases and joins words with single hyphens", () => {
  assert.equal(slugify("Hello World"), "hello-world");
  assert.equal(slugify("  Multiple   spaces  here "), "multiple-spaces-here");
});
test("drops punctuation and collapses separators", () => {
  assert.equal(slugify("Rock & Roll!!"), "rock-roll");
  assert.equal(slugify("a--b__c..d"), "a-b-c-d");
});
test("folds accents to ASCII", () => {
  assert.equal(slugify("Crème Brûlée à Paris"), "creme-brulee-a-paris");
});
test("empty or symbol-only input gives an empty string", () => {
  assert.equal(slugify(""), "");
  assert.equal(slugify("!!!"), "");
});
