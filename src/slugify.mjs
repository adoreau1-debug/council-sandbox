/**
 * Convert text to a URL slug: lowercase ASCII words joined by single hyphens.
 * Accents are folded (é -> e); punctuation and other non-alphanumerics are dropped.
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
