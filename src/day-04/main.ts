import { loadInput } from "@util/main";

// Parse phase
const input = loadInput(__dirname).map((line) => line.split(""));

const dirs: [number, number][] = [
  [0, -1], // UP
  [-1, 0], // LEFT
  [0, 1], // DOWN
  [1, 0], // RIGHT
  [-1, -1], // UP-LEFT
  [1, -1], // UP-RIGHT
  [1, 1], // DOWN-RIGHT
  [-1, 1], // DOWN-LEFT
];

function outOfBounds(x: number, y: number): boolean {
  return x < 0 || y < 0 || x >= input[0].length || y >= input.length;
}

// Part 1

function isXmasInDir(
  [x, y]: [number, number],
  [dx, dy]: [number, number],
): boolean {
  let str = "X";

  for (let i = 1; i < 4; i++) {
    if (outOfBounds(x + i * dx, y + i * dy)) return false;
    str += input[y + i * dy][x + i * dx];
  }

  return str == "XMAS";
}

let num_xmas = 0;

input.forEach((line, y) =>
  line.forEach((char, x) => {
    if (char != "X") return;

    dirs.forEach((dir) => {
      if (isXmasInDir([x, y], dir)) num_xmas++;
    });
  }),
);

console.log("Part 1:", num_xmas);

// Part 2
const diagonnals = dirs.slice(4);

function isXMas(x: number, y: number): boolean {
  let corners = "";

  // Step 1 get adjacent corners
  for (let [dx, dy] of diagonnals) {
    if (outOfBounds(x + dx, y + dy)) return false;
    corners += input[y + dy][x + dx];
  }

  // Step 2

  // Counts occurences of given pattern
  const occ = (regex: RegExp) => (corners.match(regex) || []).length;

  // XMAS if the corners are : 2M + 2S AND there is a sequence of MM and/or SS (for the MAS to be diagonnal)
  return (
    occ(/M/g) == 2 && occ(/S/g) == 2 && (occ(/MM/g) == 1 || occ(/SS/g) == 1)
  );
}

num_xmas = 0;
input.forEach((line, y) =>
  line.forEach((char, x) => {
    if (char != "A") return;

    if (isXMas(x, y)) num_xmas++;
  }),
);

console.log("Part 2:", num_xmas);
