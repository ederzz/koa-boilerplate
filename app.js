const Koa = require('koa');
const app = new Koa();
const router = require('./routes');

/**每次http请求都会通过app.use使用中间件 */
app.use(async (ctx, next) => {
    const sTime = Date.now();
    await next();
    
    const eTime = Date.now();
    console.log(`请求地址：${ctx.path}, 响应时间：${eTime - sTime}ms`);
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is running.');
});