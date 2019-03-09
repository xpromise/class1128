/*
  流式写入文件： 写一部分一部分写大文件
  fs.createWriteStream(path[, options])
 */

const fs = require('fs');

//创建可写流
const ws = fs.createWriteStream('a.txt');
//通过绑定事件方法，检查流是否做完
ws.on('open', () => {
  console.log('可写流打开了');
})
//绑定一次性事件
ws.once('close', () => {
  console.log('可写流关闭了'); //写入完成
})

//写入内容
ws.write('锄禾日当午');
ws.write('汗滴禾下土');
ws.write('汗滴禾下土');
ws.write('汗滴禾下土');
ws.write('汗滴禾下土');
ws.write('汗滴禾下土');
ws.write('汗滴禾下土');
//可写流不会自动关闭 - 内存泄漏
ws.end(); //等待写入全部完成，才关
// ws.close(); //强行关闭