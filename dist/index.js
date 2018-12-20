"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = require("koa");
const path = require('path');
const bodyParser = require('koa-body');
const nunjucks = require('koa-nunjucks-2');
const serve = require('koa-static');
const config = require('config');
const fs = require('fs');
const chalk = require('chalk');
const cors = require('koa2-cors');
const shortid = require('shortid');
const hostname = config.get('host.hostname');
const port = config.get('host.port');
const indexRouter = require('./router');
const accountRouter = require('./router/account');
const apiTestRouter = require('./router/apiTest');
const githubApiRouter = require('./router/githubApi');
const uploadRouter = require('./router/upload');
const staticDirPath = '.' + path.resolve(__dirname, '/static');
const { mimeCollections } = require('./constants');
const app = new koa_1.default();
try {
    app.use(serve(staticDirPath));
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, 'views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));
    app.use(async (ctx, next) => {
        const sTime = Date.now();
        await next();
        const eTime = Date.now();
        const log = `请求地址：${ctx.path},请求方法：${ctx.request.method},响应时间：${eTime - sTime}ms,响应状态:${ctx.response.status}--请求时间：${new Date()}\n`;
        console.log(chalk.green(log));
        fs.appendFileSync('./log/app.log', log, (err) => {
            if (err) {
                throw err;
            }
        });
    });
    app.use(cors());
    app.use(indexRouter.routes());
    app.use(accountRouter.routes());
    app.use(apiTestRouter.routes());
    app.use(githubApiRouter.routes());
    app.use(uploadRouter.routes());
    app.listen(port, () => {
        console.log(chalk.green(`server is running at ${hostname}:${port}`));
        console.log(process.env.NODE_ENV);
    });
}
catch (err) {
    const errorLog = `${err.name},${err.message},${err.stack},${new Date()}`;
    fs.appendFileSync('./log/error.log', errorLog);
}
