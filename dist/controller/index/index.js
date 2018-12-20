"use strict";
module.exports = {
    index: (ctx, next) => {
        console.log(ctx.request.header);
        ctx.body = 'here is home.';
    },
    query: (ctx, next) => {
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
    param: (ctx, next) => {
        ctx.body = `参数存放在url中,用户id：${ctx.params.id}`;
    },
    addUser: (ctx, next) => {
        const { name, age } = ctx.request.body;
        ctx.body = `post传参：${age}岁的${name}`;
    },
    all: (ctx, next) => {
        console.log('路由处理中间件。');
    }
};
