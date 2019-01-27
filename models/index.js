const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
  accountName: {
    type: String,
    required: true
  },
  accountPwd: {
    type: String,
    required: true
  }
})

const accountModel = mongoose.models.account || mongoose.model('account', accountSchema, 'account')

module.exports = {
  accountModel
}

/**createConnection方式建立model */
// const con = require('./db')
// module.exports = con.model('user',UserSchema)
