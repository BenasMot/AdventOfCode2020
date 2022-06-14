import {readFileSync} from 'fs';
import {parseInputIntoLines, traverseAndFixCode, traverseCode} from './8';

const fileInput = readFileSync('./src/8/input.txt', 'utf-8');
const testInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe('8', () => {
  describe('1', () => {
    it('should solve test input', () => {
      const lines = parseInputIntoLines(testInput);
      expect(traverseCode(lines)).toEqual({value: 5, error: true});
    });

    it('should solve file input', () => {
      const lines = parseInputIntoLines(fileInput);
      expect(traverseCode(lines)).toEqual({value: 1200, error: true});
    });
  });

  describe('2', () => {
    it('should solve test input', () => {
      const lines = parseInputIntoLines(testInput);
      expect(traverseAndFixCode(lines)).toEqual({value: 8, error: false});
    });

    it('should solve file input', () => {
      const lines = parseInputIntoLines(fileInput);
      expect(traverseAndFixCode(lines)).toEqual({value: 1023, error: false});
    });
  });
});
