const parse = require('parseurl');

module.exports = {
  get query () {
    //解析查询字符串参数
    return parse(this.req).query;
  }
}