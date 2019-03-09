function add(x, y) {
  return x + y;
}

// module.exports = add;
// module.exports.add = add;
module.exports = {
  add
}

//这样事不能暴露的
// exports = add;
exports.add = add;  // 将module.exports指向的对象添加了方法add

/*
  module.exports = {}
  exports = module.exports
  exports.add = add
  exports = {}
 */