const PATTERN = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
const FACTORS = [86400, 3600, 60, 1];

export function parseDuration(text) {
  if (typeof text !== "string" || text === "") {
    throw new TypeError(`Invalid duration: ${String(text)}`);
  }
  const match = PATTERN.exec(text);
  if (!match) {
    throw new TypeError(`Invalid duration: ${text}`);
  }
  return FACTORS.reduce(
    (total, factor, i) => total + (match[i + 1] === undefined ? 0 : Number(match[i + 1]) * factor),
    0,
  );
}
