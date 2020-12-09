import * as fs from "fs";
const input = fs.readFileSync("input/2.txt", "utf-8");

const AoCD2_1 = (pwds: string[]): number => {
  let count = 0;
  for (let i = 0; i < pwds.length; i++) {
    const pwd = pwds[i];
    const policy = pwd.split(": ")[0];
    const pass = pwd.split(": ")[1];

    const letter = policy.split(" ")[1];
    const least = parseInt(policy.split(" ")[0].split("-")[0]);
    const most = parseInt(policy.split(" ")[0].split("-")[1]);

    let c_count = 0;

    for (let i = 0; i < pass.length; i++) {
      if (pass[i] === letter) {
        c_count++;
      }
    }

    if (c_count >= least && c_count <= most) {
      count++;
    }
  }
  return count;
};

const AoCD2_2 = (pwds: string[]): number => {
  let count = 0;
  for (let i = 0; i < pwds.length; i++) {
    const pwd = pwds[i];
    const policy = pwd.split(": ")[0];
    const pass = pwd.split(": ")[1];

    const letter = policy.split(" ")[1];
    const i1 = parseInt(policy.split(" ")[0].split("-")[0]);
    const i2 = parseInt(policy.split(" ")[0].split("-")[1]);

    let c_count = 0;

    if (pass[i1 - 1] === letter) c_count++;
    if (pass[i2 - 1] === letter) c_count++;

    if (c_count === 1) {
      count++;
    }
  }
  return count;
};

const pwds = input.split("\n");

const now1 = new Date().getMilliseconds();
const solution1 = AoCD2_1(pwds);
const elapsed1 = new Date().getMilliseconds() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = new Date().getMilliseconds();
const solution2 = AoCD2_2(pwds);
const elapsed2 = new Date().getMilliseconds() - now2;

console.log(solution2, elapsed2 + "ms");
