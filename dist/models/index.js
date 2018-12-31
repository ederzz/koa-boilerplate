"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    accountPwd: {
        type: String,
        required: true
    }
});
const timeSchema = new mongoose.Schema({
    time: {
        type: Date
    }
});
exports.accountModel = mongoose.models.account || mongoose.model('account', accountSchema, 'account');
exports.timeModel = mongoose.models.time || mongoose.model('time', timeSchema, 'account');
