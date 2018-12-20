"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiTest_1 = require("../controller/apiTest");
const koa_router_1 = require("koa-router");
const routerInstance = new koa_router_1.default({
    prefix: '/apiTest'
});
routerInstance.post('/time', apiTest_1.default.genOneDocument);
exports.default = routerInstance;
