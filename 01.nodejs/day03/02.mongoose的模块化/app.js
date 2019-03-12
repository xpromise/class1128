/*
  入口文件： 项目的启动入口文件
 */
//引入连接数据库模块
const db = require('./db');
//引入模型对象
const Students = require('./models/students');
const Teachers = require('./models/teachers');

//使用
//保证先连接数据库，再使用模型对象
db
  .then(async () => {
    //对数据进行操作
    await Students.create({
      name: 'rose',
      age: 18,
      hobby: ['jack'],
      info: 'you jump i jump'
    })
    await Teachers.create({
      name: 'rose',
      age: 18,
      hobby: ['jack'],
      info: 'you jump i jump'
    })
  })
  .catch()