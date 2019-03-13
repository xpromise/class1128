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
        request 请求信息， 浏览器发送服务器的
        response 响应信息, 服务器发给浏览器
    3. 是什么
      - key-value的映射关系 key是路由路径，value是回调函数
    4. 执行顺序
      从上到下，依次检查是否匹配上了路由，如果有就执行相应的回调函数，如果没有匹配上就看下一个
      如果都没有匹配上。返回404
      
 */
//根路径
app.get('/', (req, res) => {
  /*
    request
      请求参数
        get请求参数 -- 查询字符串  req.query
        post请求参数 -- req.body(配和中间件使用)
        params参数 req.params
      请求头信息
        req.headers 获取所有请求头信息
        
    response
      返回响应
        res.send()
          如果是标签字符串，会再响应头添加Content-type: text/html;charset=utf8
          如果是js对象，转换为json数据并作为响应体返回
        res.end()   快速返回响应
        res.json()  将对象转换为json数据并作为响应体返回
        
        res.download(文件相对路径) 返回响应，让浏览器下载当前文件
        res.sendFile(文件绝对路径) 返回响应，让浏览器打开当前文件
        
        res.redirect()  重定向, 默认响应状态码302
        
        res.status() 设置响应状态码
        
        res.set()  设置响应头
   */
  
  console.log(req.query); // { username: '123', password: '456' }
  console.log(req.headers);
  
  // res.json({name: 111, age: 222});
  // res.download('./01.闭包.html');
  // res.sendFile(__dirname + '\\01.闭包.html');
  // res.redirect('http://www.atguigu.com');
  res.set('x-xxx', 'xxxxxxxx');
  res.status(301).end('123456');
})

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