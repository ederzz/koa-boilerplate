const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const hostName = config.get('mongoDB.hostname')
const port = config.get('mongoDB.port')
const dbname = config.get('mongoDB.dbname')

const dbUrl = `mongodb://${hostName}:${port}/${dbname}`

function initDb() {
  mongoose.connect(dbUrl, error => {
    if(error) {
      console.log(chalk.red('数据库连接失败'), error)
    } else {
      console.log(chalk.green('数据库连接成功。'))
    }
  })

  return mongoose.connection
}

module.exports = initDb

/**createConnection连接方式 */
// const con = mongoose.createConnection(dbUrl, error => {
//   if(error) {
//     console.log('数据库连接失败', error)
//   } else {
//     console.log('数据库连接成功。')
//   }
// })

// con.on('connected', () => {
//   console.log('MongoDB connected success.')
// })
