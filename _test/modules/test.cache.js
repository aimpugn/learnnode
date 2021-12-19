import LRU from 'lru-cache';
import crypto from 'crypto';
import NodeCache from 'node-cache';
import sizeof from 'object-sizeof';
import { Table } from 'console-table-printer';

const maxSize = 500;
const lruCache = new LRU({
  max: maxSize,
  maxAge: 1000 * 60 * 60, // 1시간
  stale: true, // 캐시 시간 만료된 후 꺼낼 때 삭제 전에 해당 값을 리턴한다
  noDisposeOnSet: true,
  updateAgeOnGet: true,
});

const nodeCache = new NodeCache({
  maxKeys: maxSize,
  deleteOnExpire: true, // 만료 시 삭제
  stdTTL: 60 * 60 * 2, // 2시간
  checkperiod: 60 * 10, // 10분마다 체크
  useClones: false,
});

const dummyData = {
  data: crypto.createHmac('sha256', 'some kind of secret key').update('some kind of data').digest().toString('hex'),
  time: new Date().getTime(),
  id: crypto.createHash('sha256').update('12345678910').digest('hex'),
};
const oauthtoken = {
  access_token: Buffer.from('access_token', 'utf8').toString('base64'),
  refresh_token: Buffer.from('refresh_token', 'utf8').toString('base64'),
  expires_at: new Date().toISOString(),
  issued_at: new Date().toISOString(),
  scopes: ['read', 'write', 'update', 'etc'],
};
console.log('dummyData', dummyData);
console.log('oauthtoken', oauthtoken);
// const dummyDataKey = 'dummyData';
const dummyDataKey = dummyData.data;
const oauthtokenKey = 'oauthtoken';
const noexistkey = 'notexist';

const randomPosition = Math.floor(Math.random() * (400 - 100) + 100);

for (let i = 0; i < 400; i++) {
  const fakeKey = `fake${i}`;
  const fakeData = {
    key: fakeKey,
    value: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ],
    obj: {
      name: 'obj in fake data',
      value: i,
    },
  };
  lruCache.set(fakeKey, fakeData);
  nodeCache.set(fakeKey, fakeData);
  if (i === randomPosition) {
    console.log(`set at ${randomPosition} into lruCache`);
    lruCache.set(dummyDataKey, dummyData?.data);
    lruCache.set(oauthtokenKey, oauthtoken);
    console.log(`set at ${randomPosition} into nodeCache`);
    nodeCache.set(dummyDataKey, dummyData?.data);
    nodeCache.set(oauthtokenKey, oauthtoken);
  }
}

const testLoopCnt = 10000000;
const caches = {
  nodeCache,
  lruCache,
};
const testCases = [
  dummyDataKey,
  oauthtokenKey,
  noexistkey,
];

const firstColumnName = 'test name';
const columns = [{ name: firstColumnName }];
const rowsObject = {};
const truncateLength = 35;
let start;
Object.keys(caches).forEach((cacheName) => {
  columns.push({ name: cacheName });
  const cache = caches[cacheName];

  testCases.forEach((testCase) => {
    let label = `checkHas ${testCase}`;
    if (!rowsObject[label]) {
      rowsObject[label] = {};
    }
    start = performance.now();
    for (let i = 0; i < testLoopCnt; i++) {
      cache.has(testCase);
    }
    rowsObject[label][firstColumnName] = truncateString(label, truncateLength);
    rowsObject[label][cacheName] = getElapsedTime(start);

    label = `checkGet ${testCase}`;
    if (!rowsObject[label]) {
      rowsObject[label] = {};
    }
    start = performance.now();
    for (let i = 0; i < testLoopCnt; i++) {
      cache.get(testCase);
    }

    rowsObject[label][firstColumnName] = truncateString(label, truncateLength);
    rowsObject[label][cacheName] = getElapsedTime(start);

    label = `checkHasAndGet ${testCase}`;
    if (!rowsObject[label]) {
      rowsObject[label] = {};
    }
    start = performance.now();
    for (let i = 0; i < testLoopCnt; i++) {
      cache.has(testCase);
      cache.get(testCase);
    }
    rowsObject[label][firstColumnName] = truncateString(label, truncateLength);
    rowsObject[label][cacheName] = getElapsedTime(start);
  });

  if (!rowsObject.sizeof) {
    rowsObject.sizeof = {};
    rowsObject.sizeof[firstColumnName] = ['sizeof'];
  }
  if (!rowsObject.stats) {
    rowsObject.stats = {};
    rowsObject.stats[firstColumnName] = ['stats'];
  }
  rowsObject.sizeof[cacheName] = sizeof(cache);
  if (cacheName === 'lruCache') {
    rowsObject.stats[cacheName] = lruCache.itemCount;
  } else if (cacheName === 'nodeCache') {
    rowsObject.stats[cacheName] = JSON.stringify(nodeCache.getStats());
  }
});

const table = new Table({
  title: `compare cache ${testLoopCnt}`,
  columns,
});
table.addRows(Object.values(rowsObject));
table.printTable();

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

function getElapsedTime(start) {
  return `${((performance.now() - start) / 1000).toFixed(5)}s`;
}

function truncateString(str, len) {
  if (str.length > len) {
    return `${str.substring(0, len)}...`;
  }
  return str;
}
