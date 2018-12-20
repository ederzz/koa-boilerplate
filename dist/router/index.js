const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, '../static/css/test.css');
const homeController = require('../controller/index');
router.get('/', homeController.index)
    .get('/query', homeController.query)
    .get('/test', homeController.test)
    .get('/param/:id', homeController.param)
    .post('/user', homeController.addUser)
    .all('/test', homeController.all)
    .get('/static', async (ctx, _) => {
    ctx.body = fs.readFileSync(filePath);
    return filePath;
});
module.exports = router;
