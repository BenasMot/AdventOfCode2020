import fs from 'fs';
import {countNeededContainers, countValidParentContainers} from './7';

const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const input2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

describe('7', () => {
  describe('first', () => {
    it('should work with test input', () => {
      const validContainerCount = countValidParentContainers(input, 'shiny gold');
      expect(validContainerCount).toBe(4);
    });

    it('should work with the task input', () => {
      const input = fs.readFileSync('./src/7/input.txt', 'utf8');
      const validContainerCount = countValidParentContainers(input, 'shiny gold');
      expect(validContainerCount).toBe(287);
    });
  });

  describe('second', () => {
    it('should work with test input', () => {
      const neededContainersCount = countNeededContainers(input, 'shiny gold');
      expect(neededContainersCount).toBe(32);
    });

    it('should work with the second test input', () => {
      const neededContainersCount = countNeededContainers(input2, 'shiny gold');
      expect(neededContainersCount).toBe(126);
    });

    it('should work wht the task input', () => {
      const input = fs.readFileSync('./src/7/input.txt', 'utf8');
      const neededContainersCount = countNeededContainers(input, 'shiny gold');
      expect(neededContainersCount).toBe(48160);
    });
  });
});
