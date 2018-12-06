const router =  require('koa-router')({
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
    const reg = /^.*koa-introduction\/static\/(.*)$/
    
    ctx.body = {
        uploadPath: `localhost:3002/${reg.exec(path)[1]}`
    }
})

module.exports = router