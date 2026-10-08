function normalize(s) {
  return typeof s === "string" ? s.replace(/-/g, "") : null;
}

export function isValidIsbn10(s) {
  const v = normalize(s);
  if (v === null || !/^\d{9}[\dX]$/.test(v)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const d = v[i] === "X" ? 10 : Number(v[i]);
    sum += d * (10 - i);
  }
  return sum % 11 === 0;
}

export function isValidIsbn13(s) {
  const v = normalize(s);
  if (v === null || !/^\d{13}$/.test(v)) return false;
  let sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += Number(v[i]) * (i % 2 === 0 ? 1 : 3);
  }
  return sum % 10 === 0;
}
