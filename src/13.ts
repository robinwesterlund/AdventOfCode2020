import * as fs from "fs";
const input = fs.readFileSync("input/13.txt", "utf-8");

const AoCD13_1 = (data: string[]): number => {
  const timestamp = parseInt(data[0]);
  let buses = data[1].split(",");

  let wait = Math.pow(10, 100),
    id = 0;
  for (let i = 0; i < buses.length; i++) {
    const bus = parseInt(buses[i]);
    if (!bus) continue;

    const curr = bus - (timestamp % bus);
    if (curr < wait) {
      wait = curr;
      id = bus;
    }
  }

  return wait * id;
};

const AoCD13_2 = (data: string[]): number => {
  let buses = data[1].split(",").map((b) => {
    return parseInt(b);
  });

  let filtered: { i: number; t: number }[] = [];
  buses.forEach((b, i) => {
    if (!isNaN(b)) {
      filtered.push({ i: b, t: i });
    }
  });
  let add = filtered[0].i;
  let max = 1;
  let t = add;
  while (true) {
    t += add;
    let i = 1;
    for (i; i < filtered.length; i++) {
      const bus = filtered[i];
      if ((t + bus.t) % bus.i !== 0) break;
      else if (i === filtered.length - 1) return t;
    }
    if (i - 1 > max) {
      add *= filtered[i - 1].i;
      max = i - 1;
    }
  }
};

const lines = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD13_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD13_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
