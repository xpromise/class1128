// 引入自定义模块
const MyKoa = require('./js/my-application');
// 创建实例对象
const app = new MyKoa();
// 使用中间件
app.use((ctx, next) => {
  console.log('中间件函数执行了~~~111');
  next();
})
app.use((ctx, next) => {
  console.log('中间件函数执行了~~~222');
  // 获取请求头参数
  console.log(ctx.headers);
  // 获取查询字符串参数
  console.log(ctx.query);
  // 设置响应头信息
  ctx.set('content-type', 'text/html;charset=utf-8');
  // 设置响应内容，由框架负责返回响应~
  ctx.body = '<h1>hello myKoa</h1>';
})
// 监听端口号
app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})