const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const _ = require('koa-route');
//创建app应用对象
const app = new Koa();

//解析请求体数据
app.use(bodyParser());
//设置中间件
/*app.use((context, next) => {
  /!*
    context 相当于request和response对象集合体
    next 调用下一个中间件
   *!/
  // console.log(context.query); // { username: '123213' }
  console.log(context.request.body); // { username: 'admin', password: '123123' }
  context.body = '这是koa服务器返回的相应~';
})*/

//设置路由
app.use(_.post('/login', (ctx, next) => {
  console.log(ctx.request.body); // { username: 'admin', password: '123123' }
  ctx.body = '这是koa服务器login返回的相应~';
}))

app.use(_.post('/register', (ctx, next) => {
  console.log(ctx.request.body); // { username: 'admin', password: '123123' }
  ctx.body = '这是koa服务器返回的相应~';
}))

//监听端口号
app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})