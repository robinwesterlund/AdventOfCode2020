import * as fs from "fs";
const input = fs.readFileSync("input/3.txt", "utf-8");

const AoCD3_1 = (lines: string[]): number => {
  return ct(lines, 3, 1);
};

const AoCD3_2 = (lines: string[]): number => {
  return (
    ct(lines, 1, 1) *
    ct(lines, 3, 1) *
    ct(lines, 5, 1) *
    ct(lines, 7, 1) *
    ct(lines, 1, 2)
  );
};

const ct = (lines: string[], right: number, down: number) => {
  let r = right,
    d = down,
    t = 0,
    l = lines[0].length;

  while (d < lines.length) {
    if (lines[d][r % l] === "#") t++;
    r += right;
    d += down;
  }

  return t;
};

const lines = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD3_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD3_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
