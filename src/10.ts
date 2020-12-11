import * as fs from "fs";
const input = fs.readFileSync("input/10.txt", "utf-8");

const AoCD10_1 = (data: number[]): number => {
  const sorted = data.sort((a, b) => a - b);
  let diff1 = 0,
    diff3 = 1;
  if (sorted[0] === 1) diff1++;
  else if (sorted[0] === 3) diff3++;
  for (let i = 0; i < sorted.length; i++) {
    const diff = sorted[i + 1] - sorted[i];
    if (diff === 1) diff1++;
    else if (diff === 3) diff3++;
  }
  return diff1 * diff3;
};

const cache: any = {};
const traverse = (data: number[], joltage: number) => {
  if (joltage === data[data.length - 1]) {
    return 1;
  }
  if (cache[joltage]) return cache[joltage];
  let result = 0;
  let paths = 0;
  if (data.find((v) => v === joltage + 1)) {
    paths = traverse(data, joltage + 1);
    result += paths;
    cache[joltage + 1] = paths;
  }
  if (data.find((v) => v === joltage + 2)) {
    paths = traverse(data, joltage + 2);
    result += paths;
    cache[joltage + 2] = paths;
  }
  if (data.find((v) => v === joltage + 3)) {
    paths = traverse(data, joltage + 3);
    result += paths;
    cache[joltage + 3] = paths;
  }
  return result;
};
const AoCD10_2 = (data: number[]): number => {
  const sorted = [0, ...data.sort((a, b) => a - b)];
  sorted.push(sorted[sorted.length - 1] + 3);

  return traverse(sorted, 0);
};

const adapters = input.split("\n").map((i) => {
  return parseInt(i);
});

const now1 = Date.now();
const solution1 = AoCD10_1(adapters);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD10_2(adapters);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
