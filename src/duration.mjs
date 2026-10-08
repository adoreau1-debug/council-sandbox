const PATTERN = /^(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
const FACTORS = [86400, 3600, 60, 1];

export function parseDuration(text) {
  if (typeof text !== "string") {
    const kind = text === null ? "null" : typeof text;
    throw new TypeError(`Invalid duration: expected a string, got ${kind}`);
  }
  if (text === "") {
    throw new TypeError("Invalid duration: empty string");
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
