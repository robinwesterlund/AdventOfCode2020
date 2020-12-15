const input = `17,1,3,16,19,0`;

const AoCD15_1 = (data: number[]): number => {
  let numbers: number[] = [];
  let spoken = 0;
  data.forEach((n, i) => {
    numbers.push(n);
    spoken++;
  });

  while (spoken < 2020) {
    const last = spoken - 1;
    let now = 0;
    const slice = numbers.slice(0, last);
    if (slice.find((n) => n === numbers[last]) !== undefined) {
      const mostRecentReverse = slice.lastIndexOf(numbers[last]);
      now = spoken - (mostRecentReverse + 1);
    }
    numbers.push(now);
    spoken++;
  }
  return numbers[numbers.length - 1];
};

const AoCD15_2 = (data: number[]): number => {
  let numbers: number[] = [];
  let lastIndexes = { "0": 1, "3": 2 };
  let spoken = 0;
  data.forEach((n) => {
    numbers.push(n);
    spoken++;
    lastIndexes[n] = spoken;
  });

  while (spoken < 30000000) {
    const last = spoken - 1;
    const beforeLast = spoken - 2;
    const num = numbers[last];
    
    lastIndexes[numbers[beforeLast]] = last;
    const lastIndex = lastIndexes[num];
    let now = 0;

    if (lastIndex) {
      now = spoken - lastIndex;
    }

    numbers.push(now);

    spoken++;
  }
  return numbers[numbers.length - 1];
};

const lines = input.split(",").map((i) => {
  return parseInt(i);
});

const now1 = Date.now();
const solution1 = AoCD15_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD15_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
