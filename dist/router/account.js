const router = require('koa-router')({
    prefix: '/account'
});
const accountController = require('../controller/account');
router
    .post('/signup', accountController.signUp)
    .post('/signin', accountController.signIn)
    .post('/reset', accountController.update)
    .get('/name', accountController.queryAccount)
    .get('/queryByid', accountController.queryById);
module.exports = router;
