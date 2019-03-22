const parse = require('parseurl');
const qs = require('querystring');

module.exports = {
  /**
   * 获取请求头信息
   */
  get headers() {
    return this.req.headers;
  },
  /**
   * 设置请求头信息
   */
  set headers(val) {
    this.req.headers = val;
  },
  /**
   * 获取查询字符串
   */
  get query() {
    // 解析查询字符串参数 --> key1=value1&key2=value2
    const querystring = parse(this.req).query;
    // 将其解析为对象返回 --> {key1: value1, key2: value2}
    return qs.parse(querystring);
  }
}