import { Context } from 'koa'
import { accountModel } from '../../models'
import * as helper from './helper'
import validateObj from './validate'

const {
    signup,
    accountUpdate,
    queryByName,
    queryById
} = validateObj

export = {
    signUp: async (ctx: Context, next: Function) => {
        const validateRes = helper.joiValite('request body')(ctx.request.body, signup)
        if(validateRes) {
            ctx.body = validateRes
            return ;
        }

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
            console.error('插入失败', cResult.errors);
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
    signIn: async (ctx: Context, next: Function) => {
        const validateRes = helper.joiValite('request body')(ctx.request.body, signup)
        if(validateRes) {
            ctx.body = validateRes
            return ;
        }

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
    update: async (ctx: Context, next: Function) => {
        const validateRes = helper.joiValite('request body')(ctx.request.body, accountUpdate)
        if(validateRes) {
            ctx.body = validateRes
            return ;
        }

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
    },
    queryAccount: async (ctx: Context, _: Function) => {
        try {
            const validateRes = helper.joiValite('request query')(ctx.request.query, queryByName)
            if(validateRes) {
                ctx.body = validateRes
                return ;
            }

            const {
                name
            } = ctx.request.query
            
            const result = await accountModel.findOne({
                accountName: name
            })

            ctx.body = result
        } catch (error) {
            throw error
        }
    },
    queryById: async (ctx: Context, _: Function) => {
        try {
            const validateRes = helper.joiValite('request query')(ctx.request.query, queryById)
            if(validateRes) {
                ctx.body = validateRes
                return ;
            }

            const {
                id
            } = ctx.request.query

            // console.log(ObjectId(id))
            const result = await accountModel.findById({
                _id: id // 或者可以转换为ObjectId
            })

            ctx.body = result
        } catch (error) {
            throw error
        }
    }
}