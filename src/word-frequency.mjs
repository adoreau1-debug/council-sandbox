// Count word occurrences case-insensitively. A word is a run of letters,
// optionally joined by inner apostrophes (e.g. "don't"); digits and
// punctuation are ignored. Sorted by count desc, then word asc.
export function wordFrequency(text, limit) {
  const words = String(text ?? "").toLowerCase().match(/\p{L}+(?:['’]\p{L}+)*/gu) ?? [];
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  const result = [...counts].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return limit === undefined ? result : result.slice(0, Math.max(0, limit));
}
