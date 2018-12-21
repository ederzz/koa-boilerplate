"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiTest_1 = require("../controller/apiTest");
const Router = require("koa-router");
const routerInstance = new Router({
    prefix: '/apiTest'
});
routerInstance.post('/time', apiTest_1.default.genOneDocument);
exports.default = routerInstance;
