//引入express模块
const express = require('express');
//创建app应用对象, 特点：唯一的
const app = express();
//设置路由
/*
  http://localhost:3000/test
  http://127.0.0.1:3000/test
  http://192.168.3.162:3000/test
  协议名://域名/ip地址:端口号/路由路径
  
    localhost: 本机默认域名
    127.0.0.1: 本机默认ip地址
    192.168.3.162: 局域网ip地址
    
    默认端口号默认不显示
    http协议默认端口号 80
    https协议默认端口号 443
    
    默认请求资源 index.html
    
    每一台在万维网中的计算机，都有一个ip地址。ip地址记不住，所以简化后的域名地址
    所以访问网址时，输入的是域名地址，经过DNS解析，解析为ip地址
    
    全局安装
    npm i nodemon -g
    作用：用来自动编译重启服务器，从而实时更新服务器代码
    使用：node index.js   ---> nodemon index.js
 */
app.get('/test', (request, response) => {
  //这个回调函数，用来处理请求，返回响应
  console.log('服务器接受到请求了111~');
  //接受请求参数
  //查询字符串是一个请求参数，格式：?value=key&key=value
  console.log(request.query);  //接受查询字符串参数 { username: '123', password: '456' }
  //返回响应
  response.send('<h1>这是express服务器返回的响应</h1>');
})
//监听端口号
app.listen(3000, err => {
  if (!err) {
    console.log('服务器启动成功了~');
  } else {
    console.log(err);
  }
})