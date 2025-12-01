import * as readline from "readline";
import * as fs from "fs";
import { CommandParser } from "./CommandParser";

const parser = new CommandParser();

// Check if a file argument is provided
const inputFile = process.argv[2];

var rl: readline.Interface;
if (inputFile) {
  // Read from file
  if (fs.existsSync(inputFile)) {
    const fileStream = fs.createReadStream(inputFile);
    rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
  } else {
    console.error(`File not found: ${inputFile}`);
    process.exit(1);
  }
} else {
  // Read from stdin
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });
}

rl.on("line", (line: string) => {
  if (line.trim()) {
    parser.parse(line);
  }
});
