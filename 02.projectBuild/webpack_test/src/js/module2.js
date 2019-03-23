
function sum(...args) {
  return args.reduce((prev, curr) => prev + curr, 0);
}

function mul(x, y) {
  return x * y;
}

// 统一暴露
export {
  sum,
  mul
};