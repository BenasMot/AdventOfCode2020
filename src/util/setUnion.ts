export const setUnion = <T>(s1: Set<T>, s2: Set<T>) => {
  return new Set([...s1, ...s2]);
};