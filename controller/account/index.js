const accountModel = require('../../models');
const helper = require('./helper');

module.exports = {
    signUp: async (ctx, next) => {
        const {
            accountName,
            accountPwd
        } = ctx.request.body;

        const result = await accountModel.findOne({ accountName });

        if(result) {
            /**数据库中已存在该账户名 */
            ctx.body = {
                status: false,
                message: '已存在该用户名'
            };
            return ;
        }

        const cResult = await accountModel.create({
            accountName,
            accountPwd: helper.md5Encrypt(accountPwd)
        });

        if(cResult.errors) {
            console.errorsor('插入失败', cResult.errors);
            ctx.body = {
                status: false,
                message: '数据插入失败'
            }
        } else {
            ctx.body = {
                status: true,
                message: '数据插入成功'
            };
        }

    },
    signIn: async (ctx, next) => {
        const {
            accountName,
            accountPwd
        } = ctx.request.body;

        const res = await accountModel.findOne({
            accountName,
            accountPwd: helper.md5Encrypt(accountPwd)
        });

        if(!res) {
            ctx.body = {
                status: false,
                message: '用户名或密码出错'
            };
            return ;
        }
        ctx.body = {
            status: true,
            message: '登录成功'
        };
        return ;

    },
    update: async (ctx, next) => {
        const {
            accountName,
            accountPwd,
            newPwd
        } = ctx.request.body;

        const res = await accountModel.findOne({
            accountName,
            accountPwd: helper.md5Encrypt(accountPwd)
        });

        if(!res) {
            ctx.body = {
                status: false,
                message: '用户名或密码出错'
            };
            return ;
        }
        const uRes = await accountModel.updateOne({ accountName }, { accountPwd: helper.md5Encrypt(newPwd) });
        if(uRes.errors) {
            ctx.body = {
                status: false,
                message: '更新失败'
            };
            return ;
        }
        ctx.body = {
            status: true,
            message: '数据更新成功'
        };
        return ;
    }
}