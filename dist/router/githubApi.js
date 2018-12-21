"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const Router = require("koa-router");
const axios_1 = require("axios");
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const routerInstance = new Router({
    prefix: '/oauth'
});
routerInstance
    .post('/authorize', async (ctx, _) => {
    const { code } = ctx.request.body;
    const { status, data } = await axios_1.default.post('https://github.com/login/oauth/access_token', {
        client_id: 'f6226fc2f9f77937df56',
        client_secret: '',
        code
    });
    if (status === 200) {
        ctx.body = utils_1.parseUrlQuery(data);
    }
    else {
        ctx.body = {};
    }
})
    .get('/feeds', async (ctx, _) => {
    const { status, data } = await axios_1.default.get('https://github.com/shenyiling?access_token=');
    if (status === 200) {
        ctx.body = data;
    }
    else {
        ctx.body = '';
    }
})
    .get('/:nickname/:format', async (ctx, _) => {
    const { nickname, format } = ctx.params;
    const { status, data } = await axios_1.default.get(`https://github.com/${nickname}`);
    const $ = cheerio.load(data);
    const contributionsData = $('rect').get().reduce((data, rect) => {
        const value = (() => {
            const count = $(rect).data('count');
            if (format === 'activity')
                return count > 0;
            if (format === 'count')
                return count;
        })();
        const [year, month, day] = $(rect).data('date').split('-').map((dateNum) => parseInt(dateNum));
        lodash_1.setWith(data, [year, month, day], value, Object);
        return data;
    }, {});
    ctx.body = contributionsData;
});
exports.default = routerInstance;
