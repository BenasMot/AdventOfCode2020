import run from "aocrunner";
import { readFileSync } from "fs";
import { Ship, WaypontShip } from "./Ship.js";

const part1 = (rawInput: string) => {
  const ship = new Ship();
  ship.setCourse(rawInput);

  return ship.getCourseDistance();
};

const part2 = (rawInput: string) => {
  const waypointShip = new WaypontShip();
  waypointShip.setCourse(rawInput);

  return waypointShip.getCourseDistance();
};

run({
  part1: {
    tests: [{ input: readFileSync("./src/day12/input.txt", "utf8"), expected: 1956 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: readFileSync("./src/day12/input.txt", "utf8"), expected: 126797 }],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
