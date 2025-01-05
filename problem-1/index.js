/**
 * From my own
 * The call stack exceeded if the n is big (e.g.100,0000)
 */
var sum_to_n_a = function (n) {
  if (n === 0) {
    return 0;
  }
  return n < 1 ? n + sum_to_n_a(n + 1) : n + sum_to_n_a(n - 1);
};

/**
 * From my own
 * Not the fastest way to it's safe for big n
 */

var sum_to_n_b = function (n) {
  const nIsNegative = n < 0;
  const totalItems = nIsNegative ? n * -1 : n;

  return Array(totalItems)
    .fill("")
    .reduce((acc, item, index) => {
      nIsNegative ? (acc -= index + 1) : (acc += index + 1);
      return acc;
    }, 0);
};

/**
 * From researching
 */
var sum_to_n_c = function (n) {
  const multiplyN = n < 0 ? n * -1 : n;
  return (n * (multiplyN + 1)) / 2;
};

/**
 * Result
 */

const n = 1000; // or -1000

const funcAStart = performance.now();
const resultA = sum_to_n_a(n);
const funcAEnd = performance.now();
console.log(
  `Result sum_to_n_a: ${resultA} - takes ${(funcAEnd - funcAStart).toFixed(
    2
  )}ms`
);

const funcBStart = performance.now();
const resultB = sum_to_n_b(n);
const funcBEnd = performance.now();
console.log(
  `Result sum_to_n_b: ${resultB} - takes ${(funcBEnd - funcBStart).toFixed(
    2
  )}ms`
);

const funcCStart = performance.now();
const resultC = sum_to_n_c(n);
const funcCEnd = performance.now();
console.log(
  `Result sum_to_n_c: ${resultC} - takes ${(funcCEnd - funcCStart).toFixed(
    2
  )}ms`
);
