const {createServer} = require('http');
const context = require('./my-context');
const request = require('./my-request');
const response = require('./my-response');

module.exports = class Application {
  constructor() {
    this.middleware = [];
    // Object.create(target) 以target对象为原型, 创建新对象, 新对象原型有target对象的属性和方法
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  
  use(fn) {
    this.middleware.push(fn);
  }
  
  listen(...args) {
    // 使用nodejs的http模块监听端口号
    const server = createServer(this.callback());
    server.listen(...args);
  }
  
  callback() {
    const fn = compose(this.middleware);
    
    const handleRequest = (req, res) => {
      // 创建context
      const ctx = this.createContext(req, res);
      const handleResponse = () => respond(ctx);
      fn(ctx).then(handleResponse);
    }
    
    return handleRequest;
  }
  
  /**
   * 创建context 上下文对象的方法
   * @param req node原生req对象
   * @param res node原生res对象
   */
  createContext(req, res) {
    /*
      凡是req/res，就是node原生对象
      凡是request/response，就是自定义对象
      这是实现互相挂载引用，从而在任意对象上都能获取其他对象的方法
     */
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    
    return context;
  }
}
// 将原来使用req，res的地方改用ctx
function compose(middleware) {
  return (ctx) => {
    return dispatch(0);
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
    }
  }
}

function respond(ctx) {
  let body = ctx.body;
  const res = ctx.res;
  if (typeof body === 'object') {
    body = JSON.stringify(body);
    res.end(body);
  } else {
    res.end(body);
  }
}