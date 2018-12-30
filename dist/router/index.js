"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const fs = require("fs");
const path = require("path");
const homeController = require("../controller/index");
const filePath = path.resolve(__dirname, '../static/css/test.css');
const router = new Router();
router.get('/', async (ctx, _) => {
    ctx.body = 'test';
})
    .get('/query', homeController.query)
    .get('/test', homeController.test)
    .get('/param/:id', homeController.param)
    .post('/user', homeController.addUser)
    .get('/static', async (ctx, _) => {
    ctx.body = fs.readFileSync(filePath);
    return filePath;
});
exports.default = router;
