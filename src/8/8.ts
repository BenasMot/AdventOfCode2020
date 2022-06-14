import {findIndices} from '../util/findIndices';

type Operation = 'acc' | 'nop' | 'jmp';
type Value = number;

interface Line {
  op: Operation;
  val: Value;
}

const parseLine = (lineString: string): Line => {
  const op: Operation = lineString.slice(0, 3) as Operation;
  const val: Value = parseInt(lineString.slice(3), 10);
  return {op, val};
};

export const parseInputIntoLines = (input: string): Line[] => {
  return input.trimEnd().split('\n').map(parseLine);
};

export const traverseCode = (lines: Line[]) => {
  let value = 0;
  const visitedLines = new Set<number>();

  for (let i = 0; i < lines.length; i++) {
    if (visitedLines.has(i)) {
      return {value, error: true};
    }
    visitedLines.add(i);
    const line = lines[i];

    switch (line.op) {
      case 'acc':
        value += line.val;
        break;
      case 'jmp':
        i += line.val - 1;
        break;
      case 'nop':
        break;
    }
  }

  return {value, error: false};
};

export const traverseAndFixCode = (lines: Line[]) => {
  const possibleAlterationLineIndices = findIndices(lines, (line) => line.op === 'jmp' || line.op === 'nop');
  let lastAlteration: {index: number; valueBeforeChange: Operation} | undefined = undefined;

  while (possibleAlterationLineIndices.size > 0) {
    const solution = traverseCode(lines);

    if (!solution.error) {
      return solution;
    } else {
      if (lastAlteration) {
        lines[lastAlteration.index].op = lastAlteration.valueBeforeChange;
      }

      const alterationIndex = [...possibleAlterationLineIndices][0];
      possibleAlterationLineIndices.delete(alterationIndex);
      lastAlteration = {index: alterationIndex, valueBeforeChange: lines[alterationIndex].op};

      switch (lines[alterationIndex].op) {
        case 'jmp':
          lines[alterationIndex].op = 'nop';
          break;
        case 'nop':
          lines[alterationIndex].op = 'jmp';
          break;
      }
    }
  }
  return traverseCode(lines);
};
