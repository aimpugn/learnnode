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

const processCwd = process.cwd();
const filePath = path.join(processCwd, '2_fs_readWriteSync.txt'); // 모든 인자를 합치고 Unix에서는 `/`, 윈도우에서는 `\` 등 구분자로 경로를 정규화한다

fs.readFile(filePath, 'utf8', (err, contents) => {
  if (err) {
    return console.log(err);
  }
  console.log('File Contents:', contents);
  const upperContents = contents.toUpperCase();
  fs.writeFileSync(filePath, upperContents);
  console.log(`${upperContents} updated`);

  return true;
});
