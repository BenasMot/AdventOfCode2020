import run from "aocrunner";
import { readFileSync } from "fs";

interface RouteInfo {
  id: number;
  timeToWait: number;
}

interface Bus {
  id: number;
  delay: number;
}

interface Notes {
  timestamp: number;
  busses: Bus[];
}

const getFastestRouteInfo = (input: string): RouteInfo => {
  const notes = parseNotes(input);

  let fastestRoute: RouteInfo = { id: 0, timeToWait: Infinity };
  notes.busses.forEach(({ id }) => {
    const timeAfterLast = notes.timestamp % id;
    const timeToWait = id - timeAfterLast;

    if (timeToWait < fastestRoute.timeToWait) {
      fastestRoute = { id, timeToWait };
    }
  });

  return fastestRoute;
};

const getEarliestSubsequentDeparturesTime = (input: string): number => {
  const { busses } = parseNotes(input);

  let guess = 0;
  let step: number = 1;

  busses.forEach((bus, index) => {
    step *= busses[index - 1]?.id || 1;

    let hasAnswer = false;
    while (!hasAnswer) {
      if ((guess + bus.delay) % bus.id === 0) {
        hasAnswer = true;
      } else {
        guess += step;
      }
    }
  });

  return guess;
};

const parseNotes = (input: string): Notes => {
  const [arrivalTime, timetable] = input.trim().split("\n");

  const busses = timetable
    .split(",")
    .map<Bus | undefined>((id, index) => {
      if (id === "x") {
        return undefined;
      }
      return { id: parseInt(id, 10), delay: index };
    })
    .filter((bus): bus is Bus => bus !== undefined);

  return {
    timestamp: parseInt(arrivalTime, 10),
    busses,
  };
};

const part1 = (rawInput: string) => {
  const { timeToWait, id } = getFastestRouteInfo(rawInput);
  return timeToWait * id;
};

const part2 = (rawInput: string) => {
  // return getEarliestSubsequentDeparturesTime(rawInput);
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day13/input.txt", "utf8"), expected: 3215 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day13/input.txt", "utf8"), expected: 1956 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
