/**
 * https://eslint.org/docs/rules/no-param-reassign
 * - `arguments` 사용하는 것은 좋지 않다
 */
function func1() {
  console.log(arguments);
}

/**
 * object로 관리되는데, 해시 테이블? 링크드 리스트? js 엔진에 따라 다를 듯 하다고 한다.
 * https://stackoverflow.com/questions/10256974/under-the-hood-are-javascript-objects-hash-tables
 * https://stackoverflow.com/a/62064106
 */
func1(); // [Arguments] {}
func1(1); // [Arguments] { '0': 1 }
func1(''); // [Arguments] { '0': '' }
func1({}); // [Arguments] { '0': {} }
func1(() => true); // [Arguments] { '0': [Function (anonymous)] }
func1('test'); // [Arguments] { '0': 'test' }
func1(null); // [Arguments] { '0': null }
func1(undefined); // [Arguments] { '0': undefined }
func1(1, 0, null, 'test'); // [Arguments] { '0': 1, '1': 0, '2': null, '3': 'test'

/**
 * https://eslint.org/docs/rules/prefer-rest-params
 * - `rest parameters`를 사용하는 게 좋다
 * @param  {...any} args
 */
function func2(...args) {
  console.log(' // ', args);
}

func2(); //  []
func2(1); //  [ 1 ]
func2(''); //  [ '' ]
func2({}); //  [ {} ]
func2(() => true); //  [ [Function (anonymous)] ]
func2('test'); //  [ 'test' ]
func2(null); //  [ null ]
func2(undefined); //  [ undefined ]
func2(1, 0, null, 'test'); //  [ 1, 0, null, 'test' ]
