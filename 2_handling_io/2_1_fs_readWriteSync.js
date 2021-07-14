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

// 파일이 없으면 `Error: ENOENT: no such file or directory, open` 에러 발생
// 미리 파일 생성: echo Hello World! > 2_fs_readWriteSync.txt
const processCwd = process.cwd();
console.log('processCwd: ', processCwd); // Current Working Directory 경로를 가져온다
const filePath = path.join(process.cwd(), '2_1_fs_readWriteSync.txt'); // 모든 인자를 합치고 Unix에서는 `/`, 윈도우에서는 `\` 등 구분자로 경로를 정규화한다
const contents = fs.readFileSync(filePath, 'utf-8'); // 파일 경로 및 인코딩 타입 전달. 인코딩은 옵션이며, 없으면 Buffer 오브젝트 반환.
console.log('File contents: ', contents); // File contents:  Hello World
const upperContents = contents.toUpperCase();
// $ cat 2_fs_readWriteSync.txt
// HELLO WORLD!
fs.writeFileSync(filePath, upperContents);
console.log(`${filePath} updated`);
/**
 * `readFileSync`과 `writeFileSync`는 동기적이며, 파일 읽기/쓰기가 끝날 때까지 동시 작업(concurrent)이 차단 또는 지연된다
 * blocking을 막으려면 비동기적인 함수를 사용
 * `async/await`, `Promise` 및 `callback`을 활용하여 비동기적으로 상요할 수 있다
 */
