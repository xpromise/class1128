//引入express模块
const express = require('express');
//创建app应用对象
const app = express();
//设置路由
/*
  路由：
    1. 作用：
      - 定义请求地址
      - 处理请求、返回响应
    2. 组成：
      - 请求方式： GET(查) POST(增) PUT(改) DELETE(删)
      - 路由路径： 定义请求地址
        基本 /   /login /shop/a  一个url网址对应一个路由
        特殊 /xxx/:xxx   多个url网址对应一个路由
      - 若干个回调函数（句柄函数）
        request 请求信息
        response 响应信息
    3. 是什么
      - key-value的映射关系 key是路由路径，value是回调函数
 */
app.get('/shop/a', (req, res) => {
  res.send('这是/shop/a返回的响应');
})
app.get('/hotel/:id', (req, res) => {
  console.log(req.params); // { id: '123456' } { id: '456789' }
  res.send('这是/hotel/:id返回的响应');
})
//监听端口号
app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})