/*
  fs 文件系统
    fs.writeFile(path, data[, options], callback)
      - path  要写入到哪个文件
      - data  要写入什么内容
      - options
        配置对象：属性名固定的对象.
        可选值：可传入可不传，一般都有默认值
        encoding 编码方式 'utf8'
        mode 设置新文件操作权限 0o666 可读可写
          0o111  文件可执行
          0o222  文件可写入
          0o444  文件可读取
        flag 对文件进行的操作 'w'
          'w'  要进行写入操作
          'r'  要进行读取操作
          'a'  要进行追加操作
      - callback 回调函数
        - error 错误对象, 在nodejs中回调函数默认第一个参数就是error，错误优先机制（node中强调优先处理错误）
 */

//引入模块
const fs = require('fs');

//异步写入文件
fs.writeFile('./d.txt', 'yyyyy', {flag: 'a', mode: 0o666}, error => {
  // console.log(error); // null 没有错误
  /*
  { Error: EPERM: operation not permitted, open 'C:\Users\web\Desktop\1128\class1128\01.nodejs\day01\b.txt'
  errno: -4048,
  code: 'EPERM',
  syscall: 'open',
  path: 'C:\\Users\\web\\Desktop\\1128\\class1128\\01.nodejs\\day01\\b.txt' }
   */
  if (!error) {
    //没有错误
    console.log('文件写入成功~');
  } else {
    console.log(error);
  }
})
