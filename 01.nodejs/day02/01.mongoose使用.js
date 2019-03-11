/*
  1. 引入mongoose模块
  2. 连接本地mongoDB数据库
  3. 创建Schema模式对象
  4. 创建Model模型对象
  5. 创建Document文档对象
  6. 保存数据
 */

// 1. 引入mongoose模块
const mongoose = require('mongoose');
// 2. 连接本地mongoDB数据库
const promise = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true , useCreateIndex: true});
  
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


promise
  .then(() => {
    // 3. 创建Schema模式对象, 创建约束对象
    const {Schema} = mongoose;
    const studentsSchema = new Schema({
      //约束集合内文档的对象，约束文档对象中属性名和属性值的类型
      name: {
        type: String,
        unique: true, //属性值必须是唯一的
        required: true, //属性必填项
      },
      age: Number,
      hobby: [String],
      info: Schema.Types.Mixed, //任意数据类型
    })
    // 4. 创建Model模型对象
    const Students = mongoose.model('students', studentsSchema);
    // 5. 创建Document文档对象
    const student = new Students({
      name: '李晓飞',
      age: 20,
      hobby: ['吃吃吃', '睡睡睡'],
      info: '多读书，多看报'
    })
    // 6. 保存数据
    student.save(err => {
      if (!err) {
        console.log('数据保存成功');
      } else {
        console.log(err);
      }
    })
  })
  .catch(() => {
    //处理异常，重新连接数据库
  })
