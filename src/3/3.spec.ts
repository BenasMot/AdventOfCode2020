import fs from 'fs';
import {countTrees} from './3';

describe('day 3', () => {
  it('should read file', () => {
    const map = fs.readFileSync('./src/3/input.txt', 'utf-8');
    expect(map.length).toBe(10336);
  });

  it('should test countTrees', () => {
    const map = `.....#.........#...#..##....#..
.#........#...#........#.......
......#......#..#...#....#.#..#
...#.#####.#.......##.#........
...........#......#..#.....#...
#.#..#...#.#...#.##.....#.....#
....#..#....#...#.#...#.##.....
##...#..........##..######.....
.....#...#......#.............#
........##....#...##..#....#...
...#...#.........#.#..........#
..#.#.....##..........#........
##.......................#.....
#..#...##...##.#.........##....
.#....#.#####....#...#...#.....
#......#......###..#........#.#
.#....##..##.###.#.......#.....
.#..#.........##....#.#....#...
........#..................#...
.......#..#..#............#....
........#...................##.
.#......#......#.####......#...
..###.#..#..#.........#........
..#...........###..#.....#.##..
...#.##.#....#................#
#.....#.............#.#........
.#..............#.........#....`;
    expect(map.length).toBe(863);
    expect(countTrees(map, 3, 1)).toBe(18);
    expect(countTrees(map, 3, 2)).toBe(4);
    expect(countTrees(map, 5, 1)).toBe(5);
    expect(countTrees(map, 1, 2)).toBe(0);
  });

  it('should solve task 1', () => {
    const map = fs.readFileSync('./src/3/input.txt', 'utf-8');
    const count = countTrees(map, 3, 1);
    expect(count).toBe(189);
  });

  it('should solve task 2', () => {
    const map = fs.readFileSync('./src/3/input.txt', 'utf-8');
    const count_1 = countTrees(map, 1, 1);
    const count_3 = countTrees(map, 3, 1);
    const count_5 = countTrees(map, 5, 1);
    const count_7 = countTrees(map, 7, 1);
    const count_1_2 = countTrees(map, 1, 2);
    
    const result = count_1 * count_3 * count_5 * count_7 * count_1_2;
    expect(result).toBe(1718180100);
  });
});
