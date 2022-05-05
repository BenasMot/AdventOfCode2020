import { findMissing, getLargestTicketSize, parseTickets } from "./5";
import fs from 'fs';

const input = fs.readFileSync('./src/5/input.txt', 'utf-8');

const testInput = `FFBBBFFLRL
BFFBFBFRLR
FFFBBFBRRR
BFFBBBBRRL
FFFBBFBLLR
BBFBFBFLLR
FBBFFBFLRL
BFBFBBFLLL
FBFBBFBLRR
FFFBBBBRLR
FFFFBFFRRL
BFFFBFBLRL
BBFFFBBRLL
FFBFFFBLRL
FBFBFFFRLL`;

describe('5', () => {
  describe('first', () => {
    describe('evalations', () => {
      it('should evaluate BFFFBBFRRR tp 567', () => {
        const tickets = new Set(['BFFFBBFRRR']);
        expect(getLargestTicketSize(tickets)).toBe(567);
      });

      it('should evaluate FFFBBBFRRR tp 119', () => {
        const tickets = new Set(['FFFBBBFRRR']);
        expect(getLargestTicketSize(tickets)).toBe(119);
      });

      it('should evaluate BBFFBBFRLL tp 820', () => {
        const tickets = new Set(['BBFFBBFRLL']);
        expect(getLargestTicketSize(tickets)).toBe(820);
      });
    });

    it('should calculate the biggest ticket number in test input', () => {
      const tickets = parseTickets(testInput);
      const largestTicket = getLargestTicketSize(tickets);
      expect(largestTicket).toBe(849);
    });

    it('should do the same with input', () => {
      const tickets = parseTickets(input);
      const largestTicket = getLargestTicketSize(tickets);
      expect(largestTicket).toBe(913);
    });
  });

  describe('second', () => {
    it('should find missing spot', () => {
      const tickets = parseTickets(input);
      const missingSpot = findMissing(tickets);
      expect(missingSpot).toBe(717);
    });
  });
});