/*
  name 包名  下载相关
  version 版本号 1.0.0
    第一个版本  新增一些功能
    第二个版本  对之前功能进行完善
    第三个版本  修复bug
  dependencies 生产依赖：项目运行时需要依赖
  devDependencies 开发依赖：项目构建打包需要使用的依赖（webpack...）
  scripts 脚本 / 指令
    "build / dist / prod"   npm run build  构建打包生成上线要的文件
    "start"   npm start  启动运行项目
    "test"    npm run test
    
  
  npm 包管理器: 下载第三方包去使用
    1. 下载
      npm i xxx  本地下载包并将其添加package.json生产依赖中
      npm i xxx --save-dev / -D  本地下载包并将其添加package.json开发依赖中
      npm i xxx -g 全局下载包，作为指令运行
    2. 删除
      npm remove/uninstall xxx
    3. 初始化包描述文件
      npm init
      npm init -y
  
 */

const $ = require('jquery');
console.log($);