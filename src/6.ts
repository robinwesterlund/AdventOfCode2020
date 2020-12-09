import * as fs from "fs";
const input = fs.readFileSync("input/6.txt", "utf-8");
const AoCD6_1 = (answers: string[]): number => {
  let sum = 0;
  answers.forEach((answer) => {
    answer = answer.replace(/\n/g, "");

    for (let i = 0; i < answer.length; i++) {
      const letter = answer[i];
      const regex = new RegExp(letter, "g");
      answer = letter + answer.replace(regex, "");
    }

    sum += answer.length;
  });

  return sum;
};

const AoCD6_2 = (answers: string[]): number => {
  let sum = 0;
  answers.forEach((answer) => {
    const split = answer.split("\n");
    const firstAns = split[0];
    let matches = 0;

    for (let i = 0; i < firstAns.length; i++) {
      let matching = 0;

      for (let j = 1; j < split.length; j++) {
        const currentAns = split[j];
        if (currentAns.search(firstAns[i]) === -1) break;
        matching++;
      }

      if (matching === split.length - 1) matches++;
    }

    sum += matches;
  });

  return sum;
};

const answers = input.split("\n\n");

const now1 = new Date().getMilliseconds();
const solution1 = AoCD6_1(answers);
const elapsed1 = new Date().getMilliseconds() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = new Date().getMilliseconds();
const solution2 = AoCD6_2(answers);
const elapsed2 = new Date().getMilliseconds() - now2;

console.log(solution2, elapsed2 + "ms");
