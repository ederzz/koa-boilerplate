import * as mongoose from 'mongoose'

const config = require('config')
const chalk = require('chalk')

const hostName: string = config.get('mongoDB.hostname');
const port: number = config.get('mongoDB.port');
const dbname: string = config.get('mongoDB.dbname');

const dbUrl: string = `mongodb://${hostName}:${port}/${dbname}`;

class MongooseStart {
  constructor() {
  }

  public setUpDb(): void {
    mongoose.connect(dbUrl, error => {
      if(error) {
        console.log(chalk.red('数据库连接失败'), error);
      } else {
        console.log(chalk.green('数据库连接成功。'));
      }
    });

    mongoose.connection.on('connected', () => {
      console.log(chalk.green('MongoDB connected success.'))
    });
    mongoose.connection.on('error', () => {
      console.log(chalk.red('MongoDB connected error.'))
    });
    mongoose.connection.on('disconnected', () => {
      console.log(chalk.yellow('MongoDB connected disconnected.'))
    });
  }
}

export default MongooseStart

/**createConnection连接方式 */
// const con = mongoose.createConnection(dbUrl, error => {
//   if(error) {
//     console.log('数据库连接失败', error);
//   } else {
//     console.log('数据库连接成功。');
//   }
// });

// con.on('connected', () => {
//   console.log('MongoDB connected success.')
// });
