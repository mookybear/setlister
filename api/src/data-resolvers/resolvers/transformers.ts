export function toSet<T>(arr: T[]): Set<T> {
  const set = new Set<T>();
  arr.forEach(b => set.add(b));
  return set;
}
