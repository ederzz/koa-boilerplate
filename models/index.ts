

import * as mongoose from 'mongoose'
import _ from './db'

interface IAccount {
  accountName: string,
  accountPwd: string
}
interface IAccountModel extends IAccount, mongoose.Document {}

interface ITime {
  time: Date
}
interface ITimeModel extends ITime, mongoose.Document {}

const accountSchema: mongoose.Schema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true
  },
  accountPwd: {
    type: String,
    required: true
  }
})

const timeSchema: mongoose.Schema = new mongoose.Schema({
  time: {
    type: Date
  }
})

export const accountModel = mongoose.models.account || mongoose.model<IAccountModel>('account', accountSchema, 'account')
export const timeModel = mongoose.models.time || mongoose.model<ITimeModel>('time', timeSchema, 'account')

/**createConnection方式建立model */
// const con = require('./db');
// module.exports = con.model('user',UserSchema);
