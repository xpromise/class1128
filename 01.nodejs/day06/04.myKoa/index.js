const MyKoa = require('./js/application');

const app = new MyKoa();

app.use((ctx, next) => {
  console.log(111);
  next();
})

app.use((ctx, next) => {
  console.log(222);
  
  next();
})

app.use((ctx, next) => {
  console.log(333);
  console.log(ctx.request.query);
  ctx.response.set('xxx', 'xxxxx');
  ctx.body = 'send data';
  // next();
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})