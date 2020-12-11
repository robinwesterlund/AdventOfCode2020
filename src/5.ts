import * as fs from "fs";
const input = fs.readFileSync("input/5.txt", "utf-8");
const getIdsSortedDesc = (passes: string[]): number[] => {
  let ids: number[] = [];

  passes.forEach((pass) => {
    const binaryRow = pass.substr(0, 7).replace(/B/g, "1").replace(/F/g, "0");
    const row = parseInt(binaryRow, 2);

    const binaryCol = pass.substr(7).replace(/R/g, "1").replace(/L/g, "0");
    const col = parseInt(binaryCol, 2);

    const id = row * 8 + col;
    if (!id) console.log(binaryRow, binaryCol);

    ids.push(row * 8 + col);
  });

  ids.sort((a, b) => {
    return b - a;
  });

  return ids;
};

const AoCD5_1 = (passes: string[]): number => {
  const ids = getIdsSortedDesc(passes);
  return ids[0];
};

const AoCD5_2 = (passes: string[]): number => {
  const ids = getIdsSortedDesc(passes);

  for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i] - 1 !== ids[i + 1]) return ids[i] - 1;
  }

  return -1;
};

const passes = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD5_1(passes);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD5_2(passes);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
