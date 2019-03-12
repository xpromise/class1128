/*
  此模块用来连接数据库
 */
const mongoose = require('mongoose');

module.exports = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/mongoose_test', {useNewUrlParser: true, useCreateIndex: true});
  mongoose.connection.once('open', err => {
    if (!err) {
      console.log('数据库连接成功~');
      resolve();
    } else {
      console.log(err);
      reject(err);
    }
  })
})