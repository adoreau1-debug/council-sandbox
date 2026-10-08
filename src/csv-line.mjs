// Parse a single RFC 4180 CSV line into its fields.
// Empty fields are kept; quoted fields may contain commas and doubled quotes ("").
// Throws SyntaxError on an unterminated quote or a malformed quoted field.
export function parseCsvLine(line) {
  if (typeof line !== "string") throw new TypeError("parseCsvLine expects a string");
  const fields = [];
  let i = 0;
  for (;;) {
    let field = "";
    if (line[i] === '"') {
      const start = i;
      i++;
      for (;;) {
        if (i >= line.length) throw new SyntaxError(`unterminated quote starting at index ${start}`);
        if (line[i] === '"') {
          if (line[i + 1] === '"') { field += '"'; i += 2; continue; }
          i++;
          break;
        }
        field += line[i++];
      }
      if (i < line.length && line[i] !== ",") {
        throw new SyntaxError(`unexpected character after closing quote at index ${i}`);
      }
    } else {
      while (i < line.length && line[i] !== ",") {
        if (line[i] === '"') throw new SyntaxError(`unexpected quote in unquoted field at index ${i}`);
        field += line[i++];
      }
    }
    fields.push(field);
    if (i >= line.length) return fields;
    i++; // skip comma
  }
}
