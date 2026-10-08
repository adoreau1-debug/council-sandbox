// Parse compact durations like "45s", "1h30m" or "1d2h3m4s" into seconds.
// Units d, h, m, s may each appear at most once, in descending order.
const PATTERN = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
const FACTORS = [86400, 3600, 60, 1];

export function parseDuration(text) {
  // Report only the type: never call toString/valueOf/Symbol.toPrimitive on caller-supplied values.
  if (typeof text !== "string") throw new TypeError(`invalid duration: expected a string, got ${text === null ? "null" : typeof text}`);
  const match = PATTERN.exec(text);
  if (!text || !match) throw new TypeError(`invalid duration: ${JSON.stringify(text)}`);
  return FACTORS.reduce((total, factor, i) => total + (match[i + 1] ? Number(match[i + 1]) * factor : 0), 0);
}
