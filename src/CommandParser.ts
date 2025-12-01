import { Table } from "./Table";
import { Robot } from "./Robot";

export class CommandParser {
  private table: Table;
  private robot: Robot;

  constructor() {
    this.table = new Table(5, 5);
    this.robot = new Robot(this.table);
  }

  parse(commandLine: string): void {
    const parts = commandLine.trim().split(/\s+/);
    const command = parts[0].toUpperCase();

    switch (command) {
      case "PLACE":
        if (parts[1]) {
          const args = parts[1].split(",");
          if (args.length === 3) {
            this.robot.place(args[0], args[1], args[2]);
          }
        }
        break;
      case "MOVE":
        this.robot.move();
        break;
      case "LEFT":
        this.robot.left();
        break;
      case "RIGHT":
        this.robot.right();
        break;
      case "REPORT":
        const report = this.robot.report();
        if (report) {
          console.log(report);
        }
        break;
      default:
        // Ignore invalid commands
        break;
    }
  }
}
