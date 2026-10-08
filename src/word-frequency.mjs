// Count word occurrences case-insensitively. A word is a run of letters, optionally joined by
// inner apostrophes (e.g. "don't"); digits and punctuation are ignored.
// Returns [[word, count], ...] sorted by count desc, then word asc; `limit` keeps the top n.
const WORD = /\p{L}+(?:['’]\p{L}+)*/gu;

export function wordFrequency(text, limit) {
  const counts = new Map();
  for (const [match] of String(text ?? "").toLowerCase().matchAll(WORD)) {
    const word = match.replace(/’/g, "'");
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  const sorted = [...counts].sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  return limit === undefined || limit === null ? sorted : sorted.slice(0, Math.max(0, limit));
}
