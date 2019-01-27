module.exports = {
    index: (ctx, next) => {
        ctx.body = 'here is home.'
    },
    query: (ctx, next) => {
        // 参数放在url后面：?a=1&b=2
        ctx.body = `参数存放在url后面，${ctx.request.querystring}`
    },
    test: async (ctx, next) => {
        await ctx.render('test', {
            pageName: '这里是模板引擎和静态资源处理测试页面'
        })
    },
    param: (ctx, next) => {
        // 参数放在url中
        ctx.body = `参数存放在url中，用户id:${ctx.params.id}`
    },
    addUser: (ctx, next) => {
        const {
            name,
            age
        } = ctx.request.body
        ctx.body = `post传参：${age}岁的${name}`
    },
    all: (ctx, next) => {
        ctx.body = 'request method is all.'
    }
}