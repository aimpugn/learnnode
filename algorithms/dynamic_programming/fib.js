function fib_memoization(num, memo) {
  if (num <= 1) return num;
  if (memo.hasOwnProperty(num)) return memo[num];

  memo[num] = fib_memoization(num - 1, memo) + fib_memoization(num - 2, memo);

  return memo[num];
}

function fib_tabulation(num) {
  const table = {};
  table[0] = 0;
  table[1] = 1;
  for (let i = 2; i < num + 1; i++) {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[num];
}

console.log("fib_memoization", fib_memoization(10, {}));
console.log("fib_tabulation", fib_tabulation(10));
