const express = require('express');
const db = require('./db');
const Cities = require('./models/cites');

const app = express();

app.use(express.static('public'));

  /*
  //查找所有省份信息
  db.cities.find({level: 1})
  //查找广东省下面所有城市
  db.cities.find({level: 2, province: '44'})
  //查找广东省深圳市下面所有区县
  db.cities.find({level: 3, province: '44', city: '03'})
   */
db
  .then(() => {
  
    app.get('/province', async (req, res) => {
      try {
        // 查找到所有省份的数据
        const cities = await Cities.find({level: 1}, {name: 1, province: 1, _id: 0});
        // 返回成功的响应
        res.json({status: 0, data: cities});
      } catch (e) {
        // 不管有没有错误,都得返回一个响应
        res.json({status: 1, error: '网络出现故障, 请刷新重试~'});
      }
    })
    
    app.get('/city', async (req, res) => {
      try {
        // 获取请求参数
        const { province } = req.query;
        // 查找到所有省份的数据
        const cities = await Cities.find({level: 2, province}, {name: 1, city: 1, _id: 0});
        // 返回成功的响应
        res.json({status: 0, data: cities});
      } catch (e) {
        // 不管有没有错误,都得返回一个响应
        res.json({status: 1, error: '网络出现故障, 请刷新重试~'});
      }
    })
  
    app.get('/county', async (req, res) => {
      try {
        // 获取请求参数
        const { province, city } = req.query;
        // 查找到所有省份的数据
        const cities = await Cities.find({level: 3, province, city}, {name: 1, county: 1, _id: 0});
        // 返回成功的响应
        res.json({status: 0, data: cities});
      } catch (e) {
        // 不管有没有错误,都得返回一个响应
        res.json({status: 1, error: '网络出现故障, 请刷新重试~'});
      }
    })
  
    app.listen(4000, err => {
      if (!err) console.log('服务器启动成功了~');
      else console.log(err);
    })
  })
  .catch(err => console.log(err))



