import run from "aocrunner";
import { readFileSync } from "fs";
const findBadNumber = (numbers: number[], preambleLength: number) => {
  let preamble: number[] = [];
  let badNumber: number | undefined;

  numbers.some((num) => {
    if (preamble.length === preambleLength) {
      const addends = findTwoNumbersThatSumUpTo(preamble, num);
      if (addends === undefined) {
        badNumber = num;
        return true;
      }
    }

    preamble.push(num);
    if (preamble.length > preambleLength) {
      preamble.shift();
    }
  });

  return badNumber;
};

const findTwoNumbersThatSumUpTo = (numbers: number[], toFind: number) => {
  const addend = numbers.find((num, index) => {
    const addentIndex = numbers.indexOf(toFind - num, index + 1);
    return addentIndex > -1;
  });

  return addend ? [addend, toFind - addend] : undefined;
};

const findContiguousAddendsThatSumUpTo = (numbers: number[], toFind: number) => {
  let remainders: number[] = [];
  const addRemainder = (remainder: number) => {
    remainders.push(remainder);
  };

  numbers.some((_, index) => {
    remainders = [];

    const lastRemainder = findRemaindersTillZero(numbers.slice(index), toFind, addRemainder);
    if (lastRemainder === 0) {
      return true;
    }
  });

  return reduceRemaindersToAddents(remainders);
};

const findRemaindersTillZero = (
  input: number[],
  num: number,
  callback?: (remainder: number) => void,
): number => {
  const remainder = num - input[0];
  if (remainder > 0 && input.length > 1) {
    callback?.(num);
    return findRemaindersTillZero(input.slice(1), remainder, callback);
  }
  callback?.(num);

  return remainder;
};

const reduceRemaindersToAddents = (remainders: number[]) => {
  return remainders.map((remainder, index, arr) => {
    const isLastRemainder = index === arr.length - 1;
    if (!isLastRemainder) {
      return remainder - arr[index + 1];
    }
    return remainder;
  });
};

const maxMinSum = (numbers: number[]) => {
  return Math.max(...numbers) + Math.min(...numbers);
};

const parseInput = (rawInput: string) => rawInput.split("\n").map((str) => parseInt(str, 10));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return findBadNumber(input, 25);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return maxMinSum(findContiguousAddendsThatSumUpTo(input, 393911906));
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day09/input.txt", "utf8"), expected: 393911906 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day09/input.txt", "utf8"), expected: 59341885 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
