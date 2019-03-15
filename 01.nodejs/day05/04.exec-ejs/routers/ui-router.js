
const {Router} = require('express');
//nodejs中核心模块: 处理路径问题
//resolve方法传入多个路径,将多个路径解析为一个绝对路径
const {resolve} = require('path');

const router = new Router();

//登录页面
router.get('/login', (req, res) => {
  //初始化渲染必须为errMsg: ''，防止报错
  res.render('login', {errMsg: ''});
})
//注册页面
router.get('/register', (req, res) => {
  res.render('register', {errMsg: {}});
})

module.exports = router;