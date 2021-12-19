/**
 * slice
 */
function slice1(from, to) {
  const arr = [1, 2, 3, 4, 5];
  console.log(`[${arr}].slice(${from}, ${to})`, arr.slice(from, to));
}

slice1(0, 2);
slice1(1, 2);
