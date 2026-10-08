// SemVer 2.0.0 precedence comparison (https://semver.org/#spec-item-11).

const NUM = "0|[1-9]\\d*";
const ALNUM = "\\d*[a-zA-Z-][0-9a-zA-Z-]*";
const PRE_ID = `(?:${NUM}|${ALNUM})`;
const SEMVER_RE = new RegExp(
  `^(${NUM})\\.(${NUM})\\.(${NUM})` +
    `(?:-(${PRE_ID}(?:\\.${PRE_ID})*))?` +
    `(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$`,
);

function parse(version) {
  if (typeof version !== "string") throw new TypeError(`Invalid version: ${String(version)}`);
  const m = SEMVER_RE.exec(version);
  if (!m) throw new TypeError(`Invalid version: ${version}`);
  return {
    core: [BigInt(m[1]), BigInt(m[2]), BigInt(m[3])],
    pre: m[4] === undefined ? [] : m[4].split("."),
  };
}

const cmp = (x, y) => (x < y ? -1 : x > y ? 1 : 0);
const isNumeric = (id) => /^\d+$/.test(id);

function compareIdentifiers(a, b) {
  const an = isNumeric(a);
  const bn = isNumeric(b);
  if (an && bn) return cmp(BigInt(a), BigInt(b));
  if (an) return -1;
  if (bn) return 1;
  return cmp(a, b);
}

export function compareSemver(a, b) {
  const va = parse(a);
  const vb = parse(b);
  for (let i = 0; i < 3; i++) {
    const c = cmp(va.core[i], vb.core[i]);
    if (c !== 0) return c;
  }
  if (va.pre.length === 0 || vb.pre.length === 0) {
    return cmp(vb.pre.length === 0 ? 0 : 1, va.pre.length === 0 ? 0 : 1);
  }
  const n = Math.min(va.pre.length, vb.pre.length);
  for (let i = 0; i < n; i++) {
    const c = compareIdentifiers(va.pre[i], vb.pre[i]);
    if (c !== 0) return c;
  }
  return cmp(va.pre.length, vb.pre.length);
}
