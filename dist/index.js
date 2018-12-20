"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = require("koa");
const fs_1 = require("fs");
const path_1 = require("path");
const koa_body_1 = require("koa-body");
const koa_nunjucks_2_1 = require("koa-nunjucks-2");
const koa_static_1 = require("koa-static");
const config_1 = require("config");
const chalk_1 = require("chalk");
const koa2_cors_1 = require("koa2-cors");
const shortid_1 = require("shortid");
const router_1 = require("./router");
const account_1 = require("./router/account");
const apiTest_1 = require("./router/apiTest");
const githubApi_1 = require("./router/githubApi");
const upload_1 = require("./router/upload");
const constants_1 = require("./constants");
const hostname = config_1.default.get('host.hostname');
const port = config_1.default.get('host.port');
const staticDirPath = '.' + path_1.default.resolve(__dirname, '/static');
const app = new koa_1.default();
try {
    app.use(koa_static_1.default(staticDirPath));
    app.use(koa_nunjucks_2_1.default({
        ext: 'html',
        path: path_1.default.join(__dirname, 'views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }));
    app.use(koa_body_1.default({
        formidable: {
            uploadDir: __dirname + '/static',
            keepExtensions: true,
            onFileBegin(_, file) {
                const { path: filePath, type } = file;
                const paths = filePath.split('/');
                const suffixReg = /^(.*)(\..*)$/;
                const suffix = suffixReg.exec(paths[paths.length - 1])[2];
                let dirName;
                if (constants_1.mimeCollections.imgType.includes(type)) {
                    dirName = 'imgs';
                }
                else if (constants_1.mimeCollections.musicType.includes(type)) {
                    dirName = 'music';
                }
                else {
                    return null;
                }
                file.path = path_1.default.resolve(paths.slice(0, -1).join('/'), dirName, `${shortid_1.default.generate()}${suffix}`);
            }
        },
        multipart: true,
        urlencoded: true
    }));
    app.use(async (ctx, next) => {
        const sTime = Date.now();
        await next();
        const eTime = Date.now();
        const log = `请求地址：${ctx.path},请求方法：${ctx.request.method},响应时间：${eTime - sTime}ms,响应状态:${ctx.response.status}--请求时间：${new Date()}\n`;
        console.log(chalk_1.default.green(log));
        fs_1.default.appendFileSync('./log/app.log', log);
    });
    app.use(koa2_cors_1.default());
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
    fs_1.default.appendFileSync('./log/error.log', errorLog);
}
