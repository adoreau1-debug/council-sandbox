const PATTERN = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
const FACTORS = [86400, 3600, 60, 1];

/**
 * Parse a duration like "45s", "2m", "1h30m" or "1d2h3m4s" into seconds.
 * Units d, h, m, s may each appear at most once, in descending order.
 * @param {string} text
 * @returns {number}
 */
export function parseDuration(text) {
  if (typeof text !== "string") throw new TypeError("duration must be a string");
  const match = PATTERN.exec(text);
  if (!match || match.slice(1).every((g) => g === undefined)) {
    throw new TypeError(`invalid duration: ${JSON.stringify(text)}`);
  }
  return match.slice(1).reduce((total, g, i) => total + (g === undefined ? 0 : Number(g) * FACTORS[i]), 0);
}
