"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../controller/account");
const Router = require("koa-router");
const routerInstance = new Router({
    prefix: '/account'
});
routerInstance
    .post('/signup', account_1.default.signUp)
    .post('/signin', account_1.default.signIn)
    .post('/reset', account_1.default.update)
    .get('/name', account_1.default.queryAccount)
    .get('/queryByid', account_1.default.queryById);
exports.default = routerInstance;
