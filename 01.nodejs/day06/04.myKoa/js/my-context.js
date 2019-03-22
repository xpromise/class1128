const delegate = require('delegates');

const proto = module.exports = {};

// 将response对象上的属性/方法克隆到proto上
delegate(proto, 'response')
  .method('set')    // 克隆普通方法
  .access('status') // 克隆带有get和set描述符的方法
  .access('body')

// 将request对象上的属性/方法克隆到proto上
delegate(proto, 'request')
  .access('query')
  .getter('headers')  // 克隆带有get描述符的方法