/*
  1. 引入mongoose模块
  2. 连接本地mongoDB数据库
  3. 创建Schema模式对象
  4. 创建Model模型对象
  5. 创建Document文档对象
  6. 保存数据
 */

// 1. 引入mongoose模块
const mongoose = require('mongoose');
// 2. 连接本地mongoDB数据库
const promise = mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true });
console.log(promise);
mongoose.connection.once('open', err => {
  if (!err) {
    console.log('数据库连接成功~');
  } else {
    console.log(err);
  }
})
// 3. 创建Schema模式对象
// 4. 创建Model模型对象
// 5. 创建Document文档对象
// 6. 保存数据