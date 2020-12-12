import * as fs from "fs";
const input = fs.readFileSync("input/12.txt", "utf-8");
// const input = `F10
// N3
// F7
// R90
// F11`;

interface vec {
  x: number;
  y: number;
}

const acts = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

const rotate = (d: vec, a: string, degs: number): vec => {
  let ang = (Math.PI * degs) / 180.0;
  if (a === "R") ang = -ang;
  let ca = Math.cos(ang);
  let sa = Math.sin(ang);
  return {
    x: Math.round(d.x * ca - d.y * sa),
    y: Math.round(d.x * sa + d.y * ca),
  };
};

const AoCD12_1 = (data: string[]): number => {
  let pos: vec = { x: 0, y: 0 };
  let dir: vec = { x: 1, y: 0 };
  data.forEach((d) => {
    let act = d[0];
    let val = parseInt(d.substr(1));
    if (act === "L" || act === "R") {
      dir = rotate(dir, act, val);
      return;
    }
    const mvmtDir: vec =
      act === "F" ? dir : { x: acts[act][0], y: acts[act][1] };
    pos = {
      x: pos.x + mvmtDir.x * val,
      y: pos.y + mvmtDir.y * val,
    };
  });

  return Math.abs(pos.x) + Math.abs(pos.y);
};

const AoCD12_2 = (data: any): number => {
  let wpt: vec = { x: 10, y: 1 };
  let pos: vec = { x: 0, y: 0 };
  data.forEach((d) => {
    const act = d[0];
    const val = parseInt(d.substr(1));
    if (act === "L" || act === "R") wpt = rotate(wpt, act, val);
    else if (act === "F")
      pos = {
        x: pos.x + wpt.x * val,
        y: pos.y + wpt.y * val,
      };
    else
      wpt = {
        x: wpt.x + val * acts[act][0],
        y: wpt.y + val * acts[act][1],
      };
  });

  return Math.abs(pos.x) + Math.abs(pos.y);
};

const lines = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD12_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD12_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
