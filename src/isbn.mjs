// ISBN-10 / ISBN-13 checksum validation. Hyphens are ignored; never throws.

const strip = (s) => (typeof s === "string" ? s.replace(/-/g, "") : "");

export function isValidIsbn10(s) {
  const d = strip(s);
  if (!/^\d{9}[\dX]$/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const v = d[i] === "X" ? 10 : Number(d[i]);
    sum += v * (10 - i);
  }
  return sum % 11 === 0;
}

export function isValidIsbn13(s) {
  const d = strip(s);
  if (!/^\d{13}$/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += Number(d[i]) * (i % 2 === 0 ? 1 : 3);
  return sum % 10 === 0;
}
