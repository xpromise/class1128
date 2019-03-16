const {createServer} = require('http');

module.exports = class Application {
  constructor () {
    //初始化中间件数组
    this.middleware = [];
  }
  //使用中间件方法
  use (fn) {
    this.middleware.push(fn);
  }
  //监听端口号
  listen (...args) {
    // console.log(args); //实参列表，真数组
    const server = createServer((req, res) => {
      //处理请求的回调函数
      // req 是 node原生request
      // res 是 node原生response
      this.middleware.forEach(fn => fn(req, res));
    })
    server.listen(...args);
  }
}