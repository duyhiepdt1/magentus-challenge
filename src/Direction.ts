export enum Direction {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST'
}

export class DirectionHelper {

  static turnLeft(current: Direction): Direction {
    const rotations: Record<Direction, Direction> = {
      [Direction.NORTH]: Direction.WEST,
      [Direction.WEST]: Direction.SOUTH,
      [Direction.SOUTH]: Direction.EAST,
      [Direction.EAST]: Direction.NORTH
    };
    return rotations[current];
  }

  static turnRight(current: Direction): Direction {
    const rotations: Record<Direction, Direction> = {
      [Direction.NORTH]: Direction.EAST,
      [Direction.EAST]: Direction.SOUTH,
      [Direction.SOUTH]: Direction.WEST,
      [Direction.WEST]: Direction.NORTH
    };
    return rotations[current];
  }

  static isValidDirection(direction: string): direction is Direction {
    return Object.values(Direction).includes(direction as Direction);
  }
}
