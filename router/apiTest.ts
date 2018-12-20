import controller from '../controller/apiTest'
import router from 'koa-router'
const routerInstance = new router({
    prefix: '/apiTest'
}) 

routerInstance.post('/time', controller.genOneDocument)

export default routerInstance