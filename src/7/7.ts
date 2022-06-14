import {setUnion} from '../util/setUnion';

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

const parseRules = (input: string): RuleSet => {
  const containerMap: Rules = new Map();
  const invertedContainersMap: InvertedRules = new Map();

  const descriptions = input.split('\n');
  descriptions.forEach((description) => {
    const words = description.split(' ');

    const rule = extractRule(words);
    containerMap.set(rule.bag, rule.contents);

    rule.contents.forEach((container: Container) => {
      const canBeContainedBy = invertedContainersMap.get(container.color) || [];
      invertedContainersMap.set(container.color, [...canBeContainedBy, {color: rule.bag}]);
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

export const countValidParentContainers = (input: string, color: string) => {
  const rules = parseRules(input).invertedRules;
  const validContainers = colorSetToStringSet(findValidContainers(color, rules));
  return validContainers.size;
};

const recursivelyCountContainers = (color: string, rules: Rules): number => {
  let count = 1;

  rules.get(color)?.forEach((container) => {
    count += (container.ammount || 0) * recursivelyCountContainers(container.color, rules);
  });

  return count;
};

export const countNeededContainers = (input: string, color: string): number => {
  const rules = parseRules(input).rules;
  return recursivelyCountContainers(color, rules) - 1;
};
