"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = require("koa-router");
const fs_1 = require("fs");
const path_1 = require("path");
const index_1 = require("../controller/index");
const filePath = path_1.default.resolve(__dirname, '../static/css/test.css');
const routerInstance = new koa_router_1.default();
routerInstance.get('/', index_1.default.index)
    .get('/query', index_1.default.query)
    .get('/test', index_1.default.test)
    .get('/param/:id', index_1.default.param)
    .post('/user', index_1.default.addUser)
    .all('/test', index_1.default.all)
    .get('/static', async (ctx, _) => {
    ctx.body = fs_1.default.readFileSync(filePath);
    return filePath;
});
exports.default = routerInstance;
