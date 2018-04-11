const mongoose = require('./db');

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

module.exports = mongoose.model('modelName', accountSchema, 'account');

/**createConnection方式建立model */
// const con = require('./db');
// module.exports = con.model('user',UserSchema);
