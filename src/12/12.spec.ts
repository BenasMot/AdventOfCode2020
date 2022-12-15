import {readFileSync} from 'fs';
import {Ship, WaypontShip} from './12';

const testInput = 'F10\nN3\nF7\nR90\nF11';
const taskInput = readFileSync('./src/12/input.txt', 'utf8');

describe('11', () => {
  describe('part 1', () => {
    it('should solve for test input', () => {
      const ship = new Ship();
      ship.setCourse(testInput);
      expect(ship.getCourseDistance()).toBe(25);
    });

    it('should solve for task input', () => {
      const ship = new Ship();
      ship.setCourse(taskInput);
      expect(ship.getCourseDistance()).toBe(1956);
    });
  });

  describe('part 2', () => {
    it('should solve for test input', () => {
      const ship = new WaypontShip();
      ship.setCourse(testInput);
      expect(ship.getCourseDistance()).toBe(286);
    });

    it('should solve for task input', () => {
      const ship = new WaypontShip();
      ship.setCourse(taskInput);
      expect(ship.getCourseDistance()).toBe(126797);
    });
  });
});
