export function shallow(objA: any, objB: any): boolean {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const seen = new WeakMap<object, Set<object>>();

  function deepCompare(a: any, b: any): boolean {
    if (Object.is(a, b)) return true;

    if (
      typeof a !== "object" ||
      a === null ||
      typeof b !== "object" ||
      b === null
    ) {
      return false;
    }

    if (seen.has(a) && seen.get(a)?.has(b)) return true;

    if (!seen.has(a)) seen.set(a, new Set());
    seen.get(a)!.add(b);

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepCompare(a[key], b[key])) return false;
    }

    return true;
  }

  return deepCompare(objA, objB);
}
