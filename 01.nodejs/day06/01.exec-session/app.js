//引入模块写在最上面，npm下载或者node核心模块在最上，如果是自定义模块，放后面点
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const db = require('./db');

const userRouter = require('./routers/user-router');
const uiRouter = require('./routers/ui-router');

const app = express();
//设置使用的模板资源目录
app.set('views', 'views');
//设置模板引擎
app.set('view engine', 'ejs');

/*
  需求：我想通过自己服务器，访问前端页面
  解决：express.static()
  
  需求: 去掉访问路径的.html
  解决: 手动设置路由
  
  需求: 协同开发和更好维护项目等
  解决: 路由器中间件: 分类管理路由
  
  需求：想在当前页面提示错误信息
  解决: ejs
  
  
  session:
    1. 是什么？是一个存储服务器端会话对象
    2. 作用？存储数据、解决http协议无状态问题
    3. 工作原理
      浏览器首次发送给服务器请求，此时开启会话，服务器会为本次会话创建session对象
      服务器会将session的id作为cookie返回给浏览器，浏览器接受后就存起来
      下一次浏览器发送请求就会自动携带上cookie，服务器就要解析cookie得到session_id，
      通过session_id找到对应session对象，然后根据session对象中的内容返回给浏览器相应的响应
    4. 使用：
      想将会话存储的session进行持久化储存，就得使用上数据库
      
      设置一个中间件
      今后通过 req.session 读写二合一
    
    5. cookie 和 session 区别
      储存位置： cookie在浏览器端  session在服务器端
      存储容量大小： cookie较小   session无限大
      传输流量： cookie较多    session只产生一个cookie，较小
      安全性：  cookie安全更低（保存不是敏感数据）    session安全更高（登陆、注册）
      
 */

//不需要解析请求体数据
// app.use(express.static('public'));

//配置第三方中间件：修改请求-响应对象
//解析请求发送过来的cookie，找到session_id，自动去数据库中找到对应session对象，挂载到req.session上
app.use(session({
  secret: 'hello_atguigu',   //参与加密的session_id
  saveUninitialized: false, // 数据不保存，就不创建session
  resave: false, // 如果session没有修改，就不会重新保存
  store: new MongoStore({
    url: 'mongodb://localhost:27017/exec',
    touchAfter: 24 * 3600 //24小时内更新一次，无论发生多少请求（除了那些改变会话数据的东西）
  })
}));

//连接数据库，才能使用其中的内容
db
  .then(() => {
    //应用路由器对象:将路由器对象挂载的路由挂载到app上
    app.use(uiRouter);
    app.use(userRouter);
  })
  .catch(err => console.log(err))


app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})