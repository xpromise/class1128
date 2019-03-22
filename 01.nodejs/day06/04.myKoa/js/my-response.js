module.exports = {
  /**
   * 设置响应头的信息
   */
  set(key, value) {
    this.res.setHeader(key, value);
  },
  /**
   * 获取响应状态码
   */
  get status() {
    return this.res.statusCode;
  },
  /**
   * 设置响应状态码
   */
  set status(code) {
    this.res.statusCode = code;
  },
  /**
   * 获取响应体信息
   */
  get body() {
    return this._body;
  },
  /**
   * 设置响应体信息
   */
  set body(val) {
    // 设置响应体内容
    this._body = val;
    // 设置响应状态码
    this.status = 200;
    // json
    if (typeof val === 'object') {
      this.set('Content-Type', 'application/json');
    }
  },
}