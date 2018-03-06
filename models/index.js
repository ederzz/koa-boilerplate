const mongoose = require('./db')
// 创建一个schema对象
const Schema = mongoose.Schema
// 创建一个schema实例
let UserSchema = new Schema({
  username: {type: String},
  userpwd: {type: String},
  userage: {type: Number},
  logindate: {type: Date}
})
// 利用UserSchema实例,发布一个User的model并且导出
module.exports = mongoose.model('User',UserSchema)
