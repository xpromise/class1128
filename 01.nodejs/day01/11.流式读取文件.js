/*
  fs.createReadStream(path[, options])
 */
const fs = require('fs');
//创建可读流
const rs = fs.createReadStream('C:\\Users\\web\\Desktop\\流式写入文件.avi');
//创建可写流
const ws = fs.createWriteStream('test.avi');

ws.once('open', () => {
  console.log('可写流打开了');
})
ws.once('close', () => {
  console.log('可写流关闭了');
})

rs.once('open', () => {
  console.log('可读流打开了');
})

rs.once('close', () => {
  console.log('可读流关闭了');
  //在数据读取完毕后，手动关闭可写流
  ws.end();
})

//绑一个事件，在事件中得到读取的内容
//可读流读取完文件后，会自动关闭
rs.on('data', data => {
  console.log(data);
  ws.write(data);
})
