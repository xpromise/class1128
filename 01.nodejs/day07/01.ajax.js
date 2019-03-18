const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/ajax', (req, res) => {
  console.log(11111);
  res.send('这是服务器get路由返回的响应~');
})

app.post('/ajax', (req, res) => {
  console.log(req.body);
  res.send('这是服务器post路由返回的响应~');
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})