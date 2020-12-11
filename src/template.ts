import * as fs from "fs";
const input = fs.readFileSync("input/DayNumber.txt", "utf-8");

const AoCDDayNumber_1 = (data: any): number => {
  return -1;
};

const AoCDDayNumber_2 = (data: any): number => {
  return -1;
};

const lines = input.split("\n");

const now1 = new Date().getMilliseconds();
const solution1 = AoCDDayNumber_1(lines);
const elapsed1 = new Date().getMilliseconds() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = new Date().getMilliseconds();
const solution2 = AoCDDayNumber_2(lines);
const elapsed2 = new Date().getMilliseconds() - now2;

console.log(solution2, elapsed2 + "ms");
