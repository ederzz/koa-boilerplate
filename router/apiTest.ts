import * as controller from '../controller/apiTest'
import * as Router from 'koa-router'
const router = new Router({
    prefix: '/apiTest'
}) 

router.post('/time', controller.genOneDocument) // TODO 数据库连接

export default router