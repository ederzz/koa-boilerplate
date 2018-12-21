"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const path = require("path");
const filePath = path.resolve(__dirname, '../static/css/test.css');
const router = new Router();
router.get('/', async (ctx, _) => {
    ctx.body = 'test';
});
exports.default = router;
