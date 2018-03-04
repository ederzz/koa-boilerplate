/**如果每个路由的业务逻辑更加复杂，还可以再抽离服务层 helper service都可以 */
module.exports = {
    index: async (ctx, next) => {
        ctx.response.body = 'here is home.';
    },
    home: async (ctx, next) => {
        // 参数放在url后面：?a=1&b=2
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.response.body = 'here is home page.';
    },
    test: async (ctx, next) => {
        await ctx.render('test', {
            pageName: '这里是test页面'
        });
        await next();
    },
    user: async (ctx, next) => {
        // 参数放在url中
        ctx.response.body = `用户id：${ctx.params.id}`;
    },
    addUser: async (ctx, next) => {
        const {
            name,
            age
        } = ctx.request.body;
        ctx.response.body = `${age}岁的${name}`;
    },
    all: async (ctx, next) => {
        console.log('路由处理中间件。');
    }
}