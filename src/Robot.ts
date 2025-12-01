import { Table } from './Table';
import { Direction, DirectionHelper } from './Direction';

export class Robot {
    private table: Table;
    private x: number | null;
    private y: number | null;
    private facing: Direction | null;
    private isPlaced: boolean;

    constructor(table: Table) {
        this.table = table;
        this.x = null;
        this.y = null;
        this.facing = null;
        this.isPlaced = false;
    }

    place(x: string | number, y: string | number, facing: string): void {
        const intX = typeof x === 'number' ? x : parseInt(x, 10);
        const intY = typeof y === 'number' ? y : parseInt(y, 10);

        if (isNaN(intX) || isNaN(intY) || !DirectionHelper.isValidDirection(facing as Direction)) {
            return;
        }

        if (this.table.isValidPosition(intX, intY)) {
            this.x = intX;
            this.y = intY;
            this.facing = facing as Direction;
            this.isPlaced = true;
        }
    }

    move(): void {
        if (!this.isPlaced || this.x === null || this.y === null || this.facing === null) {
            return;
        }

        let nextX = this.x;
        let nextY = this.y;

        switch (this.facing) {
            case 'NORTH':
                nextY += 1;
                break;
            case 'SOUTH':
                nextY -= 1;
                break;
            case 'EAST':
                nextX += 1;
                break;
            case 'WEST':
                nextX -= 1;
                break;
        }

        if (this.table.isValidPosition(nextX, nextY)) {
            this.x = nextX;
            this.y = nextY;
        }
    }

    left(): void {
        if (!this.isPlaced || this.facing === null) {
            return;
        }
        this.facing = DirectionHelper.turnLeft(this.facing);
    }

    right(): void {
        if (!this.isPlaced || this.facing === null) {
            return;
        }
        this.facing = DirectionHelper.turnRight(this.facing);
    }

    report(): string | null {
        if (!this.isPlaced || this.x === null || this.y === null || this.facing === null) {
            return null;
        }
        return `${this.x},${this.y},${this.facing}`;
    }
}
