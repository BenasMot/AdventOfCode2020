import { countValidPasswords, countValidPasswordsNew, passwordMappingItem } from "./2";

const input:passwordMappingItem[] = require('./input.json');

describe('1st task', () => {
  it('should read input', () => {
    expect(input.length).toBe(1000);
    expect(input[0].range);
  })

  it('should solve 1', () => {
    expect(countValidPasswords(input)).toBe(477);
  })

  it('should solve 2', () => {
    expect(countValidPasswordsNew(input)).toBe(686);
  })
});