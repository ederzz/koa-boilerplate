"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const hostname = config.get('host.hostname');
const port = config.get('host.port');
const Router = require("koa-router");
const router = new Router({
    prefix: '/upload'
});
router.post('/file', (ctx, _) => {
    const { files: { file: { path } } } = ctx.request;
    const reg = /^.*koa-introduction\/static\/(.*)$/;
    ctx.body = {
        uploadPath: `${hostname}:${port}/${reg.exec(path)[1]}`
    };
});
exports.default = router;
