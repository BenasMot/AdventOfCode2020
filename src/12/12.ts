const directions = ['E', 'N', 'W', 'S'] as const;
type Direction = typeof directions[number];

interface Instruction {
  command: Direction | 'L' | 'R' | 'F';
  value: number;
}

interface Coords {
  x: number;
  y: number;
}

export class Ship {
  private location: Coords = {x: 0, y: 0};
  private direction: Direction = 'E';

  public setCourse = (input: string) => {
    const instructions = this.parseCourse(input);
    instructions.forEach(this.completeInstruction);
  };

  public getCourseDistance = () => {
    return Math.abs(this.location.x) + Math.abs(this.location.y);
  };

  private parseCourse = (input: string): Instruction[] => {
    return input
      .trim()
      .split('\n')
      .map((item) => ({
        command: item[0] as Instruction['command'],
        value: parseInt(item.slice(1), 10),
      }));
  };

  private completeInstruction = (instruction: Instruction) => {
    switch (instruction.command) {
      case 'N':
        this.location.y += instruction.value;
        break;
      case 'S':
        this.location.y -= instruction.value;
        break;
      case 'E':
        this.location.x += instruction.value;
        break;
      case 'W':
        this.location.x -= instruction.value;
        break;
      case 'R':
      case 'L':
        this.turn(instruction.value, instruction.command);
        break;
      case 'F':
        this.completeInstruction({command: this.direction, value: instruction.value});
        break;
    }
  };

  private turn = (degrees: number, direction: 'R' | 'L') => {
    const currentDirectionIndex = directions.indexOf(this.direction);
    const turn = (degrees / 90) * (direction === 'L' ? 1 : -1);
    const newDirectionIndex = (directions.length + currentDirectionIndex + turn) % directions.length;
    this.direction = directions[newDirectionIndex];
  };
}

export class WaypontShip {
  private location: Coords = {x: 0, y: 0};
  private waypoint: Coords = {x: 10, y: 1};

  public setCourse = (input: string) => {
    const instructions = this.parseCourse(input);
    instructions.forEach(this.completeInstruction);
  };

  public getCourseDistance = () => {
    return Math.abs(this.location.x) + Math.abs(this.location.y);
  };

  private parseCourse = (input: string): Instruction[] => {
    return input
      .trim()
      .split('\n')
      .map((item) => ({
        command: item[0] as Instruction['command'],
        value: parseInt(item.slice(1), 10),
      }));
  };

  private completeInstruction = (instruction: Instruction) => {
    switch (instruction.command) {
      case 'N':
        this.waypoint.y += instruction.value;
        break;
      case 'S':
        this.waypoint.y -= instruction.value;
        break;
      case 'E':
        this.waypoint.x += instruction.value;
        break;
      case 'W':
        this.waypoint.x -= instruction.value;
        break;
      case 'R':
      case 'L':
        this.transposeWaypoint(instruction.value, instruction.command);
        break;
      case 'F':
        this.moveShip(instruction.value);
        break;
    }
  };

  private transposeWaypoint = (degrees: number, direction: 'R' | 'L') => {
    const {x, y} = this.waypoint;

    switch (true) {
      case degrees === 90 && direction === 'R':
      case degrees === 270 && direction === 'L':
        this.waypoint.x = y;
        this.waypoint.y = -x;
        break;

      case degrees === 180:
        this.waypoint.x = -x;
        this.waypoint.y = -y;
        break;

      case degrees === 270 && direction === 'R':
      case degrees === 90 && direction === 'L':
        this.waypoint.x = -y;
        this.waypoint.y = x;
    }
  };

  private moveShip = (multiplier: number) => {
    this.location.x += this.waypoint.x * multiplier;
    this.location.y += this.waypoint.y * multiplier;
  };
}
