const router = require('koa-router')({
    prefix: '/oauth'
}) 
const axios = require('axios')
const { parseUrlQuery } = require('../utils')

router
.post('/authorize', async (ctx, _) => {
    const { code } = ctx.request.body
    const {
        status,
        data
    } = await axios.post('https://github.com/login/oauth/access_token', {
        client_id: 'f6226fc2f9f77937df56',
        client_secret: '',
        code
    })

    if (status === 200) {
        ctx.body = parseUrlQuery(data)
    } else {
        ctx.body = {}
    }
})
.get('/feeds', async (ctx, _) => {
    const {
        status,
        data
    } = await axios.get('https://github.com/shenyiling?access_token=')
    if (status === 200) {
        ctx.body = data
    } else {
        ctx.body = ''
    }
})


module.exports = router