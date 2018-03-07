const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const serve = require('koa-static');

const indexRouter = require('./router');
const accountRouter = require('./router/account');

const app = new Koa();

/**指定静态资源目录 */
app.use(serve(path.resolve(__dirname, "./static")));

/**模板引擎 */
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true 
    }
}));

/**解析post请求 */
app.use(bodyParser());

/**每次http请求都会通过app.use使用中间件 */
app.use(async (ctx, next) => {
    const sTime = Date.now();
    await next();
    
    const eTime = Date.now();
    console.log(`请求地址：${ctx.path}, 请求方法：${ctx.request.method}, 响应时间：${eTime - sTime}ms`);
});

app.use(indexRouter.routes());
app.use(accountRouter.routes());

app.listen(3000, () => {
    console.log('server is running.');
});