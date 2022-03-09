export interface passwordMappingItem {
  range: string,
  char: string,
  password: string,
};

const parseIndexList = (input: string[]) => {
  return input.map((val: string) => 
    parseInt(val)
  );
}

export const countValidPasswords = (items: passwordMappingItem[]) => {
  return items.reduce((prev, curr) => {
    const rules = curr.range.split('-');
    const [from, to] = parseIndexList(rules);
    const passwordLength = curr.password.length;
    const passWithRemovedChar = curr.password.split(curr.char).join('');
    const charCount = passwordLength - passWithRemovedChar.length;

    if (charCount >= from && charCount <= to)
      return prev + 1;
    else 
      return prev + 0;
  }, 0);  
};

export const countValidPasswordsNew = (items: passwordMappingItem[]) => {
  return items.reduce((prev, curr) => {
    const rules = parseIndexList(curr.range.split('-'));
    let count = 0;

    for (const rule of rules) {
      count += curr.password[rule-1] === curr.char ? 1 : 0;
    }

    if (count === 1)
      return prev + 1;
    else 
      return prev + 0;
  }, 0);  
};
