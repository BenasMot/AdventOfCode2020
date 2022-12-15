import run from "aocrunner";
import { readFileSync } from "fs";

const parseInput = (rawInput: string) => rawInput;

const countTrees = (map: string, step: number, fall: number) => {
  const rowLength = 31;
  let count = 0;

  let d = 0,
    xPos = 1;
  for (let i = 1; i < map.length - step; i += (rowLength + 1) * fall) {
    xPos = (i - d) % rowLength;
    if (xPos + step > rowLength || xPos === 0) {
      i -= rowLength;
    }
    if (i !== 1) {
      i += step;
    }
    if (map[i - 1] === "#") count++;
    d += fall;
  }
  return count;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return countTrees(input, 3, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const result = [
    countTrees(input, 1, 1),
    countTrees(input, 3, 1),
    countTrees(input, 5, 1),
    countTrees(input, 7, 1),
    countTrees(input, 1, 2),
  ].reduce((a, b) => a * b);
  return result;
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day03/input.txt", "utf8"), expected: 189 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day03/input.txt", "utf8"), expected: 1718180100 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
