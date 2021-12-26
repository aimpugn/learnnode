// https://www.hackerrank.com/challenges/diagonal-difference/problem?isFullScreen=true
// Diagonal? 대각선
// 매트릭스가 주어졌을 때 대각선의 차이의 절대값 구하기
// 1 2 3
// 4 5 6
// 9 8 9
// 1 + 5 + 9 = 15
// 3 + 5 + 9 = 17
// | 15 - 17 | = 2
"use strict";

import fs from "fs";

// process.stdin.resume();
// process.stdin.setEncoding("utf-8");

// let inputString = "";
// let currentLine = 0;

// process.stdin.on("data", function (inputStdin) {
//   inputString += inputStdin;
// });

// // https://stackoverflow.com/a/32494537/8562273 `CTRL + D`가 윈도우에서는 제대로 작동하지 않는다
// process.stdin.on("end", function () {
//   inputString = inputString.split("\n");

//   main();
// });

// function readLine() {
//   return inputString[currentLine++];
// }

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
  // arr: 크기가 n x n인 정사각형
  if (!Array.isArray(arr)) return;
  // left to right, right to left
  let lastIdx = arr.length - 1;
  let col = 0;
  let row = 0;
  let leftToRight = 0;
  let rightToLeft = 0;
  while (lastIdx >= 0) {
    leftToRight += arr[row][col++];
    rightToLeft += arr[row][lastIdx--];
    row++;
  }
  return Math.abs(leftToRight - rightToLeft);
}

console.log(
  diagonalDifference([
    [1, 2, 3],
    [4, 5, 6],
    [9, 8, 9],
  ])
);
console.log(
  diagonalDifference([
    [11, 2, 4],
    [4, 5, 6],
    [10, 8, -12],
  ])
);
