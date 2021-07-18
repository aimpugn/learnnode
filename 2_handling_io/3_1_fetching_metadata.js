import fs from 'fs';
import path from 'path';

import { upsertFile, getFileMetadata } from '../_lib/file.js';

upsertFile('metadata.txt');

// read file arguments
/**
 * process.argv
 * - 글로벌 `process` 오브젝트의 속성으로, `Node.js` 프로세스로 전달되는 인자를 담고 있는 배열
 * - [`<실행 명령어>`, `<실행되는 파일>`, <...변수들>]이 된다
 */
const fileName = process.argv[2];
const filePath = path.join(process.cwd(), fileName);
// node 3_fetching_metadata.js ./metadata.txt
console.log(`filePath: ${filePath}`); // filePath: /mnt/c/Users/daybreak/vscode_projects/project_node/learnnode/2_handling_io/metadata.txt

if (fs.existsSync(filePath)) {
  console.log(getFileMetadata(filePath));
  /**
   *
Stats {
  dev: 14, // 파일을 갖고 있는 디바이스 식별자
  mode: 33279, // 접근 권한
  nlink: 1, // 하드 링크 수(Number of hard links)
  uid: 1000, // 사용자 식별자
  gid: 1000, // 그룹 식별자
  rdev: 0, // 장치 파일의 장치 식별자(Device identifier of the device file)
  blksize: 4096, // 파일시스템 블록 사이즈
  ino: 9288674231496212, // Inode 숫자
  size: 0, // total bytes
  blocks: 0, // 512-byte 블록이 할당된 수
  atimeMs: 1626618516746.243, // 마지막 액세스 시간(ms)
  mtimeMs: 1626618516746.243, // 마지막 수정 시간(ms)
  ctimeMs: 1626618516746.243, // 마지막 상태 변화 시간(ms)
  birthtimeMs: 1626618516746.243, // 파일 생성 시간(ms)
  atime: 2021-07-18T14:28:36.746Z, // 마지막 액세스 시간
  mtime: 2021-07-18T14:28:36.746Z, // 마지막 수정 시간
  ctime: 2021-07-18T14:28:36.746Z, // 마지막 상태 변화 시간
  birthtime: 2021-07-18T14:28:36.746Z // 파일 생성 시간
}
   */
}
