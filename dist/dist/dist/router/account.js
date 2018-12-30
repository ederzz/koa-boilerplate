"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const accountController = require("../controller/account");
const Router = require("koa-router");
const router = new Router({
    prefix: '/account'
});
router
    .post('/signup', accountController.signUp)
    .post('/signin', accountController.signIn)
    .post('/reset', accountController.update)
    .get('/name', accountController.queryAccount)
    .get('/queryByid', accountController.queryById);
exports.default = router;
