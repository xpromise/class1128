/*
  用来定义模型对象
 */
const {Schema, model} = require('mongoose');

const studentsSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  age: Number,
  hobby: [String],
  info: Schema.Types.Mixed
});
//暴露出去
module.exports = model('students', studentsSchema);

