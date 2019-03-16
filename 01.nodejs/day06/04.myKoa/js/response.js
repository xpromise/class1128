

module.exports = {
  //设置响应头
  set (key, value) {
    this.res.setHeader(key, value);
  }
}