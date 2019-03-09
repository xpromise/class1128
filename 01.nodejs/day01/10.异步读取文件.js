/*
  fs.readFile(path[, options], callback)
    callback
      - error
      - data 读取数据
 */

const fs = require('fs');

fs.readFile('./a.txt', (err, data) => {
  if (!err) {
    //没有问题
    console.log(data.toString()); // Buffer
  } else {
    //有问题
    console.log(err);
  }
})