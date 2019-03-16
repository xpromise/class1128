const MyKoa = require('./js/application');

const app = new MyKoa();

app.use((req, res, next) => {
  console.log(111);
  next();
})

app.use((req, res, next) => {
  console.log(222);
  
  next();
})

app.use((req, res, next) => {
  console.log(333);
  res.body = 'send data';
  // next();
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})