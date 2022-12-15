import {readFileSync} from 'fs';
import {countOccupiedSeats, getAdjacentIndices, getMapInfo} from './11';

const testInput =
  'L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL\n';
const taskInput = readFileSync('./src/11/input.txt', 'utf8');

describe('day 11', () => {
  describe('task 1', () => {
    it('should solve for test input', () => {
      expect(countOccupiedSeats(testInput)).toBe(37);
    });
  });

  describe('getMapInfo', () => {
    it('should get correct data for 3x3', () => {
      const {map, rowCount, rowLength} = getMapInfo('...\n...\n...\n');
      expect(map).toEqual('.........');
      expect(rowCount).toBe(3);
      expect(rowLength).toBe(3);
    });
  });

  describe('getAdjacentIndices', () => {
    it('should get correct results for 3x3 grid', () => {
      const neighbours = getAdjacentIndices(4, 3, 3);
      expect(neighbours).toEqual(expect.arrayContaining([0, 1, 2, 3, 5, 6, 7, 8]));
    });

    it('should get correct results for a bordering index', () => {
      const neighbours = getAdjacentIndices(0, 3, 3);
      expect(neighbours).toEqual(
        expect.arrayContaining([undefined, undefined, undefined, undefined, 1, undefined, 3, 4])
      );
    });
  });
});
