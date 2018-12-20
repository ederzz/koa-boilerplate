"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const valiateObj = {
    signup: joi_1.default.object().keys({
        accountName: joi_1.default.string().trim().min(1).required(),
        accountPwd: joi_1.default.string().trim().min(1).required()
    }),
    accountUpdate: joi_1.default.object().keys({
        accountName: joi_1.default.string().trim().min(1).required(),
        accountPwd: joi_1.default.string().trim().min(1).required(),
        newPwd: joi_1.default.string().trim().min(1).required()
    }),
    queryByName: joi_1.default.object().keys({
        name: joi_1.default.string().trim().min(1).required()
    }),
    queryById: joi_1.default.object().keys({
        id: joi_1.default.string().trim().min(1).required()
    }),
};
exports.default = valiateObj;
