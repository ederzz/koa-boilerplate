import config from 'config'
const hostname = config.get('host.hostname')
const port = config.get('host.port')
import router from 'koa-router'
const routerInstance = new router({
    prefix: '/upload'
})

routerInstance.post('/file', (ctx, _) => {
    const {
        files: {
            file: {
                path
            }
        }
    } = ctx.request
    const reg = /^.*koa-introduction\/static\/(.*)$/
    
    ctx.body = {
        uploadPath: `${hostname}:${port}/${reg.exec(path)[1]}`
    }
})

export default routerInstance