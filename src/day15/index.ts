import run from "aocrunner";
import { range } from "../utils/range.js";

const parseInput = (rawInput: string) => rawInput.split(",").map((str) => parseInt(str, 10));

const solve = (input: number[], toNumber: number): number => {
  const mentionedNumbers = new Map<number, number[]>(input.map((num, index) => [num, [index + 1]]));
  let lastNumberSpoken = input[input.length - 1];

  for (let i = input.length; i < toNumber; i++) {
    const lastSpokenHistory = mentionedNumbers.get(lastNumberSpoken)!;
    const historyLength = lastSpokenHistory.length;
    const age = lastSpokenHistory[historyLength - 1] - lastSpokenHistory[historyLength - 2];

    if (isNaN(age)) {
      lastNumberSpoken = 0;
    } else {
      lastNumberSpoken = age;
    }

    const newMentionedHistory = mentionedNumbers.get(lastNumberSpoken) || [];
    const lastInNewHistory = newMentionedHistory[newMentionedHistory.length - 1];
    mentionedNumbers.set(lastNumberSpoken, [lastInNewHistory, i + 1]);
  }

  return lastNumberSpoken;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return solve(input, 2020);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return solve(input, 30000000);
};

run({
  part1: {
    tests: [
      { input: "0,3,6", expected: 436 },
      { input: "1,3,2", expected: 1 },
      { input: "2,1,3", expected: 10 },
      { input: "1,2,3", expected: 27 },
      { input: "2,3,1", expected: 78 },
      { input: "3,2,1", expected: 438 },
      { input: "3,1,2", expected: 1836 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: "0,3,6", expected: 175594 },
      // { input: "1,3,2", expected: 2578 },
      // { input: "2,1,3", expected: 3544142 },
      // { input: "1,2,3", expected: 261214 },
      // { input: "2,3,1", expected: 6895259 },
      // { input: "3,2,1", expected: 18 },
      // { input: "3,1,2", expected: 362 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
