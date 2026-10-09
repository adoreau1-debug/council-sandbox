// SemVer 2.0.0 precedence comparison.
const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

const NUMERIC_RE = /^\d+$/;

function parse(version) {
  // Report only the type: stringifying the value could invoke user-defined toString/valueOf.
  if (typeof version !== "string") {
    throw new TypeError(`Invalid version: expected a string, got ${version === null ? "null" : typeof version}`);
  }
  const m = SEMVER_RE.exec(version);
  if (!m) throw new TypeError(`Invalid version: ${version}`);
  return {
    core: [BigInt(m[1]), BigInt(m[2]), BigInt(m[3])],
    pre: m[4] === undefined ? [] : m[4].split("."),
  };
}

function cmp(x, y) {
  return x < y ? -1 : x > y ? 1 : 0;
}

function compareIdentifier(a, b) {
  const aNum = NUMERIC_RE.test(a);
  const bNum = NUMERIC_RE.test(b);
  if (aNum && bNum) return cmp(BigInt(a), BigInt(b));
  if (aNum) return -1;
  if (bNum) return 1;
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
    const c = compareIdentifier(va.pre[i], vb.pre[i]);
    if (c !== 0) return c;
  }
  return cmp(va.pre.length, vb.pre.length);
}
