
const {Router} = require('express');
//nodejs中核心模块: 处理路径问题
//resolve方法传入多个路径,将多个路径解析为一个绝对路径
const {resolve} = require('path');

const router = new Router();

//登录页面
router.get('/login', (req, res) => {
  const filePath = resolve(__dirname, '../', 'public/login.html');
  console.log(filePath); // C:\Users\web\Desktop\1128\class1128\01.nodejs\day05\public\login.html
  res.sendFile(filePath);
})
//注册页面
router.get('/register', (req, res) => {
  res.sendFile(resolve(__dirname, '../public/register.html'));
})

module.exports = router;