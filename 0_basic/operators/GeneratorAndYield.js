// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator

import readline from "readline";

async function* questions() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let query;
  try {
    while (true) {
      query = yield new Promise((resolve) => {
        if (query) {
          rl.question(query, resolve); // readline으로 입력된 값을 resolve해서 반환
        } else {
          resolve(null); // 처음 yield로 이동 시(generator.next();)에 query가 비어 있으므로 null로 resolve
        }
      });
    }
  } finally {
    rl.close();
  }
}

async function run() {
  let loopCnt = 0;
  const generator = questions();
  // Generator 오브젝트 생성 시 초기 파라미터를 넘기는 경우와 넘기지 않는 경우가 있다
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*#passing_arguments_into_generators
  generator.next(); // 초기 파라미터 넘기지 않으면, `next()`사용해서 초기 yield까지 한번 이동하게 해야 한다
  let generated = await generator.next(`${loopCnt++}번째 질문\n`);
  console.log("Outside of while, first generated", generated);
  while (generated.done === false) {
    generated = await generator.next(`${loopCnt++}번째 질문\n`);
    console.log("Inside of while", generated);
    if (loopCnt == 3) {
      generator.return();
      break;
    }
  }
}

run();
