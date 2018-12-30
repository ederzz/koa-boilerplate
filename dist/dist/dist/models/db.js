const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');
const hostName = config.get('mongoDB.hostname');
const port = config.get('mongoDB.port');
const dbname = config.get('mongoDB.dbname');
const dbUrl = `mongodb://${hostName}:${port}/${dbname}`;
mongoose.connect(dbUrl, error => {
    if (error) {
        console.log(chalk.red('数据库连接失败'), error);
    }
    else {
        console.log(chalk.green('数据库连接成功。'));
    }
});
mongoose.connection.on('connected', () => {
    console.log(chalk.green('MongoDB connected success.'));
});
mongoose.connection.on('error', () => {
    console.log(chalk.red('MongoDB connected error.'));
});
mongoose.connection.on('disconnected', () => {
    console.log(chalk.yellow('MongoDB connected disconnected.'));
});
module.exports = mongoose;
