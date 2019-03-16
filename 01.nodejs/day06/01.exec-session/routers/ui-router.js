
const {Router} = require('express');
const cookieParser = require('cookie-parser');

const Users = require('../models/users');
//nodejs中核心模块: 处理路径问题
//resolve方法传入多个路径,将多个路径解析为一个绝对路径
const {resolve} = require('path');

const router = new Router();

//使用第三方中间件
router.use(cookieParser());

//登录页面
router.get('/login', (req, res) => {
  //初始化渲染必须为errMsg: ''，防止报错
  res.render('login', {errMsg: '', username: ''});
})
//注册页面
router.get('/register', (req, res) => {
  res.render('register', {errMsg: {}});
})
//个人中心页面
router.get('/usercenter', async (req, res) => {
  //获取session保存的数据
  const {userId} = req.session;
  console.log(userId);
  //不存在cookie直接去登录页面
  if (!userId) res.redirect('/login');
  
  const user = await Users.findById({_id: userId});
  if (user) {
    res.render('user-center');
  } else {
    res.redirect('/login');
  }
  
})

module.exports = router;