import run from "aocrunner";
import { readFileSync } from "fs";

interface passwordMappingItem {
  range: string;
  char: string;
  password: string;
}

type Validator = (rules: number[], password: string, char: string) => boolean;

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map<passwordMappingItem>((row) => {
    const [range, char, password] = row.split(" ");
    return { range, char: char[0], password };
  });

const parseIndexList = (input: string[]) => {
  return input.map((val: string) => parseInt(val));
};

const countValidPasswords = (items: passwordMappingItem[], validator: Validator) => {
  return items.reduce((prev, curr) => {
    const rules = parseIndexList(curr.range.split("-"));
    const isValid = validator(rules, curr.password, curr.char);

    return prev + (isValid ? 1 : 0);
  }, 0);
};

const validator1 = (rules: number[], password: string, char: string) => {
  const passWithRemovedChar = password.split(char).join("");
  const charCount = password.length - passWithRemovedChar.length;
  return charCount >= rules[0] && charCount <= rules[1];
};

const validator2 = (rules: number[], password: string, char: string) => {
  return (password[rules[0] - 1] === char) != (password[rules[1] - 1] === char);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return countValidPasswords(input, validator1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return countValidPasswords(input, validator2);
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day02/input.txt", "utf8"), expected: 477 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day02/input.txt", "utf8"), expected: 686 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
