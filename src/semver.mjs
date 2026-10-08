// SemVer 2.0.0 precedence comparison (https://semver.org/#spec-item-11).

const NUM = "0|[1-9]\\d*";
const ALNUM = "\\d*[a-zA-Z-][0-9a-zA-Z-]*";
const PRE_ID = `(?:${NUM}|${ALNUM})`;
const SEMVER_RE = new RegExp(
  `^(${NUM})\\.(${NUM})\\.(${NUM})` +
    `(?:-(${PRE_ID}(?:\\.${PRE_ID})*))?` +
    `(?:\\+[0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*)?$`,
);

function parse(version) {
  if (typeof version !== "string") throw new TypeError(`Invalid version: ${String(version)}`);
  const m = SEMVER_RE.exec(version);
  if (!m) throw new TypeError(`Invalid version: ${version}`);
  return {
    core: [m[1], m[2], m[3]].map(BigInt),
    pre: m[4] === undefined ? [] : m[4].split("."),
  };
}

const sign = (x, y) => (x < y ? -1 : x > y ? 1 : 0);

function compareIdentifiers(a, b) {
  const aNum = /^\d+$/.test(a);
  const bNum = /^\d+$/.test(b);
  if (aNum && bNum) return sign(BigInt(a), BigInt(b));
  if (aNum) return -1;
  if (bNum) return 1;
  return sign(a, b);
}

export function compareSemver(a, b) {
  const va = parse(a);
  const vb = parse(b);
  for (let i = 0; i < 3; i++) {
    const c = sign(va.core[i], vb.core[i]);
    if (c) return c;
  }
  if (!va.pre.length || !vb.pre.length) return sign(vb.pre.length, va.pre.length);
  const n = Math.min(va.pre.length, vb.pre.length);
  for (let i = 0; i < n; i++) {
    const c = compareIdentifiers(va.pre[i], vb.pre[i]);
    if (c) return c;
  }
  return sign(va.pre.length, vb.pre.length);
}
