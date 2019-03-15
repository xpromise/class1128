/*
  用来定义Users模型对象模块
 */
const {Schema, model} = require('mongoose');

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = model('users', usersSchema);