import {readFileSync} from 'fs';
import {findBadNumber, findContiguousAddendsThatSumUpTo, findRemaindersTillZero, findTwoNumbersThatSumUpTo, maxMinSum} from './9';

describe('9', () => {
  describe('findTwoNumbersThatSumUpTo', () => {
    it('should correctly find two numbers that sum up to a given number', () => {
      const arr = [1, 3, 6, 7, 9, 2];
      expect(findTwoNumbersThatSumUpTo(arr, 11)).toEqual([9, 2]);
    });

    it('should return undefined if no addends found', () => {
      const arr = [1, 3, 6, 7, 9, 2];
      expect(findTwoNumbersThatSumUpTo(arr, 6)).toBe(undefined);
    });

    it('should not find addend with self', () => {
      const arr = [1, 2, 3];
      expect(findTwoNumbersThatSumUpTo(arr, 2)).toBe(undefined);
    });

    it('should should find addends with same values', () => {
      const arr = [1, 2, 4, 2];
      expect(findTwoNumbersThatSumUpTo(arr, 4)).toEqual([2, 2]);
    });
  });

  describe('findBadNumber', () => {
    it('should find bad number in example data', () => {
      expect(findBadNumber(exampleData, 5)).toBe(127);
    });

    it('should find bad number in excercise input', () => {
      const data = parseInput();
      expect(findBadNumber(data, 25)).toBe(393911906);
    });
  });

  describe('findRemaindersTillZero', () => {
    it('should return 0 if all numbers add up to given number', () => {
      const input = [2, 4, 10, 14, 20];
      expect(findRemaindersTillZero(input, 50)).toBe(0);
    });

    it('should ignore numbers after reaching zero', () => {
      const input = [2, 4, 10, 14, 20];
      expect(findRemaindersTillZero(input, 16)).toBe(0);
    });

    it('should callback remainder', () => {
      const fn = jest.fn();
      const input = [2, 4, 10, 14, 20];

      findRemaindersTillZero(input, 16, fn);
      expect(fn).toHaveBeenCalledTimes(3);
      expect(fn).toHaveBeenCalledWith(16);
      expect(fn).toHaveBeenCalledWith(14);
      expect(fn).toHaveBeenCalledWith(10);
    });

    it('should return number less than zero if numbers do not add up to number', () => {
      const input = [2, 4, 10, 14, 20];
      expect(findRemaindersTillZero(input, 18)).toBe(-12);
    });

    it('should return positive number if array sum less than number', () => {
      const input = [2, 4, 10, 14, 20];
      expect(findRemaindersTillZero(input, 56)).toBe(6);
    });
  });

  describe('findContiguousAddendsThatSumUpTo', () => {
    it('should find contiguous numbers for example data', () => {
      const result = findContiguousAddendsThatSumUpTo(exampleData, 127);
      expect(result).toEqual([15, 25, 47, 40]);
      expect(maxMinSum(result)).toBe(62);
    });

    it('should find contiguous numbers for excercise data', () => {
      const input = parseInput();
      const result = findContiguousAddendsThatSumUpTo(input, 393911906);

      expect(result).toEqual([
        17315331, 16773507, 16828690, 20664316, 18358238, 18793333, 19486189, 24772011, 20285093, 30609544, 20354435,
        21183505, 21265569, 42568378, 27563219, 27207191, 29883357,
      ]);

      expect(maxMinSum(result)).toBe(59341885);
    });
  });
});

const exampleData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576];

const parseInput = (): number[] => {
  const input = readFileSync('./src/9/input.txt', 'utf-8');
  return input.split('\n').map((str) => parseInt(str, 10));
};
