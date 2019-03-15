/*
  路由器管理模块,分类管理路由
 */
const {Router, urlencoded} = require('express');
/*
  sha1加密库
    1. 以不可逆的方法加密的
    2. 同样的明文加密后会得到同样的密文
 */
const sha1 = require('sha1');

const Users = require('../models/users');
//创建路由器对象: 相当于一个小型的app应用对象(功能更少)
const router = new Router();

//get请求不需要当前中间件解析
router.use(urlencoded({extended: true}));

//登录路由
router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  
  const user = await Users.findOne({username, password: sha1(password)});
  
  if (!user) {
    res.send('用户名或密码错误');
  } else {
    res.send('登录成功');
  }
  
})

//注册路由
router.post('/register', async (req, res) => {
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
  const result = await Users.create({username, password: sha1(password), email});
  console.log(result);
  
  // 5. 返回用户注册成功，跳转到登录页面
  // res.sendFile(__dirname  + '/public/login.html'); //不能修改地址
  res.redirect('/login');
  
})

//将路由器对象暴露出去
module.exports = router;