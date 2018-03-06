const mongoose = require('mongoose');
//设置mongo存储路径
const dbUrl = 'mongodb://localhost:27017/koaIntroduction';
mongoose.connect(dbUrl, {useMongoClient: true})
// 连接成功
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success.')
})
// 连接异常
mongoose.connection.on('error', () => {
  console.log('MongoDB connected error.')
})
// 连接断开
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connected disconnected.')
})
//导出mongoose对象
module.exports = mongoose
