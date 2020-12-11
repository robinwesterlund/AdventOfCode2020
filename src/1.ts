import * as fs from "fs";
const input = fs.readFileSync("input/1.txt", "utf-8");

const AoCD1_1 = (numbers: number[]): number => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) return numbers[i] * numbers[j];
    }
  }
  return -1;
};

const AoCD1_2 = (numbers: number[]): number => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020)
          return numbers[i] * numbers[j] * numbers[k];
      }
    }
  }
  return -1;
};

const nums: number[] = input.split("\n").map((n) => {
  return parseInt(n);
});

const now1 = Date.now();
const solution1 = AoCD1_1(nums);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD1_2(nums);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
