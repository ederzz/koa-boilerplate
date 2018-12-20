"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("config");
const hostname = config_1.default.get('host.hostname');
const port = config_1.default.get('host.port');
const koa_router_1 = require("koa-router");
const routerInstance = new koa_router_1.default({
    prefix: '/upload'
});
routerInstance.post('/file', (ctx, _) => {
    const { files: { file: { path } } } = ctx.request;
    const reg = /^.*koa-introduction\/static\/(.*)$/;
    ctx.body = {
        uploadPath: `${hostname}:${port}/${reg.exec(path)[1]}`
    };
});
exports.default = routerInstance;
