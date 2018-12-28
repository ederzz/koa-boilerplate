"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = require("../controller/apiTest");
const Router = require("koa-router");
const router = new Router({
    prefix: '/apiTest'
});
router.post('/time', controller.genOneDocument);
exports.default = router;
