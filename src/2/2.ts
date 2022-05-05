export interface passwordMappingItem {
  range: string,
  char: string,
  password: string,
};

type Validator = (rules: number[], password: string, char: string) => boolean;

const parseIndexList = (input: string[]) => {
  return input.map((val: string) => 
    parseInt(val)
  );
}

export const countValidPasswords = (items: passwordMappingItem[], validator: Validator) => {
  return items.reduce((prev, curr) => {
    const rules = parseIndexList(curr.range.split('-'));
    const isValid = validator(rules, curr.password, curr.char);

    return prev + (isValid ? 1 : 0);
  }, 0);  
};

export const validator1 = (rules: number[], password: string, char: string) => {
  const passWithRemovedChar = password.split(char).join('');
  const charCount = password.length - passWithRemovedChar.length;
    return charCount >= rules[0] && charCount <= rules[1];
}

export const validator2 = (rules: number[], password: string, char: string) => {
  return (password[rules[0]-1] === char) != (password[rules[1]-1] === char);
};