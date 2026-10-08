/**
 * Split an array into consecutive slices of length `size` (the last may be shorter).
 * The input array is not mutated.
 * @param {Array} array
 * @param {number} size positive integer
 * @returns {Array[]}
 */
export function chunk(array, size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError(`size must be a positive integer, got ${size}`);
  }
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}
