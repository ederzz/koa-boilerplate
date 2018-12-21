"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const fs = require("fs");
const config = require("config");
const cors = require("koa2-cors");
const chalk_1 = require("chalk");
const router_1 = require("./router");
const account_1 = require("./router/account");
const apiTest_1 = require("./router/apiTest");
const githubApi_1 = require("./router/githubApi");
const upload_1 = require("./router/upload");
const hostname = config.get('host.hostname');
const port = config.get('host.port');
const app = new Koa();
try {
    app.use(async (ctx, next) => {
        const sTime = Date.now();
        await next();
        const eTime = Date.now();
        const log = `请求地址：${ctx.path},请求方法：${ctx.request.method},响应时间：${eTime - sTime}ms,响应状态:${ctx.response.status}--请求时间：${new Date()}\n`;
        console.log(chalk_1.default.green(log));
        fs.appendFileSync('./log/app.log', log);
    });
    app.use(cors());
    app.use(router_1.default.routes());
    app.use(account_1.default.routes());
    app.use(apiTest_1.default.routes());
    app.use(githubApi_1.default.routes());
    app.use(upload_1.default.routes());
    app.listen(port, () => {
        console.log(chalk_1.default.green(`server is running at ${hostname}:${port}`));
        console.log(process.env.NODE_ENV);
    });
}
catch (err) {
    const errorLog = `${err.name},${err.message},${err.stack},${new Date()}`;
    fs.appendFileSync('./log/error.log', errorLog);
}
