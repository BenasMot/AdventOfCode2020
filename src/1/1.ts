const addsTo = (numbers: number[], checkedValue: number) => {
  const sum = numbers.reduce((a, b)=> a+b);
  return sum === checkedValue;
}

export const findTwoThatSumUpTo = (numbers: number[], checkedValue: number) => {
  for (const first of numbers) {
    for (const second of numbers) {
      if (addsTo([first, second], checkedValue)) {
        return {first, second};
      }
    }
  }
  return {first: 0, second: 0};
}

export const findThreeThatSumUpTo = (numbers: number[], checkedValue: number) => {

  for (const first of numbers) {
    for (const second of numbers) {
      for (const third of numbers) { 
        if(addsTo([first,second,third], checkedValue)) {
          return {first, second, third};
        }
      }
    }
  }
  return {first: 0, second: 0, third: 0};
}