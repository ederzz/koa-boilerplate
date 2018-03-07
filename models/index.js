const mongoose = require('./db');

const accountSchema = mongoose.Schema({
  accountName: {type: String},
  accountPwd: {type: String}
})

module.exports = mongoose.model('modelName', accountSchema, 'account');

/**createConnection方式建立model */
// const con = require('./db');
// module.exports = con.model('user',UserSchema);
