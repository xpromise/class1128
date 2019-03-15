//引入模块写在最上面，npm下载或者node核心模块在最上，如果是自定义模块，放后面点
const express = require('express');

const db = require('./db');

const userRouter = require('./routers/user-router');
const uiRouter = require('./routers/ui-router');

const app = express();

/*
  需求：我想通过自己服务器，访问前端页面
  解决：express.static()
  
  需求: 去掉访问路径的.html
  解决: 手动设置路由
  
  需求: 协同开发和更好维护项目等
  解决: 路由器中间件: 分类管理路由
 */

//不需要解析请求体数据
// app.use(express.static('public'));


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