import { loadInput } from "@util/main";

// Parse phase
const input = loadInput(__dirname).join("");

// We're looking for patterns following mul(X,Y)
const mul_regex = /mul\((\d+),(\d+)\)/gm;

let mul_sum = 0;

let match: any;
while (null != (match = mul_regex.exec(input))) {
  const x = (n: number) => Number.parseInt(match[n]);
  mul_sum += x(1) * x(2);
}

console.log("Part 1:", mul_sum);

// Part 2

const new_regex = /(mul|do|don't)\((?:(\d+),(\d+))?\)/gm;
mul_sum = 0;
let allow_mul = true;

while (null != (match = new_regex.exec(input))) {
  const x = (n: number) => Number.parseInt(match[n]);

  switch (match[1]) {
    case "do":
      allow_mul = true;
      break;
    case "don't":
      allow_mul = false;
      break;
    case "mul":
      if (allow_mul) {
        mul_sum += x(2) * x(3);
      }
      break;
  }
}

console.log("Part 2:", mul_sum);
