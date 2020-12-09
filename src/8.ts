import * as fs from "fs";
const input = fs.readFileSync("input/8.txt", "utf-8");
const AoCD8_1 = (cmds: string[]): number => {
  let acc = 0;
  let i = 0;
  const cmdCopy = [...cmds];
  while (i < cmdCopy.length) {
    const parts = cmdCopy[i].split(" ");
    cmdCopy[i] = "x" + cmdCopy[i];
    if (parts[0][0] === "x") break;
    if (parts[0] === "acc") acc += parseInt(parts[1]);
    i += parts[0] === "jmp" ? parseInt(parts[1]) : 1;
  }
  return acc;
};

const AoCD8_2 = (cmds: string[]): number => {
  const nopjmp = cmds
    .map((c, index) => {
      if (c.split(" ")[0] === "nop" || c.split(" ")[0] === "jmp") {
        return index;
      }
      return -1;
    })
    .filter((e) => {
      return e !== -1;
    });

  for (let idx of nopjmp) {
    let acc = 0;
    const cmdCopy = [...cmds];
    cmdCopy[idx] = cmdCopy[idx].split(" ")[0] === "nop" ? "jmp" : "nop";
    let i = 0;
    while (i < cmdCopy.length) {
      const parts = cmdCopy[i].split(" ");
      cmdCopy[i] = "x" + cmdCopy[i];
      if (parts[0][0] === "x") break;
      if (parts[0] === "acc") acc += parseInt(parts[1]);
      i += parts[0] === "jmp" ? parseInt(parts[1]) : 1;
    }
    if (i >= cmdCopy.length) return acc;
  }
  return -1;
};

const cmds = input.split("\n");

const now1 = new Date().getMilliseconds();
const solution1 = AoCD8_1(cmds);
const elapsed1 = new Date().getMilliseconds() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = new Date().getMilliseconds();
const solution2 = AoCD8_2(cmds);
const elapsed2 = new Date().getMilliseconds() - now2;

console.log(solution2, elapsed2 + "ms");
