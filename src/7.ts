import * as fs from "fs";
const input = fs.readFileSync("input/7.txt", "utf-8");
interface parsedRule {
  color: string;
  contains: {
    color: string;
    amount: number;
  }[];
}

const parseRules = (rules: string[]) => {
  const parsedRules: parsedRule[] = rules.map((rule) => {
    const words = rule.split(" ");
    const bagColor = words[0] + words[1];
    const ruleObj: parsedRule = {
      color: bagColor,
      contains: [] as { color: string; amount: number }[],
    };

    if (words.length > 7) {
      ruleObj.contains.push({
        color: words[5] + words[6],
        amount: parseInt(words[4]),
      });

      rule
        .split(", ")
        .slice(1)
        .forEach((r) => {
          const moreWords = r.split(" ");
          ruleObj.contains.push({
            color: moreWords[1] + moreWords[2],
            amount: parseInt(moreWords[0]),
          });
        });
    }
    return ruleObj;
  });
  return parsedRules;
};

const cache: any = {};
const hasGold = (rule: parsedRule, parsedRules: parsedRule[]): boolean => {
  if (cache[rule.color]) return cache[rule.color];
  for (let bag of rule.contains) {
    if (bag.color === "shinygold") {
      return true;
    }
    const found = parsedRules.find((r) => bag.color === r.color);
    if (hasGold(found, parsedRules)) {
      cache[found.color] = true;
      return true;
    }
  }
  cache[rule.color] = false;
  return false;
};

const requiredBags = (rule: parsedRule, rules: parsedRule[]): number => {
  let sum = 0;

  for (let r of rule.contains) {
    const containedRule = rules.find((bag) => r.color === bag.color);
    sum += r.amount;
    sum += r.amount * requiredBags(containedRule, rules);
  }
  return sum;
};

const AoCD7_1 = (rules: string[]): number => {
  const parsedRules = parseRules(rules);
  let goldBagHolders = 0;

  parsedRules.forEach((rule) => {
    if (hasGold(rule, parsedRules)) goldBagHolders++;
  });

  return goldBagHolders;
};

const AoCD7_2 = (rules: string[]): number => {
  const parsedRules = parseRules(rules);
  const goldenRule = parsedRules.find((pr) => pr.color === "shinygold");
  const amount = requiredBags(goldenRule, parsedRules);
  return amount;
};

const lines = input.split("\n");

const now1 = Date.now();
const solution1 = AoCD7_1(lines);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD7_2(lines);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
