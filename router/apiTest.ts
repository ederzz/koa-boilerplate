import controller from '../controller/apiTest'
import * as Router from 'koa-router'
const routerInstance = new Router({
    prefix: '/apiTest'
}) 

routerInstance.post('/time', controller.genOneDocument)

export default routerInstance