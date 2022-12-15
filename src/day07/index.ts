import run from "aocrunner";
import { readFileSync } from "fs";
import { setUnion } from "../utils/setUnion.js";

interface Container {
  color: string;
  ammount?: number;
}

type Rules = Map<string, Container[]>;
type InvertedRules = Map<string, Container[]>;

interface RuleSet {
  rules: Rules;
  invertedRules: InvertedRules;
}

const extractContents = (words: string[]) => {
  const contentsCount = Math.floor((words.length - 4) / 4);
  const contents: Container[] = [];
  for (let i = 0; i < contentsCount; i++) {
    const index = (i + 1) * 4;
    contents.push({
      ammount: parseInt(words[index], 10),
      color: `${words[index + 1]} ${words[index + 2]}`,
    });
  }
  return contents;
};

const extractRule = (words: string[]) => {
  const bag = `${words[0]} ${words[1]}`;
  const contents: Container[] = extractContents(words);
  return {
    bag,
    contents,
  };
};

const parseInput = (input: string): RuleSet => {
  const containerMap: Rules = new Map();
  const invertedContainersMap: InvertedRules = new Map();

  const descriptions = input.split("\n");
  descriptions.forEach((description) => {
    const words = description.split(" ");

    const rule = extractRule(words);
    containerMap.set(rule.bag, rule.contents);

    rule.contents.forEach((container: Container) => {
      const canBeContainedBy = invertedContainersMap.get(container.color) || [];
      invertedContainersMap.set(container.color, [...canBeContainedBy, { color: rule.bag }]);
    });
  });

  return {
    rules: containerMap,
    invertedRules: invertedContainersMap,
  };
};

const colorSetToStringSet = (set: Set<Container>): Set<string> => {
  return new Set([...set].map((val) => val.color));
};

const findValidContainers = (color: string, rules: InvertedRules): Set<Container> => {
  let results: Set<Container> = new Set();

  rules.get(color)?.forEach((container) => {
    results.add(container);
    const possibleParentContainers = findValidContainers(container.color, rules);
    results = setUnion(results, possibleParentContainers);
  });

  return results;
};

const recursivelyCountContainers = (color: string, rules: Rules): number => {
  let count = 1;

  rules.get(color)?.forEach((container) => {
    count += (container.ammount || 0) * recursivelyCountContainers(container.color, rules);
  });

  return count;
};

const part1 = (rawInput: string) => {
  const rules = parseInput(rawInput).invertedRules;
  const validContainers = colorSetToStringSet(findValidContainers("shiny gold", rules));
  return validContainers.size;
};

const part2 = (rawInput: string) => {
  const rules = parseInput(rawInput).rules;
  return recursivelyCountContainers("shiny gold", rules) - 1;
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day07/input.txt", "utf8"), expected: 287 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day07/input.txt", "utf8"), expected: 48160 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
