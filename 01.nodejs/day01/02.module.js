/*
  nodejs使用模块化规范叫做commonjs模块化规范
    1. 引入其他模块，当前模块使用
      require(模块路径)
        - 模块路径
          - 自定义模块，模块路径必须加上 ./ 或 ../ ,否则就找不到模块
          - 第三方模块（通过npm工具下载的），模块路径直接就是包名
          - node的核心模块（使用node自带的模块），模块路径直接就是包名
        - 模块名称，文件扩展名   可以省略  .js .json
    2. 暴露当前模块的内容，给其他模块使用
      module.exports 默认值是一个{}  暴露一个内容
      exports  
      
      模块暴露的本质：module.exports指向的值
 */

// Error: Cannot find module 'my-module'
const m1 = require('./my-module');

console.log(m1.add(1 , 2));  // {}
