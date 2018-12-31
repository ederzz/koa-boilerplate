import { Context } from 'koa'

const {
    timeModel
} = require('../../models')

export const genOneDocument = async (ctx: Context, _: Function) => {
    try {
        await timeModel.create({
            time: Date.now()
        })

        ctx.body = '创建成功'
    } catch (error) {
        throw error
    }
}