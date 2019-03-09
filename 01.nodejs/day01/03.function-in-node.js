/*
  在node中，每一个模块事一个js文件，每一个模块被包裹了一层看不见的函数
  
  只有函数内部才有arguments，实参列表
  
  function (exports, require, module, __filename, __dirname) { }
    - exports  暴露
    - require  引入
    - module  module.exports 暴露
    - __filename 当前模块文件绝对路径
    - __dirname  当前模块文件夹绝对路径
 */

console.log(arguments.callee.toString());
console.log(__filename, __dirname);