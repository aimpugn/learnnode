// https://www.hackerrank.com/challenges/a-very-big-sum/problem?isFullScreen=true
function sumBigNumbers(num1, num2) {
  let num1Arr = Array.from(String(num1), Number);
  let num2Arr = Array.from(String(num2), Number);
  let sum = "";
  let carry = 0;
  while (num1Arr.length > 0 || num2Arr.length > 0 || carry > 0) {
    const n1 = num1Arr.pop();
    const n2 = num2Arr.pop();
    let newVal = 0;
    let tmp = 0;
    if (n1 && n2) {
      tmp = n1 + carry + n2;
    } else if (n1) {
      tmp = n1 + carry;
    } else if (n2) {
      tmp = n2 + carry;
    } else {
      tmp = carry;
    }
    newVal = tmp % 10;
    carry = (tmp / 10) >>> 0;
    sum = `${newVal}${sum}`;
  }

  return sum;
}

function aVeryBigSum(ar) {
  // Write your code here
  let answer = "";
  for (let i = 0; i < ar.length; i++) {
    answer = sumBigNumbers(answer, ar[i]);
  }

  return answer;
}

console.log(
  aVeryBigSum([1000000001, 1000000002, 1000000003, 1000000004, 1000000005])
);
