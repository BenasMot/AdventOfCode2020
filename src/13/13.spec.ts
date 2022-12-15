import {readFileSync} from 'fs';
import {getEarliestSubsequentDeparturesTime, getFastestRouteInfo} from './13';

const testInput = '939\n7,13,x,x,59,x,31,19';
const taskInput = readFileSync('./src/13/input.txt', 'utf8');

describe('13', () => {
  describe('part 1', () => {
    it('should solve for test input', () => {
      const {timeToWait, id} = getFastestRouteInfo(testInput);
      expect(timeToWait * id).toBe(295);
    });

    it('should solve fot task input', () => {
      const {timeToWait, id} = getFastestRouteInfo(taskInput);
      expect(timeToWait * id).toBe(3215);
    });
  });

  describe('part 2', () => {
    it('should solve for test input 1', () => {
      const input = '939\n17,x,13,19';
      const timestamp = getEarliestSubsequentDeparturesTime(input);
      expect(timestamp).toBe(3417);
    });

    it('should solve for test input 2', () => {
      const input = '939\n67,7,59,61';
      const timestamp = getEarliestSubsequentDeparturesTime(input);
      expect(timestamp).toBe(754018);
    });

    it('should solve for test input 3', () => {
      const input = '939\n67,x,7,59,61';
      const timestamp = getEarliestSubsequentDeparturesTime(input);
      expect(timestamp).toBe(779210);
    });

    it('should solve for test input 4', () => {
      const input = '939\n67,7,x,59,61';
      const timestamp = getEarliestSubsequentDeparturesTime(input);
      expect(timestamp).toBe(1261476);
    });

    it('should solve for test input 5', () => {
      const input = '939\n1789,37,47,1889';
      const timestamp = getEarliestSubsequentDeparturesTime(input);
      expect(timestamp).toBe(1202161486);
    });

    it('should solve for test input', () => {
      const timestamp = getEarliestSubsequentDeparturesTime(testInput);
      expect(timestamp).toBe(1068781);
    });

    it('should solve for task input', () => {
      const timestamp = getEarliestSubsequentDeparturesTime(taskInput);
      expect(timestamp).toBe(1001569619313439);
    });
  });
});
