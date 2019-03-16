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
    const server = createServer(this.callback())
    server.listen(...args);
  }
  //处理回调的方法
  callback () {
    return (req, res) => {
      const fn = compose(this.middleware);
      const respond = () => this.handleRequest(req, res);
      //then方法触发了, 说明所有中间件函数都被调用完成
      fn(req, res).then(respond);
    }
  }
  //处理响应回调函数
  handleRequest (req, res) {
    //最终返回响应
    const body = res.body;
    if (typeof body === 'object') {
      res.end(JSON.stringify(body));
    } else if (typeof body === 'string') {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.end(body);
    } else {
      res.end(body);
    }
  }
}

function compose(middleware) {
  
  return (req, res) => {
    //默认调用一次，为了执行第一个中间件函数
    return dispatch(0);
    
    function dispatch(i) {
      //提取中间件数组的函数
      let fn = middleware[i];
      //让最后一个中间件的next方法，调用不出错，返回值是一个promise对象
      if (!fn) return Promise.resolve();
      //dispatch.bind(null, i + 1))就是next方法
      return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1)));
    }
    
  }
}