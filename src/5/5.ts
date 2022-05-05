type Tickets = Set<string>;

export const parseTickets = (str: string): Tickets => {
  return new Set<string>(str.split('\n'));
};

const evaluateTicket = (row: number, col: number) => {
  return row*8+col;
};

export const getLargestTicketSize = (tickets: Tickets) => {
  const rowCount = 128; 
  const colCount = 8;

  for (let i = rowCount - 1; i > 0; i--) {
    const backFront = i
      .toString(2)
      .padStart(7, '0')
      .replace(/1/g, 'B')
      .replace(/0/g, 'F');

    for (let j = colCount - 1; j > 0; j--) {
      const rightLeft = j
        .toString(2)
        .padStart(3, '0')
        .replace(/1/g, 'R')
        .replace(/0/g, 'L');

      if (tickets.has(backFront + rightLeft)) {
        return evaluateTicket(i, j);
      }
    }
  }
};

const ticketToRowCol = (ticket: string) => {
  const fb = ticket.slice(0, 7);
  const rl = ticket.slice(7, 10);

  const rowBin = fb.replace(/B/g, '1').replace(/F/g, '0');
  const colBin = rl.replace(/R/g, '1').replace(/L/g, '0');

  return [
    parseInt(rowBin, 2),
    parseInt(colBin, 2),
  ]
};

export const findMissing = (tickets: Tickets) => {
  const isTaken: boolean[] = new Array(128*8).fill(false);
  let min = 128 * 8; 
  let max = 0;
  
  tickets.forEach(ticket => {
    const [col, row] = ticketToRowCol(ticket);
    const seat = evaluateTicket(col, row);

    const isSmallest = seat < min;
    const isLargest = seat > max;

    isTaken[seat] = true

    if (isSmallest) {
      min = seat;
    } 
    if (isLargest) {
      max = seat;
    }
  });

  return isTaken.findIndex((val, index) => val === false && index > min && index < max);
};
