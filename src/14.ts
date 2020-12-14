import * as fs from "fs";
const input = fs.readFileSync("input/14.txt", "utf-8");
const maskLen = 36;

const replaceChar = (str: string, i: number, c: string) => {
  return str.substr(0, i) + c + str.substr(i + 1);
};

const AoCD14_1 = (data: string[]): number => {
  let mask = "".padEnd(maskLen, "X");
  let mem = {};
  for (let line of data) {
    const segs = line.split(" ");
    if (line.startsWith("mem")) {
      let bin = parseInt(segs[2]).toString(2);
      bin = bin.padStart(maskLen, "0");
      for (let i = 0; i < bin.length; i++) {
        if (mask[i] !== "X") bin = replaceChar(bin, i, mask[i]);
      }
      mem[segs[0]] = parseInt(bin, 2);
    } else {
      mask = segs[2];
    }
  }
  let sum = 0;
  Object.values(mem).forEach((m) => (sum += m as any));
  return sum;
};

const AoCD14_2 = (data: string[]): number => {
  let mask = "".padEnd(maskLen, "X");
  let mem = {};
  for (let line of data) {
    const segs = line.split(" ");
    if (line.startsWith("mem")) {
      let bin = parseInt(segs[0].substring(4, segs[0].length - 1)).toString(2);
      bin = bin.padStart(maskLen, "0");
      let floatIdx: number[] = [];
      for (let i = 0; i < bin.length; i++) {
        if (mask[i] === "0") continue;
        else if (mask[i] === "X") floatIdx.push(i);
        bin = replaceChar(bin, i, mask[i]);
      }
      for (let i = 0; i < 2 ** floatIdx.length; i++) {
        let maskI = "".padEnd(maskLen, "0");
        let binI = i.toString(2);
        binI = binI.padStart(maskLen, "0");
        floatIdx.forEach((idx, j) => {
          maskI = replaceChar(maskI, idx, binI[maskLen - j - 1]);
        });
        floatIdx.forEach((idx) => {
          bin = replaceChar(bin, idx, maskI[idx]);
        });
        mem[bin] = parseInt(segs[2]);
      }
    } else {
      mask = segs[2];
    }
  }
  let sum = 0;
  Object.values(mem).forEach((m) => (sum += m as any));
  return sum;
};

const lines = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD14_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD14_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
