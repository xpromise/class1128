const express = require('express');
const app = express();
/*
  ejs
    1. 是什么
      一个高效的js模板引擎
    2. 作用:
      用来实现服务器渲染的
    3. 使用
      - 下载ejs
        npm i ejs
      - 设置模板资源目录 (为了找到模板资源,才能将数据渲染上去)
        app.set('views', '模板资源目录')
      - 设置使用哪个模板引擎解析
        app.set('view engine', '使用的模板引擎')
      - 服务器渲染数据到模板资源上
        res.render('模板资源名称', {要渲染的数据})
 */

app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/ejs', (req, res) => {
  // const errMsg = '<h1>用户名或密码不正确</h1>';
  const errMsg = '<script src="http://localhost:3000"></script>';
  const data = [1, 2, 3, 4, 5, 6];
  //将数据渲染到模板资源上, 并将渲染好数据的模板资源返回给浏览器
  res.render('login.ejs', {errMsg, data});
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})