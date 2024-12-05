import * as fs from "node:fs";

const calculateSimilarity = (input: string): number => {
  return fs
    .readFileSync(`${__dirname}/${input}`, "utf-8")
    .split("\n")
    .map((line) => line.split("   ").map((part) => Number(part)))
    .reduce(
      (acc: [number[], Record<number, number>], line) => [
        [...acc[0], line[0]],
        { ...acc[1], [line[1]]: (acc[1][line[1]] ?? 0) + 1 },
      ],
      [[], {}],
    )
    .reduce<number[]>(
      (acc: number[], elem, index) =>
        index === 0
          ? (elem as number[])
          : acc.map((num: number) => num * (elem[num] ?? 0)),
      [],
    )
    .reduce((acc: number, elem: number) => acc + elem, 0);
};

console.log(calculateSimilarity("example.txt"));
console.log(calculateSimilarity("part1.txt"));
