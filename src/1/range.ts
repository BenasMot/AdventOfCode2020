export const range = (from: number, to: number) => {
  const numbers = [...Array(to + 1).keys()];
  numbers.splice(0, from);
  return numbers;
};
