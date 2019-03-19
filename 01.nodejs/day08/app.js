const express = require('express');
const app = express();

app.get('/', (req, res) => {
  //获取请求参数
  const { callback } = req.query;
  //定义响应的数据
  const person = {
    name: 'jack',
    age: 18
  }
  //返回响应  jsonp - json with padding
  res.send(`${callback}(${JSON.stringify(person)})`);  // jsoncallback({"name": "jack", "age": 18})
  
})

app.get('/cors', (req, res) => {
  /*
    1. cors
      特点：
        - 官方推出解决跨域的方案，使用起来及其简单，只需在服务器设置一个响应头
        - 兼容性较差
   */
  //设置响应头
  res.set('access-control-allow-origin', '*');  //允许所有网址跨域
  
  res.json({
    name: 'jack',
    age: 18
  });
})

app.listen(3000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})