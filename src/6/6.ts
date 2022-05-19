const getGroups = (input: string) => {
  return input.split('\n\n');
};

 const getPeople = (input: string) => {
   return input.split('\n');
 };

export const countYes = (group: string) => {
  const alreadyAnswered: Set<String> = new Set<String>();

  let count = 0;
  for (let i = 0; i < group.length; i++) {
    const char = group[i];
    if (!alreadyAnswered.has(char) && char !== '\n') {
      alreadyAnswered.add(char);
      count++;
    }
  }
  return count;
}


export const getNumberOfAnswers1 = (input: string) => {
  const groups = getGroups(input);
  return groups.reduce((accumulator, current) => {
    return accumulator + countYes(current);
  }, 0);
};

const getSetIntersection = <T>(set1: Set<T>, set2: Set<T>) => {
  return new Set([...set1].filter(el => set2.has(el)));
};

export const countAllYes = (group: string) => {
  const people = getPeople(group);

  const answeredQuestions: Set<String>[] = [];
  people.forEach((person) => {
    if (person) {
      answeredQuestions.push(new Set(person.split('')));
    }
  });

  const sharedQuestions = answeredQuestions.reduce((a, b) => {
    return getSetIntersection(a, b);
  });

  return sharedQuestions.size;
};


export const getNumberOfAnswers2 = (input: string) => {
  const groups = getGroups(input);
  return groups.reduce((accumulator, current) => {
    return accumulator + countAllYes(current);
  }, 0);
};


