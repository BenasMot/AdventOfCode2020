interface MapInfo {
  map: string;
  rowCount: number;
  rowLength: number;
}

export const countOccupiedSeats = (input: string) => {
  const {map, rowCount, rowLength} = getMapInfo(input);

  let iterations = 0;
  let prevState = map.split('');
  let nextState: string[] | string = [];

  while (prevState.join('') !== nextState.join('') && iterations < 1000) {
    for (let position = 0; position < map.length; position++) {
      let occupiedAdjacentCount = 0;

      const adjacentIndices = getAdjacentIndices(position, rowCount, rowLength);
      adjacentIndices.forEach((index) => {
        if (index && prevState[index] === '#') {
          occupiedAdjacentCount++;
        }
      });

      if (prevState[position] === 'L' && occupiedAdjacentCount === 0) {
        nextState[position] = '#';
      } else if (prevState[position] === '#' && occupiedAdjacentCount >= 4) {
        nextState[position] = 'L';
      } else {
        nextState[position] = prevState[position];
      }
    }

    prevState = nextState;
    nextState = [];
    iterations++;
  }

  nextState = nextState.join('');
  return nextState.length - nextState.replace('#', '').length;
};

export const getMapInfo = (input: string): MapInfo => {
  const str = input.trim();
  const rowLength = str.indexOf('\n');
  const rowCount = (str.length + 1) / (rowLength + 1);
  const map = str.trim().replace(/\n/g, '');

  return {rowLength, rowCount, map};
};

export const getAdjacentIndices = (position: number, rowCount: number, rowLength: number): (number | undefined)[] => {
  const isTopmost = position <= rowLength;
  const isBottommost = position >= rowLength * (rowCount - 1);
  const isLeftmost = (position + 1) % rowLength === 1;
  const isRightmost = (position + 1) % rowLength === 0;

  const top = position - rowLength;
  const topLeft = position - rowLength - 1;
  const topRight = position - rowLength + 1;
  const bottom = position + rowLength;
  const bottomLeft = position + rowLength - 1;
  const bottomright = position + rowLength + 1;
  const right = position + 1;
  const left = position - 1;

  return [
    isTopmost || isLeftmost ? undefined : topLeft,
    isTopmost ? undefined : top,
    isTopmost || isRightmost ? undefined : topRight,
    isLeftmost ? undefined : left,
    isRightmost ? undefined : right,
    isBottommost || isLeftmost ? undefined : bottomLeft,
    isBottommost ? undefined : bottom,
    isBottommost || isRightmost ? undefined : bottomright,
  ];
};
