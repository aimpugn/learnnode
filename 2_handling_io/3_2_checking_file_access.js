import fs from 'fs';
import path from 'path';
/**
 * 단순히 파일이 존재하는지 확인하고 싶을 경우 다음 API 사용
 * - `fs.access()`: 액세스 하려는 파일 또는 디렉토리에 대한 사용자 권한 테스트
 * - `fs.accessSync()`
 * - 파일 액세스 관련 상수들: https://nodejs.org/api/fs.html#fs_file_access_constants
 */

const filePath = path.join(process.cwd(), process.argv[2]);

// https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback
fs.access(filePath, fs.constants.F_OK, (err) => {
  console.log(`[F_OK] ${filePath} ${err ? 'not exist' : 'exist'}`);
});

fs.access(filePath, fs.constants.R_OK, (err) => {
  console.log(`[R_OK] ${filePath} ${err ? 'not readable' : 'readable'}`);
});

fs.access(filePath, fs.constants.W_OK, (err) => {
  console.log(`[W_OK] ${filePath} ${err ? 'not writable' : 'writable'}`);
});

fs.access(filePath, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  console.log(`[F_OK | W_OK] ${filePath} ${err ? (err.code === 'ENOENT' ? 'not exist' : 'readable') : 'exist and writable'}`);
});

/**
 * 단, 파일 접근 확인 위해 `fs.open()`, `fs.readFile()` or `fs.writeFile()` 앞서 사용하지 말 것
 * - 두 API 호출 간에 다른 프로세스가 파일 상태 변경시킬 수 있으므로 레이스 컨디션 유발할 수 있다
 * - 대신, 파일 열기/읽기/쓰기하고 파일이 접근 불가능하면 발생하는 에러를 처리하도록 한다
 */

/*
// 이렇게 `fs.access` 후 쓰기 하지 말 것
fs.access(<FILEPATH>, (err) => {
  if(! err) {
    console.error(`${<FILEPATH>} already exists`);
    return;
  }

  fs.open(<FILEPATH>, 'wx', (err, fd) => {
    try {
      // do something
    } catch(e) {

    } finally {
      fs.close(fd, (err) => {
        if (err) throw err;
      })
    }
  })
})
 */
