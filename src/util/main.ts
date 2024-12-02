import { readFileSync } from "fs";
import path from "path";

export function loadInput(dir: string, test: boolean = false): string[] {
  return readFileSync(
    path.join(dir, `input${test ? ".test" : ""}.secret`),
    "utf-8",
  )
    .trim()
    .replace(/(\r\n|\n|\r)/gm, "\n")
    .split("\n");
}

export function sum(arr: number[]): number {
  return arr.reduce((prev, x) => prev + x, 0);
}
