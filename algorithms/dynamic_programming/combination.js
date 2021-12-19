// nCr, n개중 r개를 선택
// n! / r!(n-r)!
// - n!? n개를 모두 나열하는 경우의 수
// - r!로 나눈다? 선택된 r개를 모두 나열하는 경우의 수를 제거
// - (n-r)!로 나눈다? 선택되지 않은 나머지를 모두 나열하는 경우의 수를 제거
// 즉 뽑기만 하면 되고, 순서는 필요없다
function k_combination_dfs(arr, to_select, combs, result) {
  if (!Array.isArray(arr)) return null;
  if (combs.length == to_select) {
    result.push(combs);
    return null;
  }
  if (combs.length + arr.length < to_select) return null; // 조합을 담으려는 comb의 개수와 남은 요소 수를 합쳐도 선택하려는 수만큼 안 되면 체크할 필요가 없다

  for (let i = 0; i < arr.length; i++) {
    k_combination_dfs(
      arr.slice(i + 1, arr.length),
      to_select,
      [...combs, arr[i]], // js에서 파라미터로 넘어온 변수를 재사용하면 같은 메모리 주소의 변수에 계속 접근하게 된다
      result
    );
  }

  return result;
}

// 결과를 관리할 배열을 같이 넘겨준다
console.log(k_combination_dfs([1, 2, 3], 2, [], []));
console.log(k_combination_dfs([1, 2, 3], 1, [], []));
console.log(k_combination_dfs([1, 2, 3], 3, [], []));

// head + tail 방식의 조합 구하는 방법
// https://medium.com/nerd-for-tech/july-2-generating-k-combinations-with-recursion-in-javascript-71ef2b90b44b
const combinations = (collection, combinationLength) => {
  let head,
    tail,
    result = [];
  if (combinationLength > collection.length || combinationLength < 1) {
    return [];
  }
  if (combinationLength === collection.length) {
    return [collection];
  }
  if (combinationLength === 1) {
    return collection.map((element) => [element]);
  }
  for (let i = 0; i < collection.length - combinationLength + 1; i++) {
    head = collection.slice(i, i + 1);
    tail = combinations(collection.slice(i + 1), combinationLength - 1);
    for (let j = 0; j < tail.length; j++) {
      result.push(head.concat(tail[j]));
    }
  }
  return result;
};
