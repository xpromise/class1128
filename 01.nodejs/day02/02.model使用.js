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
  mongoose.connect('mongodb://localhost:27017/mongoose_test', {useNewUrlParser: true, useCreateIndex: true});
  
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
  .then(async () => {
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
    
    /*
      模型对象的CRUD
      C - create
        Model.create(文档对象, 回调函数)  返回值为undefined
        Model.create(文档对象)  返回值为promise
      R - read
        Model.find(查询条件[, 投影], 回调函数)
        Model.find(查询条件[, 投影])
        Model.findOne(查询条件[, 投影])
        
        操作符：
          1. < <= > >= !==  $lt $lte $gt $gte $ne
          2. 与或 $or $in 非 $nin
        
      U - update
        Model.updateOne(查询条件, 更新的内容[, 配置对象])
        Model.updateMany(查询条件, 更新的内容[, 配置对象])
      D - delete
        Model.deleteOne(查询条件)
        Model.deleteMany(查询条件)
     */
    // const result = await Students.deleteOne({age: 21});
    
    // const result = await Students.updateMany({}, {$inc: {age: 1}});  //增加一岁
    // const result = await Students.updateOne({name: '艾斯'}, {age: 19});
    
    const result = await Students.find({name: /^艾/}) //模糊匹配
    // const result = await Students.find().sort({age: -1});  //对找到的元素进行排序
    // const result = await Students.find({age: {$in: [16, 20]}}, {__v: 0, _id: 0, hobby: 0, info: 0});  //如果需要的字段更多，不需要的更少
    // const result = await Students.find({age: {$in: [16, 20]}}, {name: 1, age: 1, _id: 0}); //如果需要的更少，不需要的更多
    // const result = await Students.find({$or: [{age: {$lt: 18}}, {age: {$gt: 20}}]});
    
    // const result = await Students.find({age: {$lte: 18}});
    // const result = await Students.findOne({age: 18}); //找到了返回值为对象，没有找到返回值为null
    // const result = await Students.find({age: 18, name: '艾斯'}); //不管找没找到，返回值都是数组
  
    /*const result = await Students.create({
      name: '艾斯11',
      age: 16,
      hobby: ['打球', 'coding'],
      info: '人美歌甜臭不要脸'
    })*/
    
    /*const result = Students.create({
      name: '艾斯',
      age: 16,
      hobby: ['打球', 'coding'],
      info: '人美歌甜臭不要脸'
    }, err => {
      if (!err) {
        console.log('数据创建成功');
      } else {
        console.log(err);
      }
    })*/
    console.log(result);
    console.log(typeof result);  //创建好的文档对象
    result[0].age = 26;
    console.log(result);
    
    
    
    
  })
  .catch(() => {
    //处理异常，重新连接数据库
  })
