import * as fs from "fs";
const input = fs.readFileSync("input/4.txt", "utf-8");
const eye_colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const required_fields = [
  [
    "byr",
    (field: string): boolean => {
      return parseInt(field) >= 1920 && parseInt(field) <= 2020;
    },
  ],
  [
    "iyr",
    (field: string): boolean => {
      return parseInt(field) >= 2010 && parseInt(field) <= 2020;
    },
  ],
  [
    "eyr",
    (field: string): boolean => {
      return parseInt(field) >= 2020 && parseInt(field) <= 2030;
    },
  ],
  [
    "hgt",
    (field: string): boolean => {
      if (field.length < 4) return false;
      const num = parseInt(field.slice(0, -2));
      if (field.endsWith("in")) return num >= 59 && num <= 76;
      if (field.endsWith("cm")) return num >= 150 && num <= 193;
      return false;
    },
  ],
  [
    "hcl",
    (field: string): boolean => {
      const matches = /#[0-9abcdef]{6}/.exec(field);

      return matches !== null && matches[0] === field;
    },
  ],
  [
    "ecl",
    (field: string): boolean => {
      return eye_colors.findIndex((v) => v === field) !== -1;
    },
  ],
  [
    "pid",
    (field: string): boolean => {
      const matches = /[0-9]{9}/.exec(field);

      return matches !== null && matches[0] === field;
    },
  ],
];

const AoCD4_1 = (passports: string[]) => {
  let validCount = 0;
  passports.forEach((passport) => {
    let valid = true;
    required_fields.forEach((req) => {
      if (passport.search(req[0] as string) === -1) valid = false;
    });
    if (valid) validCount++;
  });
  return validCount;
};

const AoCD4_2 = (passports: string[]) => {
  let validCount = 0;
  passports.forEach((passport) => {
    let valid = true;
    required_fields.forEach((req) => {
      const idx = passport.search(req[0] as string);
      if (idx === -1) valid = false;
      let field = passport.substr(idx + 4);
      field = field.split(" ")[0];
      field = field.split("\n")[0];
      if (!(req[1] as (field: string) => boolean)(field)) valid = false;
    });
    if (valid) validCount++;
  });
  return validCount;
};

const passports = input.split("\n\n");

const now1 = Date.now();
const solution1 = AoCD4_1(passports);
const elapsed1 = Date.now() - now1;

console.log(solution1, elapsed1 + "ms");

const now2 = Date.now();
const solution2 = AoCD4_2(passports);
const elapsed2 = Date.now() - now2;

console.log(solution2, elapsed2 + "ms");
