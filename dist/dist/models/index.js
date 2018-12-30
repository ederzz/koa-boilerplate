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
});
const timeSchema = mongoose.Schema({
    time: {
        type: Date
    }
});
const accountModel = mongoose.models.account || mongoose.model('account', accountSchema, 'account');
const timeModel = mongoose.models.time || mongoose.model('time', timeSchema, 'time');
module.exports = {
    accountModel,
    timeModel
};
