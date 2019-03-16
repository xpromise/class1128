
module.exports = {
  //读取属性的方法
  get body () {
    return this._body;
  },
  //设置属性的方法
  set body (value) {
    this._body = value;
  }
}