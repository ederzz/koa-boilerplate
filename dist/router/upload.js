const router = require('koa-router')({
    prefix: '/upload'
});
const config = require('config');
const hostname = config.get('host.hostname');
const port = config.get('host.port');
router.post('/file', (ctx, _) => {
    const { files: { file: { path } } } = ctx.request;
    const reg = /^.*koa-introduction\/static\/(.*)$/;
    ctx.body = {
        uploadPath: `${hostname}:${port}/${reg.exec(path)[1]}`
    };
});
module.exports = router;
