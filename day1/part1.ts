import * as fs from "node:fs";

const calculateDifference = (filename: string): number => {
  return fs
    .readFileSync(`${__dirname}/${filename}`, "utf-8")
    .split("\n")
    .map((line: string) =>
      line
        .split("   ")
        .map((part) => Number(part)),
    )
    .reduce(
      (acc: number[][], line: number[]) => [
        [...acc[0], line[0]],
        [...acc[1], line[1]],
      ],
      [[], []],
    )
    .map((list: number[]) => list.sort())
    .reduce((acc: number[], list: number[]) => {
      if (acc.length === 0) {
        return [...list];
      } else {
        return list.map((elem, i) => Math.abs(elem - acc[i]));
      }
    }, [])
    .reduce((acc: number, elem: number) => acc + elem, 0);
};

console.log(calculateDifference("example.txt"));
console.log(calculateDifference("part1.txt"));
