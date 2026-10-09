/**
 * Parse a single RFC 4180 CSV line into its fields.
 * Empty fields are kept; quoted fields may contain commas and doubled quotes.
 * @param {string} line
 * @returns {string[]}
 * @throws {SyntaxError} on an unterminated or malformed quoted field
 */
export function parseCsvLine(line) {
  const fields = [];
  let i = 0;
  const n = line.length;
  while (true) {
    let field = "";
    if (line[i] === '"') {
      i++;
      let closed = false;
      while (i < n) {
        const ch = line[i];
        if (ch === '"') {
          if (line[i + 1] === '"') {
            field += '"';
            i += 2;
          } else {
            i++;
            closed = true;
            break;
          }
        } else {
          field += ch;
          i++;
        }
      }
      if (!closed) throw new SyntaxError("Unterminated quoted field");
      if (i < n && line[i] !== ",") {
        throw new SyntaxError(`Unexpected character after quoted field at position ${i}`);
      }
    } else {
      while (i < n && line[i] !== ",") field += line[i++];
    }
    fields.push(field);
    if (i >= n) break;
    i++; // skip comma
  }
  return fields;
}
