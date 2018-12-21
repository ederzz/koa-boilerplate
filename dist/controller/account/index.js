"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const helper = require("./helper");
const validate_1 = require("./validate");
const { signup, accountUpdate, queryByName, queryById } = validate_1.default;
exports.default = {
    signUp: async (ctx, next) => {
        const validateRes = helper.joiValite('request body')(ctx.request.body, signup);
        if (validateRes) {
            ctx.body = validateRes;
            return;
        }
        const { accountName, accountPwd } = ctx.request.body;
        const result = await models_1.accountModel.findOne({ accountName });
        if (result) {
            ctx.body = {
                status: false,
                message: '已存在该用户名'
            };
            return;
        }
        const cResult = await models_1.accountModel.create({
            accountName,
            accountPwd: helper.md5Encrypt(accountPwd)
        });
        if (cResult.errors) {
            console.error('插入失败', cResult.errors);
            ctx.body = {
                status: false,
                message: '数据插入失败'
            };
        }
        else {
            ctx.body = {
                status: true,
                message: '数据插入成功'
            };
        }
    },
    signIn: async (ctx, next) => {
        const validateRes = helper.joiValite('request body')(ctx.request.body, signup);
        if (validateRes) {
            ctx.body = validateRes;
            return;
        }
        const { accountName, accountPwd } = ctx.request.body;
        const res = await models_1.accountModel.findOne({
            accountName,
            accountPwd: helper.md5Encrypt(accountPwd)
        });
        if (!res) {
            ctx.body = {
                status: false,
                message: '用户名或密码出错'
            };
            return;
        }
        ctx.body = {
            status: true,
            message: '登录成功'
        };
        return;
    },
    update: async (ctx, next) => {
        const validateRes = helper.joiValite('request body')(ctx.request.body, accountUpdate);
        if (validateRes) {
            ctx.body = validateRes;
            return;
        }
        const { accountName, accountPwd, newPwd } = ctx.request.body;
        const res = await models_1.accountModel.findOne({
            accountName,
            accountPwd: helper.md5Encrypt(accountPwd)
        });
        if (!res) {
            ctx.body = {
                status: false,
                message: '用户名或密码出错'
            };
            return;
        }
        const uRes = await models_1.accountModel.updateOne({ accountName }, { accountPwd: helper.md5Encrypt(newPwd) });
        if (uRes.errors) {
            ctx.body = {
                status: false,
                message: '更新失败'
            };
            return;
        }
        ctx.body = {
            status: true,
            message: '数据更新成功'
        };
        return;
    },
    queryAccount: async (ctx, _) => {
        try {
            const validateRes = helper.joiValite('request query')(ctx.request.query, queryByName);
            if (validateRes) {
                ctx.body = validateRes;
                return;
            }
            const { name } = ctx.request.query;
            const result = await models_1.accountModel.findOne({
                accountName: name
            });
            ctx.body = result;
        }
        catch (error) {
            throw error;
        }
    },
    queryById: async (ctx, _) => {
        try {
            const validateRes = helper.joiValite('request query')(ctx.request.query, queryById);
            if (validateRes) {
                ctx.body = validateRes;
                return;
            }
            const { id } = ctx.request.query;
            const result = await models_1.accountModel.findById({
                _id: id
            });
            ctx.body = result;
        }
        catch (error) {
            throw error;
        }
    }
};
