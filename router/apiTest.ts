import * as controller from '../controller/apiTest'
import * as Router from 'koa-router'
const router = new Router({
    prefix: '/apiTest'
}) 

router.post('/time', controller.genOneDocument)

export default router