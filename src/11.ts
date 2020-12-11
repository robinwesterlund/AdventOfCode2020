import * as fs from "fs";
const input = fs.readFileSync("input/11.txt", "utf-8");

const adj = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const replaceAt = (str: string, index: number, replacement: string) => {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
};

const checkDirectionOcc = (
  rows: string[],
  i_x: number,
  i_y: number,
  x: number,
  y: number
) => {
  let i = 1;
  let char = "";
  if (rows[i_x + i * x] && rows[i_x + i * x][i_y + i * y]) {
    char = rows[i_x + i * x][i_y + i * y];
  }
  while (char) {
    if (char === "#") return true;
    else if (char === "L") break;
    i++;
    if (!rows[i_x + i * x]) break;
    char = rows[i_x + i * x][i_y + i * y];
  }
  return false;
};

const AoCD11_1 = (rows: string[]): number => {
  let copy = [...rows];
  let post = [...rows];
  while (true) {
    let test = [...post];
    let totalOcc = 0;
    for (let i = 0; i < post.length; i++) {
      for (let j = 0; j < post[0].length; j++) {
        if (post[i][j] === ".") continue;
        if (post[i][j] === "#") totalOcc++;
        let occ = 0;
        adj.forEach((v) => {
          if (post[i + v[0]] && post[i + v[0]][j + v[1]] === "#") occ++;
        });
        if (occ === 0 && post[i][j] === "L")
          test[i] = replaceAt(test[i], j, "#");
        else if (occ >= 4 && post[i][j] === "#")
          test[i] = replaceAt(test[i], j, "L");
      }
    }
    post = [...test];
    if (post.find(p => copy.find(f => p === f) === undefined) === undefined) return totalOcc;
    //if (JSON.stringify(post) === JSON.stringify(copy)) return totalOcc;
    copy = [...post];
  }
};

const AoCD11_2 = (rows: string[]): number => {
  let copy = [...rows];
  while (true) {
    let test = [...copy];
    let totalOcc = 0;
    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy[0].length; j++) {
        let char = copy[i][j];
        if (char === ".") continue;
        else if (char === "#") totalOcc++;
        let occ = 0;
        adj.forEach((v) => {
          if (checkDirectionOcc(copy, i, j, v[0], v[1])) occ++;
        });
        if (occ === 0 && char === "L")
          test[i] = replaceAt(test[i], j, "#");
        else if (occ >= 5 && char === "#")
          test[i] = replaceAt(test[i], j, "L");
      }
    }
    if (test.find(p => copy.find(f => p === f) === undefined) === undefined) return totalOcc;
    copy = [...test];
  }
};

const lines = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD11_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD11_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
