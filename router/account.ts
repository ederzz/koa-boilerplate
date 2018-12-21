import accountController from '../controller/account'
import * as Router from 'koa-router'
const routerInstance = new Router({
    prefix: '/account'
});

routerInstance
.post('/signup', accountController.signUp)  // 注册
.post('/signin', accountController.signIn)  // 登录
.post('/reset', accountController.update)  // 修改密码
.get('/name', accountController.queryAccount)
.get('/queryByid', accountController.queryById)

export default routerInstance