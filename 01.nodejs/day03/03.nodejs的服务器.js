//引入http模块  nodejs核心模块
const http = require('http');

//通过http模块创建服务
const server = http.createServer((request, response) => {
  /*
  回调函数：用来接受请求，返回响应
  request 请求信息: 浏览器发送给服务器的信息
  response 响应信息: 服务器发送给浏览器的信息
   */
  console.log('服务器接受到请求了~');
  //设置响应头
  response.setHeader('content-type', 'text/html;charset=utf8');
  //返回响应
  response.end('<h1>这是服务器返回的响应~</h1>');
})

//通过server监听端口号，启动服务器
//访问地址：http://localhost:3000
server.listen(3000, err => {
  if (!err) {
    console.log('服务器启动成功了~');
  } else {
    console.log(err);
  }
})

