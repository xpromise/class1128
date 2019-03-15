//引入模块写在最上面，npm下载或者node核心模块在最上，如果是自定义模块，放后面点
const express = require('express');

const db = require('./db');
const Users = require('./models/users');

const app = express();

/*
  需求：我想通过自己服务器，访问前端页面
  解决：express.static()
 */

//不需要解析请求体数据
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//连接数据库，才能使用其中的内容
db
  .then(() => {
    //登录路由
    app.post('/login', async (req, res) => {
      const {username, password} = req.body;
    
      const user = await Users.findOne({username, password});
    
      if (!user) {
        res.send('用户名或密码错误');
      } else {
        res.send('登录成功');
      }
    
    })

    //注册路由
    app.post('/register', async (req, res) => {
      /*
        1. 收集用户提交的数据
          请求体默认不解析，需要设置express.urlencoded解析
        2. 对数据校验（正则验证）
          用户名必须有英文、数字、下划线组成，长度为5-10位
          密码必须有英文、数字、下划线组成，长度为5-12位
          邮箱  xxx@xxx.com
        3. 验证用户名是否存在
        4. 保存用户数据 - 数据库
        5. 返回用户注册成功，跳转到登录页面
       */
    
      // 1. 收集用户提交的数据
      const {username, password, rePassword, email} = req.body;
      // 2. 对数据校验（正则验证）
      const usernameReg = /^[A-Za-z0-9_]{5,10}$/;
      const passwordReg = /^[A-Za-z0-9_]{5,12}$/;
      const emailReg = /^[A-Za-z0-9_]{2,5}@[A-Za-z0-9_]{2,5}\.com$/;
    
      if (!usernameReg.test(username)) {
        //用户名校验失败，返回错误提示给浏览器显示
        res.send('用户名必须有英文、数字、下划线组成，长度为5-10位');
        return;
      }
    
      if (!passwordReg.test(password)) {
        //密码校验失败，返回错误提示给浏览器显示
        res.send('密码必须有英文、数字、下划线组成，长度为5-12位');
        return;
      }
    
      if (password !== rePassword) {
        res.send('两次密码输入不一致，请重新输入');
        return;
      }
    
      if (!emailReg.test(email)) {
        res.send('邮箱格式不正确，请重新输入');
        return;
      }
    
      // 3. 验证用户名是否存在
      const user = await Users.findOne({username});
    
      if (user) {
        //找到了，用户名已存在
        res.send('用户名已存在');
        return;
      }
    
      // 4. 保存用户数据 - 数据库
      const result = await Users.create({username, password, email});
      console.log(result);
    
      // 5. 返回用户注册成功，跳转到登录页面
      // res.sendFile(__dirname  + '/public/login.html'); //不能修改地址
      res.redirect('/login.html');
    
    })
  })
  .catch(err => console.log(err))


app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})