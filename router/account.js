const router = require('koa-router')({
    prefix: '/account'
});
const accountController = require('../controller/account');

router
.post('/signup', accountController.signUp)  // 注册
.post('/signin', accountController.signIn)  // 登录
.post('/reset', accountController.update)  // 修改密码

module.exports = router;
