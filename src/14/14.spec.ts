import {readFileSync} from 'fs';
import {completeInstructions} from './14';

const testInput = readFileSync('./src/14/testInput.txt', 'utf-8');
const taskInput = readFileSync('./src/14/input.txt', 'utf-8');

describe('14', () => {
  describe('part one', () => {
    it('should solve for test input', () => {
      const sum = completeInstructions(testInput);
      expect(sum).toBe(165);
    });

    it.only('should solve for task input', () => {
      const sum = completeInstructions(taskInput);
      expect(sum).toBe(165);
    });
  });
});
