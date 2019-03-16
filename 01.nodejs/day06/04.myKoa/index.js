const MyKoa = require('./js/application');

const app = new MyKoa();


app.use((req, res) => {
  console.log(111);
})

app.use((req, res) => {
  console.log(222);
})

app.use((req, res) => {
  console.log(333);
  res.end('send data');
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了');
  else console.log(err);
})