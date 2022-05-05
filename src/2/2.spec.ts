import { countValidPasswords, passwordMappingItem, validator1, validator2 } from "./2";

const input:passwordMappingItem[] = require('./input.json');

describe('1st task', () => {
  it('should read input', () => {
    expect(input.length).toBe(1000);
    expect(input[0].range);
  })

  it('should solve 1', () => {
    expect(countValidPasswords(input, validator1)).toBe(477);
  })

  it('should solve 2', () => {
    expect(countValidPasswords(input, validator2)).toBe(686);
  })
});