import {readFileSync} from 'fs';

const TEST_INPUT_1 = '16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4\n';
const TEST_INPUT_2 =
  '28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3\n';
const input = readFileSync('./src/10/input.txt', 'utf-8');

const parseInput = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map((str) => parseInt(str, 10));
};

export const getJoltDifferenceCounts = (input: number[]) => {
  const adaptersSet = new Set(input);

  const jumpMap = new Map<number, number>();
  let currentJoltage = 0;

  while (adaptersSet.size > 0) {
    const jump = findNextJoltJump(currentJoltage, adaptersSet);
    adaptersSet.delete(currentJoltage + jump);
    currentJoltage += jump;
    jumpMap.set(jump, (jumpMap.get(jump) || 0) + 1);
  }

  jumpMap.set(3, jumpMap.get(3)! + 1);

  return jumpMap;
};

const findNextJoltJump = (from: number, adapters: Set<number>): number => {
  const possibleJumps = [1, 2, 3];

  for (const jump of possibleJumps) {
    if (adapters.has(from + jump)) {
      return jump;
    }
  }

  throw new Error(`No possible jumps found from ${from} `);
};

// const testResult1 = getJoltDifferenceCounts(parseInput(TEST_INPUT_1));
// const testResult2 = getJoltDifferenceCounts(parseInput(TEST_INPUT_2));
// const result = getJoltDifferenceCounts(parseInput(input));

// console.log('### 1 test', testResult1, testResult2);
// console.log('### 1 solve', result, result.get(1)! * result.get(3)!);

export const findAdaptersThatCanJumpTo = (to: number, adapters: Set<number>): Set<number> => {
  const possibleJumps = [1, 2, 3];

  let possibleAdapters = new Set<number>();
  for (const jumpSize of possibleJumps) {
    if (adapters.has(to - jumpSize)) {
      possibleAdapters.add(to - jumpSize);
    }
  }

  return possibleAdapters;
};

export const countPossibleAdapterJunctions = (input: number[]): number => {
  const adapters = new Set<number>(input);
  const adaptersMaxToMin = input.sort((a, b) => b - a);

  let possibleCombinations = 1;
  adaptersMaxToMin.forEach((adapter) => {
    const adaptersThatCanJumpTo = findAdaptersThatCanJumpTo(adapter, adapters);
    const validAdapterCount = adaptersThatCanJumpTo.size;

    possibleCombinations += validAdapterCount - 1;
  });

  return possibleCombinations;
};
