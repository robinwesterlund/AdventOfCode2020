import * as fs from "fs";
const input = fs.readFileSync("input/9.txt", "utf-8");
const AoCD9_1 = (nums: number[]): number => {
  const preLength = 25;
  for (let i = preLength; i < nums.length; i++) {
    const pre = nums.slice(i - preLength, i);
    let success = false;
    for (let j = 0; j < preLength && !success; j++) {
      if (pre.findIndex((v) => v + pre[j] === nums[i]) !== -1) success = true;
    }
    if (!success) return nums[i];
  }
  return -1;
};

const AoCD9_2 = (nums: number[]): number => {
  const invNum = 542529149;

  for (let i = 0; i < nums.length; i++) {
    let j = i,
      sum = 0;
    while (sum < invNum) {
      sum += nums[j];
      j++;
    }
    if (sum === invNum) {
      const numSlice = nums.slice(i, j).sort((a, b) => a - b);
      return numSlice[0] + numSlice[numSlice.length - 1];
    }
  }
  return -1;
};

const nums = input.split("\n").map((e) => parseInt(e));

const now1 = new Date().getMilliseconds();
const solution1 = AoCD9_1(nums);
const elapsed1 = new Date().getMilliseconds() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = new Date().getMilliseconds();
const solution2 = AoCD9_2(nums);
const elapsed2 = new Date().getMilliseconds() - now2;

console.log(solution2, elapsed2 + "ms");
