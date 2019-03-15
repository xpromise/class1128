const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
/*
  cookie
    1. 是什么？
      本质上是一个存储浏览器端的文本
    2. 作用：
      可以用来给浏览器存储数据的
      解决http协议无状态问题
    3. 工作原理
      首次：浏览器发送请求给服务器，服务器返回响应给浏览器，此时返回了cookie，浏览器自动保存下来
      下次：浏览器发送请求时就会自动携带上cookie，服务器通过解析cookie，从而判断浏览器之前的行为（是否登录过），返回给浏览器相应响应
    4. 服务器端使用
      - 设置/修改cookie
        res.cookie(key, value, options)
      - 获取cookie
        app.use(cookieParser());
        req.cookies
      - 删除cookie
        res.clearCookie(key)
    5. cookie的有效期
      - 会话cookie （浏览器打开到浏览器关闭是一次会话）
        会话开始时产生，会话结束自动销毁
      - 持久化cookie
        res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 7}); 7天内生效
        res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 365 * 10});  10年内生效，永久
    6. 浏览器使用
      document.cookie 读写二合一
      
      document.cookie = 'hello=123;expires=' + new Date(Date.now() + 1000 * 3600 * 24);
    7. 缺点：
      - 存储容量有限  大约4kb左右， 数量为20个左右
      - 传输流量比较大  如果cookie数量比较多，每次请求时都会自动携带cookie
 */

//使用第三方中间件，解析请求中cookie数据，将其挂载到req.cookies上
app.use(cookieParser());

app.get('/cookie1', (req, res) => {
  //设置cookie
  res.cookie('userId', 'sunwukong', {maxAge: 1000 * 3600 * 24 * 7});
  //返回响应
  res.end('send cookie~');
})

app.get('/cookie2', (req, res) => {
  // 获取cookie
  console.log(req.cookies);
  //返回响应
  res.end('get cookie');
})

app.get('/cookie3', (req, res) => {
  // 删除cookie
  res.clearCookie('userId');
  //返回响应
  res.end('get cookie');
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})