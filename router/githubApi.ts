import * as cheerio from 'cheerio'
import * as Router from 'koa-router'
import axios from 'axios'
import { setWith } from 'lodash'
import utils from '../utils'

type Month = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
interface MonthContributions {
    [k: string]: boolean | number
}
interface Contributions {
    [k: string]: Record<Month, MonthContributions>
}

const { parseUrlQuery, Base64 } = utils
const router = new Router({
    prefix: '/oauth'
}) 

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
.get('/:nickname/:format', async (ctx, _) => {
    const {
        nickname,
        format
    } = ctx.params
    const {
        status,
        data
    } = await axios.get(`https://github.com/${nickname}`)
    const $: CheerioStatic = cheerio.load(data)
    const contributionsData: Contributions = $('rect').get().reduce((data, rect) => {
      // Parse contributions value
      const value: string | boolean = (() => {
        const count = $(rect).data('count');
        if (format === 'activity') return count > 0;
        if (format === 'count') return count;
      })();

      // Parse contributions date
      const [year, month, day] = $(rect).data('date').split('-').map(
        (dateNum: string) => parseInt(dateNum));
      setWith(data, [year, month, day], value, Object);

      return data;
    }, {});
    ctx.body = contributionsData
})

export default router