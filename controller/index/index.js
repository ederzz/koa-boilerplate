module.exports = {
    index: async (ctx, next) => {
        ctx.body = 'here is home.';
    },
    query: async (ctx, next) => {
        // 参数放在url后面：?a=1&b=2
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.body = '参数存放在url后面';
    },
    test: async (ctx, next) => {
        await ctx.render('test', {
            pageName: '这里是模板引擎和静态资源处理测试页面'
        });
        await next();
    },
    param: async (ctx, next) => {
        // 参数放在url中
        ctx.body = `参数存放在url中,用户id：${ctx.params.id}`;
    },
    addUser: async (ctx, next) => {
        const {
            name,
            age
        } = ctx.request.body;
        ctx.body = `post传参：${age}岁的${name}`;
    },
    all: async (ctx, next) => {
        console.log('路由处理中间件。');
    }
}