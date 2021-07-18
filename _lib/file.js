import fs from 'fs';

function upsertFile(filePath, contents) {
  if (!fs.existsSync(filePath)) {
    /* https://eslint.org/docs/rules/no-param-reassign
    if (!contents) {
      contents = '';  // 함수 매개변수에 값을 할당하는 것은 좋지 않다
    } */
    const contentsTmp = contents || '';

    /**
     * https://nodejs.dev/learn/working-with-file-descriptors-in-nodejs
     * - `fd(file descriptor)`은 파일을 열면 반환되는 정수값
     * - `openSync`는 콜백 함수를 호출하는 대신 `fd` 값을 반환하고, `fd` 값으로 나머지 동작을 수행할 수 있다
     */
    const fd = fs.openSync(filePath, 'w');
    fs.writeSync(fd, contentsTmp);
    fs.closeSync(fd);
    /**
     * 결과
     * $ cat 2_2_fs_readWriteAsync.txt
     * Fill out empty file automatically
     */
    return 'created';
  }

  return 'already exist';
}

function getFileMetadata(filePath) {
  return fs.statSync(filePath);
}

export { upsertFile, getFileMetadata };
