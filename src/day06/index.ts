import run from "aocrunner";
import { readFileSync } from "fs";

const parseInput = (rawInput: string) => rawInput;

const getGroups = (input: string) => {
  return input.split("\n\n");
};

const getPeople = (input: string) => {
  return input.split("\n");
};

const countYes = (group: string) => {
  const alreadyAnswered: Set<String> = new Set<String>();

  let count = 0;
  for (let i = 0; i < group.length; i++) {
    const char = group[i];
    if (!alreadyAnswered.has(char) && char !== "\n") {
      alreadyAnswered.add(char);
      count++;
    }
  }
  return count;
};

const getNumberOfAnswers1 = (input: string) => {
  const groups = getGroups(input);
  return groups.reduce((accumulator, current) => {
    return accumulator + countYes(current);
  }, 0);
};

const getSetIntersection = <T>(set1: Set<T>, set2: Set<T>) => {
  return new Set([...set1].filter((el) => set2.has(el)));
};

const countAllYes = (group: string) => {
  const people = getPeople(group);

  const answeredQuestions: Set<String>[] = [];
  people.forEach((person) => {
    if (person) {
      answeredQuestions.push(new Set(person.split("")));
    }
  });

  const sharedQuestions = answeredQuestions.reduce((a, b) => {
    return getSetIntersection(a, b);
  });

  return sharedQuestions.size;
};

const getNumberOfAnswers2 = (input: string) => {
  const groups = getGroups(input);
  return groups.reduce((accumulator, current) => {
    return accumulator + countAllYes(current);
  }, 0);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getNumberOfAnswers1(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return getNumberOfAnswers2(input);
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day06/input.txt", "utf8"), expected: 6443 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day06/input.txt", "utf8"), expected: 3232 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
