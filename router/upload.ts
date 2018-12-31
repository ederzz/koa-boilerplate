import config = require('config')
import * as Router from 'koa-router'

const hostname: string = config.get('host.hostname')
const port: number = config.get('host.port')
const router = new Router({
    prefix: '/upload'
})

router.post('/file', (ctx, _) => {
    const {
        files: {
            file: {
                path
            }
        }
    } = ctx.request

    const reg: RegExp = /^.*koa-introduction\/static\/(.*)$/
    ctx.body = {
        uploadPath: `${hostname}:${port}/${reg.exec(path)[1]}`
    }
})
// TODO 上传，postman如何测试上传
export default router