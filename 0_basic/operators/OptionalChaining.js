let tmp = {
  key1: "value1",
  key2: "value2",
};

console.log(tmp?.key1);
console.log(tmp?.key3);

let tmp2 = tmp?.key1 ?? "default";
let tmp3 = tmp?.key2 ?? "default";
let tmp4 = tmp?.key3 ?? "default";

console.log(tmp2);
console.log(tmp3);
console.log(tmp4);
