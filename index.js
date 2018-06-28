const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2');
const serve = require('koa-static');
const config = require('config');
const fs = require('fs');
const chalk = require('chalk')

const hostname = config.get('host.hostname');
const port = config.get('host.port');
const indexRouter = require('./router');
const accountRouter = require('./router/account');
const apiTestRouter = require('./router/apiTest')

const app = new Koa();

try {
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
        const log = `请求地址：${ctx.path},请求方法：${ctx.request.method},响应时间：${eTime - sTime}ms,响应状态:${ctx.response.status}--请求时间：${new Date()}\n`;
        console.log(chalk.green(log))
        fs.appendFileSync('./log/app.log', log, err => {
            if(err) {
                throw err;
            }
        });
    });

    /**路由 */
    app.use(indexRouter.routes())
    app.use(accountRouter.routes())
    app.use(apiTestRouter.routes())

    app.listen(port, () => {
        console.log(chalk.green(`server is running at ${hostname}:${port}`));
        console.log(process.env.NODE_ENV);
    });
} catch(err) {
    const errorLog = `${err.name},${err.message},${err.stack},${new Date()}`;
    fs.appendFileSync('./log/error.log', errorLog);
}