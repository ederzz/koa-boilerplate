const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

/**解析post请求 */
app.use(bodyParser());

/**每次http请求都会通过app.use使用中间件 */
app.use(async (ctx, next) => {
    const sTime = Date.now();
    await next();
    
    const eTime = Date.now();
    console.log(`请求地址：${ctx.path}, 请求方法：${ctx.request.method}, 响应时间：${eTime - sTime}ms`);
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is running.');
});