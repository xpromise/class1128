const express = require('express');
const app = express();

/*
  中间件：
    1. 是什么
      本质上是一个函数，这个函数有三个参数req，res, next
    2. 参数含义
      req 请求对象
      res 响应对象
      next 函数，调用下一个中间件
    3. 作用
      执行任何代码。
      更改请求和响应对象。
      接受请求、返回响应。（注意：中间件一般不直接返回响应，一般是由路由返回响应，中间件负责处理一下请求相关的信息）
      调用堆栈中的下一个中间件函数。
    4. 应用
      应用程序级中间件
        放在路由上面，更改请求和响应对象。   过滤非法请求（防盗链）
      路由器级中间件
        Router路由器 后面讲
      内置中间件
        express框架内置的中间件
          express.static(资源文件目录)   向外暴露静态资源
          express.urlencoded()  解析post请求的请求体参数，就能通过req.body获取
      第三方中间件
        社区开发的中间件 cookie-parser  解析cookie数据
      错误处理中间件
        (err, req, res, next) => {}  一旦中间件或者路由出问题，就触发错误中间件处理
        404页面

 */
//内置中间件
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//最基本的中间件 - 能够接受处理所有请求
app.use((req, res, next) => {
  // console.log(req.headers);
  // req.xxx = 123;
  // res.xxxx = 456;
  console.log(req.body); // { username: 'admin', password: 'admin' }
  
  console.log(aaa);
  
  if (/[Chrome]/.test(req.headers['user-agent'])) {
    console.log(11111);
    next();
  } else {
    res.end('error');
  }
  // res.send('这是中间件返回的响应');
})

app.get('/', (req, res) => {
  // console.log(req.xxx);
  // console.log(res.xxxx);
  res.send('这是路由返回的响应');
})

//错误处理中间件
app.use((err, req, res, next) => {
  console.log(err);
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})