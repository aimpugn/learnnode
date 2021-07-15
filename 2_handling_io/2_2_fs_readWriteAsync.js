// 내장 모듈 `fs`와 `path`를 불러온다
/**
 * File System module:
 * - https://nodejs.org/api/fs.html
 * - 파일 시스템과 상호작용하는 API 제공
 */
import fs from 'fs';
/**
 * Path module:
 * - https://nodejs.org/api/path.html
 * - 파일과 디렉토리 경로 관련 작업하는 API 제공
 */
import path from 'path';
import fsPrmises from 'fs/promises';
import { async } from 'regenerator-runtime';

const processCwd = process.cwd();
const filePath = path.join(processCwd, '2_2_fs_readWriteAsync.txt'); // 모든 인자를 합치고 Unix에서는 `/`, 윈도우에서는 `\` 등 구분자로 경로를 정규화한다

// ============================ 파일 없으면 생성 시작 ============================
if (!fs.existsSync(filePath)) {
  /**
   * https://nodejs.dev/learn/working-with-file-descriptors-in-nodejs
   * - `fd(file descriptor)`은 파일을 열면 반환되는 정수값
   * - `openSync`는 콜백 함수를 호출하는 대신 `fd` 값을 반환하고, `fd` 값으로 나머지 동작을 수행할 수 있다
   */
  const fd = fs.openSync(filePath, 'w');
  fs.writeSync(fd, 'Fill out empty file automatically');
  fs.closeSync(fd);
  /**
   * 결과
   * $ cat 2_2_fs_readWriteAsync.txt
   * Fill out empty file automatically
   */
}
// ============================ 파일 없으면 생성 끝 ============================

// ============================ 콜백 파일 읽고 쓰기 시작 ============================
function callbackHell() {
  fs.readFile(filePath, 'utf8', (errRead, contents) => { // 비동기 파일 읽기
    if (errRead) {
      return console.log(errRead);
    }
    console.log('File contents: ', contents);
    const upperContents = contents.toUpperCase();

    fs.writeFile(filePath, upperContents, (errWrite) => { // 비동기 파일 쓰기
      if (errWrite) {
        throw errWrite;
      }
      console.log(`${filePath} updated`);
    });

    return true;
  });
}
// ============================ 콜백 파일 읽고 쓰기 끝 ============================

// ============================ 콜백 분리하여 파일 읽고 쓰기 시작 ============================
/**
 * callback hell을 피하기 위해 유명(이름 있는) 함수로 콜백을 분리
 * @param {String} pathToFile
 * @param {String} contentsToUpdate
 */
function updateFile(pathToFile, contentsToUpdate) {
  fs.writeFile(pathToFile, contentsToUpdate, (err) => {
    if (err) {
      throw err;
    }
    console.log(`${pathToFile} updated with ${contentsToUpdate}`);
  });
}

function modCallbakHell1() {
  fs.readFile(filePath, 'utf8', (readErr, readContents) => {
    if (readErr) {
      throw readErr;
    }
    console.log('readContents: ', readContents);
    updateFile(filePath, readContents.toLocaleLowerCase());

    return true;
  });
}
// ============================ 콜백 분리하여 파일 읽고 쓰기 끝 ============================

// ============================ Promise 사용하여 파일 읽고 쓰기 1 시작 ============================
/**
 * https://nodejs.org/dist/latest/docs/api/fs.html#fs_promise_example
 * https://nodejs.org/dist/latest/docs/api/fs.html#fs_promises_api
 * https://nodejs.dev/learn/understanding-javascript-promises
 * - callback hellp을 피하는 다른 방법으로 Promise 사용
 */
function modCallbakHell2() {
  new Promise((resolve, reject) => { // `Pending` | `Fulfilled` | `Rejected` 셋 중 하나
    fs.readFile(filePath, 'utf8', (errWhenRead, contentsRead) => {
      if (errWhenRead) {
        reject(errWhenRead);
      }
      console.log('contentsRead: ', contentsRead);

      resolve(contentsRead);
    });
  })
    .then((data) => {
      fs.writeFile(filePath, `${data} modified with Promise and then`, (errWhenWrite) => {
        if (errWhenWrite) throw errWhenWrite;
        console.log(`${filePath} modified with Promise and then`);
      });
    });
}
// ============================ Promise 사용하여 파일 읽고 쓰기 1 끝 ============================

/** # 테스트
 * callbackHell();
 * modCallbakHell1();
 * modCallbakHell2();
 *
 * # 호출 순서
 * contentsRead:  fill out empty file automatically   // modCallbakHell2
 * File contents:  fill out empty file automatically  // callbackHell
 * readContents:  fill out empty file automatically   // modCallbakHell1
 * 2_2_fs_readWriteAsync.txt modified with Promise and then
 * 2_2_fs_readWriteAsync.txt updated
 * 2_2_fs_readWriteAsync.txt updated
 */

// ============================ 비동기 테스트 시작 ============================
/**
 * 밀리초마다 **** 출력
 */
setInterval(() => process.stdout.write('100ms\n'), 100).unref();
setInterval(() => updateFile(filePath, (Math.random() * (50 - 10) + 10).toString()), 1000);
/**
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 2_2_fs_readWriteAsync.txt updated with 16.222076940042484
 * 100ms
 * 100ms
 */
// ============================ 비동기 테스트 끝 ============================

// ============================ Promise 사용하여 파일 읽고 쓰기 2 시작 ============================
function modCallbakHell3() {
  console.log('modCallbakHell3 called');
  /**
   * `await`는 `async` 함수에서만 호출되므로, `async/await` 함수로 감싼다(ECMA TC39).
   * `async` 함수 밖에서 `await` 문법 사욜할 수 있도록 `Top-Level Await` 지원 위해
   */
  async function run() {
    try {
      const thirdContents = await fsPrmises.readFile(filePath, 'utf8');
      console.log(`modCllbackHell3 thirdContents: ${thirdContents}`);
    } catch (thirdError) {
      console.error(thirdError);
    }
  }

  run();
}
modCallbakHell3();
/** 출력
 * modCallbakHell3 called
 * modCllbackHell3 thirdContents: 16.222076940042484
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 100ms
 * 2_2_fs_readWriteAsync.txt updated with 21.918595358429506
 */
// ============================ Promise 사용하여 파일 읽고 쓰기 2 끝 ============================
