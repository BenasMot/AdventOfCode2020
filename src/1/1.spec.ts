import {input} from './input.json';
import { findThreeThatSumUpTo, findTwoThatSumUpTo } from "./1";
import { range } from "./range";

describe('1st task', () => {
  it('should return 1,3 for 4 from range 1 to 8', () => {
    const {first, second} = findTwoThatSumUpTo(range(1,9), 4);
    expect(first).toBe(1);
    expect(second).toBe(3);
  });

  it('should return 3,7 for 10 from range 3 to 10', () => {
    const {first, second} = findTwoThatSumUpTo(range(3,10), 10);
    expect(first).toBe(3);
    expect(second).toBe(7);
  });

  it('should solve', () => {
    const {first, second} = findTwoThatSumUpTo(input, 2020);
    
    expect(first).toBe(1701);
    expect(second).toBe(319);

    console.log(first * second);
  })
});

describe('2nd task', () => {
  it('should solve', () => {
    const result = findThreeThatSumUpTo(input, 2020);
    expect(result).toStrictEqual({first: 1450, second: 43, third: 527});
    console.log(result.first*result.second*result.third);
  });
});
