"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const valiateObj = {
    signup: Joi.object().keys({
        accountName: Joi.string().trim().min(1).required(),
        accountPwd: Joi.string().trim().min(1).required()
    }),
    accountUpdate: Joi.object().keys({
        accountName: Joi.string().trim().min(1).required(),
        accountPwd: Joi.string().trim().min(1).required(),
        newPwd: Joi.string().trim().min(1).required()
    }),
    queryByName: Joi.object().keys({
        name: Joi.string().trim().min(1).required()
    }),
    queryById: Joi.object().keys({
        id: Joi.string().trim().min(1).required()
    }),
};
exports.default = valiateObj;
