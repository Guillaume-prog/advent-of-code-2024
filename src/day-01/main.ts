import { loadInput, sum } from "@util/main";

// Parse phase
const input = loadInput(__dirname).map((line) =>
  line.split(/\s+/g).map((el) => Number.parseInt(el)),
);

const left_list: number[] = [];
const right_list: number[] = [];

input.forEach((parsed_line) => {
  left_list.push(parsed_line[0]);
  right_list.push(parsed_line[1]);
});

// Part 1

const sorted_left = left_list.sort();
const sorted_right = right_list.sort();

const distances: number[] = [];
sorted_left.forEach((val, i) =>
  distances.push(Math.abs(val - sorted_right[i])),
);
const solution_part_1 = sum(distances);

console.log("Part 1:", solution_part_1);

// Part 2
const occurences = left_list.map(
  (val) => val * right_list.filter((x) => x == val).length,
);
const solution_part_2 = sum(occurences);

console.log("Part 2:", solution_part_2);
