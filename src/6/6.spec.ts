import fs from 'fs';
import { countAllYes, countYes, getNumberOfAnswers1, getNumberOfAnswers2 } from './6';
const input = fs.readFileSync('./src/6/input.txt', 'utf-8');

//Test input
const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;


describe('6', () => {
  describe('countYes', () => {
    it('should count answered unique questions in a group', () => {
      const group = 'abc\nab\nd';
      expect(countYes(group)).toBe(4);
    });
  });

  describe('countAllToYes', () => {
    it('should count answers that everyone answered to', () => {
      const group = 'abc\nabw\nbamboo\nbowl';
      expect(countAllYes(group)).toBe(1);
    });

    it('aaa', () => {
      const group = `knfheau
      kanehuf
      unekfa
      klcsnemaufy
      `;
      expect(countAllYes(group)).toBe(0);
    });
  });

  describe('first', () => {
    it('should count 11 for the test string', () => {
      expect(getNumberOfAnswers1(testInput)).toBe(11);
    });

    it('should solve', () => {
      expect(getNumberOfAnswers1(input)).toBe(6443);
    });
  });

  describe('second', () => {
    it('should get 6 for the test input', () => {
      expect(getNumberOfAnswers2(testInput)).toBe(6);
    });

    it('should solve', () => {
      expect(getNumberOfAnswers2(input)).toBe(3232);
    });
  });
});