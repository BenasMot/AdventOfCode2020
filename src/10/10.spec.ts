import {readFileSync} from 'fs';
import {countPossibleAdapterJunctions, findAdaptersThatCanJumpTo, getJoltDifferenceCounts} from './10';

const TEST_INPUT_1 = '16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4\n';
const TEST_INPUT_2 =
  '28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3\n';
const INPUT = readFileSync('./src/10/input.txt', 'utf-8');

const parseInput = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map((str) => parseInt(str, 10));
};

const testInput1 = parseInput(TEST_INPUT_1);
const testInput2 = parseInput(TEST_INPUT_2);
const input = parseInput(INPUT);

describe('day 10', () => {
  describe('part 1', () => {
    it('should solve for testInput1', () => {
      const joltDifferences = getJoltDifferenceCounts(testInput1);
      expect(joltDifferences.get(1)! * joltDifferences.get(3)!).toBe(35);
    });

    it('should solve for testInput2', () => {
      const joltDifferences = getJoltDifferenceCounts(testInput2);
      expect(joltDifferences.get(1)! * joltDifferences.get(3)!).toBe(220);
    });

    it('should solve for input', () => {
      const joltDifferences = getJoltDifferenceCounts(input);
      expect(joltDifferences.get(1)! * joltDifferences.get(3)!).toBe(1848);
    });
  });

  describe('part 2', () => {
    describe('findAdaptersThatCanJumpTo', () => {
      const adapters = new Set(parseInput(TEST_INPUT_1));

      it('should find Set{15} for 16 in adapters', () => {
        expect(findAdaptersThatCanJumpTo(16, adapters)).toEqual(new Set([15]));
      });

      it('should find Set{11, 10} for 12 in adapters', () => {
        expect(findAdaptersThatCanJumpTo(12, adapters)).toEqual(new Set([10, 11]));
      });
    });

    describe('countPossibleAdapterJunctions', () => {
      it('should solve for testInput1', () => {
        expect(countPossibleAdapterJunctions(testInput1)).toBe(8);
      });

      it('should solve for testInput2', () => {
        expect(countPossibleAdapterJunctions(testInput2)).toBe(19208);
      });
    });
  });
});
