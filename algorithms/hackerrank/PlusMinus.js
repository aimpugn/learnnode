// https://www.hackerrank.com/challenges/plus-minus/problem?isFullScreen=true
// 양수, 음수, 0인 요소의 비율을 계산
// precision(정확도) 문제도 있다. 소수점 6번째자리까지

function plusMinus(arr) {
  let denominator = arr.length;
  let plus = 0;
  let minus = 0;
  let zero = 0;
  arr.forEach((el) => {
    if (el > 0) {
      plus++;
    } else if (el < 0) {
      minus++;
    } else if (el == 0) {
      zero++;
    }
  });
  console.log(div(plus, denominator));
  console.log(div(minus, denominator));
  console.log(div(zero, denominator));
}

function div(numerator, denominator, options) {
  if (denominator == 0) return Infinity;
  let positive = denominator > 0;
  let sign = "";
  if (!positive) {
    denominator = ~denominator + 1;
    sign = "-";
  }
  let rounds = options?.rounds ?? true;
  let precision = options?.precision ?? 6;
  if (rounds) {
    precision++;
  }
  // 정수부
  let integerPart;
  [integerPart, numerator] = getQuotientAndRemainder(numerator, denominator);

  // 소수부
  let decimalParts = [];
  while (precision > 0) {
    let decimalPart = 0;
    if (numerator > 0) {
      [decimalPart, numerator] = getQuotientAndRemainder(
        (numerator *= 10),
        denominator
      );
    }
    decimalParts.push(decimalPart);
    precision--;
  }
  // 반올림
  if (rounds) {
    let lastOfDecimal = decimalParts.pop();
    if (lastOfDecimal >= 5) {
      let carry = 1;
      for (let i = decimalParts.length - 1; i >= 0; i--) {
        decimalParts[i] += carry;
        [carry, decimalParts[i]] = getQuotientAndRemainder(decimalParts[i], 10);
        if (carry == 0) {
          break;
        }
      }

      // 소수점 이하에서 올라가는 올림수가 있으면 정수부에 더한다
      if (carry > 0) {
        integerPart += carry;
      }
    }
  }

  return `${sign}${integerPart}.${decimalParts.join("")}`;
}

// quotient(몫)과 remainder(나머지) 반환
function getQuotientAndRemainder(numerator, denominator) {
  let quotient = 0;
  while (numerator >= denominator) {
    numerator -= denominator;
    quotient++;
  }
  return [quotient, numerator];
}

// plusMinus([-4, 3, -9, 0, 4, 1]);
console.log(div(11, 4, { precision: 1, rounds: true })); // 0.28
console.log(div(0, 10)); // 0.000000
console.log(div(10, 0)); // Infinity
console.log(div(10, -1)); // -10.000000
console.log(div(10, -11)); // -0.909091, 반올림한 상태
console.log(div(999999999999, 10000000)); // 100000.000000
console.log(div(1000, 4)); // 250.000000
