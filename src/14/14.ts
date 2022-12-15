type Mask = {
  zerosMask: number;
  onesMask: number;
};

type MaskOp = {
  operation: 'mask';
} & Mask;

type MemOp = {
  operation: 'mem';
  place: number;
  value: number;
};

export const completeInstructions = (input: string) => {
  const data = parseData(input);

  let memory: number[] = [];
  let mask: Mask = {onesMask: 0, zerosMask: 0};

  data.forEach((command) => {
    switch (command.operation) {
      case 'mask':
        updateMask(command, mask);
        break;
      case 'mem':
        updateValue(command, mask, memory);
        break;
    }
  });

  return memory.reduce((carry, value) => carry + value, 0);
};

const updateValue = (command: MemOp, mask: Mask, memory: number[]) => {
  const memoryAddress = command.place;
  const withOnes = command.value | mask.onesMask;
  const withOnesAndZeros = withOnes - (withOnes & mask.zerosMask);

  memory[memoryAddress] = withOnesAndZeros;
};

const updateMask = (command: MaskOp, mask: Mask) => {
  mask.onesMask = command.onesMask;
  mask.zerosMask = command.zerosMask;
};

const parseData = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map<MaskOp | MemOp>((line) => {
      if (line.slice(0, 5) === 'mask ') {
        const maskStr = line.slice(7);
        const zerosMask = maskStr.replace(/1/g, 'X').replace(/0/g, '1').replace(/X/g, '0');
        const onesMask = maskStr.replace(/X/g, '0');

        return {operation: 'mask', onesMask: parseInt(onesMask, 2), zerosMask: parseInt(zerosMask, 2)};
      } else {
        const [_, place, value] = line.split(/mem\[|\] = /g);

        return {operation: 'mem', place: parseInt(place, 10), value: parseInt(value, 10)};
      }
    });
};
