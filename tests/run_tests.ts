import { CommandParser } from "../src/CommandParser";

describe("Toy Robot Simulator", () => {
  let parser: CommandParser;
  let consoleOutput: string[];

  beforeEach(() => {
    parser = new CommandParser();
    consoleOutput = [];
    // Mock console.log to capture output
    jest.spyOn(console, "log").mockImplementation((message: string) => {
      consoleOutput.push(message);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Example A", () => {
    it("should place robot at 0,0 facing NORTH, move, and report", () => {
      parser.parse("PLACE 0,0,NORTH");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,1,NORTH"]);
    });
  });

  describe("Example B", () => {
    it("should place robot at 0,0 facing NORTH, turn LEFT, and report", () => {
      parser.parse("PLACE 0,0,NORTH");
      parser.parse("LEFT");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,WEST"]);
    });
  });

  describe("Example C", () => {
    it("should place robot at 1,2 facing EAST, move twice, turn LEFT, move, and report", () => {
      parser.parse("PLACE 1,2,EAST");
      parser.parse("MOVE");
      parser.parse("MOVE");
      parser.parse("LEFT");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["3,3,NORTH"]);
    });
  });

  describe("RIGHT Rotation", () => {
    it("should rotate RIGHT from NORTH to EAST", () => {
      parser.parse("PLACE 0,0,NORTH");
      parser.parse("RIGHT");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,EAST"]);
    });

    it("should rotate RIGHT from EAST to SOUTH", () => {
      parser.parse("PLACE 0,0,EAST");
      parser.parse("RIGHT");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,SOUTH"]);
    });

    it("should rotate RIGHT from SOUTH to WEST", () => {
      parser.parse("PLACE 0,0,SOUTH");
      parser.parse("RIGHT");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,WEST"]);
    });

    it("should rotate RIGHT from WEST to NORTH", () => {
      parser.parse("PLACE 0,0,WEST");
      parser.parse("RIGHT");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,NORTH"]);
    });
  });

  describe("Command Validation", () => {
    it("should ignore commands before PLACE", () => {
      parser.parse("MOVE");
      parser.parse("LEFT");
      parser.parse("REPORT");
      parser.parse("PLACE 1,1,SOUTH");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["1,1,SOUTH"]);
    });
  });

  describe("Boundary Checking", () => {
    it("should prevent falling off table (NORTH)", () => {
      parser.parse("PLACE 0,4,NORTH");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,4,NORTH"]);
    });

    it("should prevent falling off table (SOUTH)", () => {
      parser.parse("PLACE 0,0,SOUTH");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,SOUTH"]);
    });

    it("should prevent falling off table (EAST)", () => {
      parser.parse("PLACE 4,0,EAST");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["4,0,EAST"]);
    });

    it("should prevent falling off table (WEST)", () => {
      parser.parse("PLACE 0,0,WEST");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["0,0,WEST"]);
    });
  });

  describe("Multiple PLACE Commands", () => {
    it("should handle multiple PLACE commands", () => {
      parser.parse("PLACE 1,1,NORTH");
      parser.parse("MOVE");
      parser.parse("PLACE 3,3,SOUTH");
      parser.parse("MOVE");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["3,2,SOUTH"]);
    });
  });

  describe("Invalid PLACE Commands", () => {
    it("should ignore invalid PLACE command (off table)", () => {
      parser.parse("PLACE 6,6,NORTH");
      parser.parse("PLACE 1,1,NORTH");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["1,1,NORTH"]);
    });

    it("should ignore PLACE command with missing arguments", () => {
      parser.parse("PLACE");
      parser.parse("PLACE 1,1");
      parser.parse("PLACE 1,1,NORTH,EXTRA");
      parser.parse("PLACE 1,1,NORTH");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["1,1,NORTH"]);
    });

    it("should ignore PLACE command with invalid direction", () => {
      parser.parse("PLACE 1,1,INVALID");
      parser.parse("PLACE 1,1,NORTH");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["1,1,NORTH"]);
    });

    it("should ignore PLACE command with invalid coordinates (NaN)", () => {
      parser.parse("PLACE abc,1,NORTH");
      parser.parse("PLACE 1,xyz,NORTH");
      parser.parse("PLACE 1,1,NORTH");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["1,1,NORTH"]);
    });
  });

  describe("Invalid Commands", () => {
    it("should ignore invalid commands", () => {
      parser.parse("PLACE 1,1,NORTH");
      parser.parse("INVALID");
      parser.parse("UNKNOWN");
      parser.parse("REPORT");

      expect(consoleOutput).toEqual(["1,1,NORTH"]);
    });
  });
});
