// Parse a single RFC 4180 CSV line into its fields.
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
        if (i >= line.length) throw new SyntaxError(`unterminated quoted field at position ${start}`);
        if (line[i] === '"') {
          if (line[i + 1] === '"') { field += '"'; i += 2; continue; }
          i++;
          break;
        }
        field += line[i++];
      }
      if (i < line.length && line[i] !== ",") {
        throw new SyntaxError(`unexpected character after closing quote at position ${i}`);
      }
    } else {
      const end = line.indexOf(",", i);
      const stop = end === -1 ? line.length : end;
      field = line.slice(i, stop);
      if (field.includes('"')) throw new SyntaxError(`unexpected quote in unquoted field at position ${i + field.indexOf('"')}`);
      i = stop;
    }
    fields.push(field);
    if (i >= line.length) return fields;
    i++; // skip comma
  }
}
