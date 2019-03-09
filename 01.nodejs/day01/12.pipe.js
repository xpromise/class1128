
const fs = require('fs');
//创建可读流
const rs = fs.createReadStream('C:\\Users\\web\\Desktop\\流式写入文件.avi');
//创建可写流
const ws = fs.createWriteStream('test1.avi');

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
})

rs.pipe(ws);