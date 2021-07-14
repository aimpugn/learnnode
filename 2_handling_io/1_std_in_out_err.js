/**
 * I/O 관련 글로벌 프로세스 오브젝트
 * process.stdin 입력 채널
 * process.stdout 출력 채널
 * process.stderr 에러 채널
 */
process.stdin.on('data', (data) => { // 데이터 이벤트를 listen.
  // data는 Buffer 오브젝트 반환
  // Buffer 오브젝트는 입력 값의 이진 표현 반환
  const dataString = data.toString().trim(); // Buffer 오브젝트를 문자열로 변환 후 trim()으로 개행 문자 제거
  if (dataString !== '') {
    process.stdout.write(`echo ${dataString}\n`); // STDOUT으로 쓰기. `console.log`에서도 사용.
  } else {
    process.stderr.write('no data\n'); // STDERR로 쓰기. `console.err`에서도 사용.
  }
  // `CTRL + C`는 Node.js 프로세스에 `SIGINT(signal interrupt)` 신호를 보낸다
  // https://nodejs.org/api/process.html#process_signal_events 참조
});
