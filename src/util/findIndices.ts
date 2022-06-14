export const findIndices = <T>(values: T[], predicate: (value: T) => boolean): Set<number> => {
  const indices = new Set<number>();

  for (let i = 0; i < values.length; i++) {
    if (predicate(values[i])) indices.add(i);
  }

  return indices;
};
