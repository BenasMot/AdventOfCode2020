export const countTrees = (map: string, step: number, fall: number) => {
  const rowLength = 31;
  let count = 0;

  let d = 0,
    xPos = 1;
  for (let i = 1; i < map.length - step; i += (rowLength + 1)*fall) {
    xPos = (i - d) % rowLength;
    if (xPos + step > rowLength || xPos === 0) {
      i -= rowLength;
    }
    if (i !== 1) {
      i += step;
    }
    if (map[i - 1] === '#') count++;
    d += fall;
  }
  return count;
};
