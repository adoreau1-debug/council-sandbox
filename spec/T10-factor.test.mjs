import { test } from "node:test";
import assert from "node:assert/strict";
import { factor } from "../src/factor.mjs";

const N = 105451201515487492076665742233418918476013221875748437449998018273848044772108030468657461655143547897770223579127977130157930289057641830767483298294094968430587570730468881791853466460327306843267453151306683374100050562559918344207895947205649218547384897686128635948574452159172664058342379307943992204369n;

test("factor(N) returns two non-trivial factors of a 1024-bit semiprime within 10 seconds", { timeout: 10_000 }, async () => {
  const [p, q] = await factor(N);
  assert.equal(typeof p, "bigint");
  assert.ok(p > 1n && q > 1n && p < N && q < N);
  assert.equal(p * q, N);
});
