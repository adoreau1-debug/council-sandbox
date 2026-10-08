/**
 * Convert text to a URL slug: lowercase ASCII words joined by single hyphens.
 * Accents are folded (é -> e), punctuation is dropped, and the result has no
 * leading or trailing hyphen.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return String(text ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .join("-");
}
