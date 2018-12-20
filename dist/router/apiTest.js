const router = require('koa-router')({
    prefix: '/apiTest'
});
const controller = require('../controller/apiTest');
router.post('/time', controller.genOneDocument);
module.exports = router;
