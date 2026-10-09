const NUMERALS = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const CANONICAL = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    throw new RangeError(`toRoman expects an integer in 1..3999, got ${n}`);
  }
  let out = "";
  for (const [value, symbol] of NUMERALS) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
}

export function fromRoman(s) {
  if (typeof s !== "string" || s === "" || !CANONICAL.test(s)) {
    throw new TypeError(`fromRoman expects a canonical roman numeral, got ${String(s)}`);
  }
  let n = 0;
  let i = 0;
  for (const [value, symbol] of NUMERALS) {
    while (s.startsWith(symbol, i)) {
      n += value;
      i += symbol.length;
    }
  }
  return n;
}
