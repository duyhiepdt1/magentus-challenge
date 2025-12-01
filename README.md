# 🤖 Magentus Coding Challenge: Toy Robot Simulator

A TypeScript implementation of a toy robot simulator that moves on a 5×5 square tabletop.

## 📋 Description

This application simulates a toy robot moving on a square tabletop of dimensions **5 units × 5 units**.

- There are no obstructions on the table surface
- The robot is free to move around the surface, but must not fall off the table
- Any movement that would cause the robot to fall must be ignored, while valid commands should still be accepted and executed

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd magentus-challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## 💻 Usage

### Running the Application

The application can read commands from a file or standard input.

**From a file:**
```bash
npm start input.txt
```

**From standard input:**
```bash
npm start
```

Then type commands and press Enter. Press `Ctrl+D` (Unix) or `Ctrl+Z` (Windows) to finish.


## 📝 Commands

The application processes the following commands:

### `PLACE X,Y,F`

Places the robot on the table at coordinates (X, Y), facing direction F.

- **Parameters:**
  - `X`: X coordinate (0-4)
  - `Y`: Y coordinate (0-4)
  - `F`: Facing direction (`NORTH`, `SOUTH`, `EAST`, or `WEST`)
- **Origin:** (0,0) represents the south-west corner of the table
- **Rules:**
  - The first valid command must be a `PLACE` command
  - Any commands before a valid `PLACE` should be ignored
  - Additional `PLACE` commands can be used to reposition the robot

### `MOVE`

Moves the robot one unit forward in the direction it is currently facing.

### `LEFT`

Rotates the robot 90° counterclockwise without changing its position.

### `RIGHT`

Rotates the robot 90° clockwise without changing its position.

### `REPORT`

Outputs the current X, Y, and F (facing direction) of the robot.

**Output format:** `X,Y,F`

## ⚠️ Constraints

- The robot must not fall off the table
- Any move that would result in the robot falling should be ignored
- A robot not yet placed on the table should ignore all commands except `PLACE`
- Input may be provided via file or standard input

## 📊 Examples

### Example A

**Input:**

```text
PLACE 0,0,NORTH
MOVE
REPORT
```

**Output:**

```text
0,1,NORTH
```

### Example B

**Input:**

```text
PLACE 0,0,NORTH
LEFT
REPORT
```

**Output:**

```text
0,0,WEST
```

### Example C

**Input:**

```text
PLACE 1,2,EAST
MOVE
MOVE
LEFT
MOVE
REPORT
```

**Output:**

```text
3,3,NORTH
```

## 🏗️ Project Structure

```text
magentus-challenge/
├── src/
│   ├── index.ts          # Main entry point - handles file/stdin input
│   ├── Robot.ts          # Robot class - manages position and movement
│   ├── Table.ts          # Table class - validates positions (5x5 grid)
│   ├── CommandParser.ts  # Command parsing and execution logic
│   └── Direction.ts      # Direction enum and helper utilities
├── tests/
│   └── run_tests.ts      # Jest test suite
├── jest.config.js        # Jest configuration
├── dist/                 # Compiled JavaScript output
├── input.txt            # Sample input file with test commands
└── package.json
```

### Running Tests

**Run all tests:**
```bash
npm test
```


## 👤 Author

Hiep NGUYEN DUY
