import run from "aocrunner";
import { readFileSync } from "fs";

const parseInput = (rawInput: string) => rawInput.split("\n").map((str) => parseInt(str, 10));

const addsTo = (numbers: number[], checkedValue: number) => {
  const sum = numbers.reduce((a, b) => a + b);
  return sum === checkedValue;
};

const findTwoThatSumUpTo = (numbers: number[], checkedValue: number) => {
  for (const first of numbers) {
    for (const second of numbers) {
      if (addsTo([first, second], checkedValue)) {
        return { first, second };
      }
    }
  }
  return { first: 0, second: 0 };
};

const findThreeThatSumUpTo = (numbers: number[], checkedValue: number) => {
  for (const first of numbers) {
    for (const second of numbers) {
      for (const third of numbers) {
        if (addsTo([first, second, third], checkedValue)) {
          return { first, second, third };
        }
      }
    }
  }
  return { first: 0, second: 0, third: 0 };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { first, second } = findTwoThatSumUpTo(input, 2020);
  return first * second;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const { first, second, third } = findThreeThatSumUpTo(input, 2020);
  return first * second * third;
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day01/input.txt", "utf8"), expected: 542619 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day01/input.txt", "utf8"), expected: 32858450 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
