const PATTERN = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
const FACTORS = [86400, 3600, 60, 1];

/**
 * Parse a duration like "45s", "2m", "1h30m" or "1d2h3m4s" into seconds.
 * Units d, h, m, s may each appear at most once, in descending order.
 * @param {string} text
 * @returns {number} seconds
 * @throws {TypeError} on any other input
 */
export function parseDuration(text) {
  if (typeof text !== "string" || text === "") throw new TypeError(`invalid duration: ${String(text)}`);
  const match = PATTERN.exec(text);
  if (!match) throw new TypeError(`invalid duration: ${text}`);
  return FACTORS.reduce((total, factor, i) => total + (match[i + 1] ? Number(match[i + 1]) * factor : 0), 0);
}
