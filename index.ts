import * as Koa from 'koa'
import * as fs from 'fs'
import * as path from 'path'
import * as bodyParser from 'koa-body'
import * as serve from 'koa-static'
import * as config from 'config'
import * as cors from 'koa2-cors'
import * as shortid from 'shortid'
import chalk from 'chalk'
import nunjucks from 'koa-nunjucks-2' 

import indexRouter from './router'
import accountRouter from './router/account'
import apiTestRouter from './router/apiTest'
import githubApiRouter from './router/githubApi'
import uploadRouter from './router/upload'
import { mimeCollections } from './constants'

const hostname = config.get('host.hostname')
const port = config.get('host.port')
const staticDirPath = '.' + path.resolve(__dirname, '/static')

const app = new Koa()

try {
    /**指定静态资源目录 */
    app.use(serve(staticDirPath))

    /**模板引擎 */
    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, 'views'),
        nunjucksConfig: {
            trimBlocks: true 
        }
    }))

    /**解析post请求 */
    app.use(bodyParser({
        formidable:{
            uploadDir: __dirname + '/static', // directory where files will be uploaded
            keepExtensions: true,
            onFileBegin(_: any, file: any): any {
                const {
                    path: filePath,
                    type
                } = file

                const paths = filePath.split('/')
                const suffixReg = /^(.*)(\..*)$/
                const suffix = suffixReg.exec(paths[paths.length -1])[2]
                let dirName
                if (mimeCollections.imgType.includes(type)) {
                    dirName = 'imgs'
                } else if (mimeCollections.musicType.includes(type)) {
                    dirName = 'music'
                } else {
                    return null
                }
                                
                file.path = path.resolve(paths.slice(0, -1).join('/'), dirName, `${shortid.generate()}${suffix}`)
            }
        },
        multipart: true,
        urlencoded: true
    }))

    /**每次http请求都会通过app.use使用中间件 */
    app.use(async (ctx, next) => {
        const sTime = Date.now();
        await next();
        
        const eTime = Date.now();
        const log = `请求地址：${ctx.path},请求方法：${ctx.request.method},响应时间：${eTime - sTime}ms,响应状态:${ctx.response.status}--请求时间：${new Date()}\n`;
        console.log(chalk.green(log))
        fs.appendFileSync('./log/app.log', log);
    });

    // cors config
    app.use(cors())

    /**路由 */
    app.use(indexRouter.routes())
    app.use(accountRouter.routes())
    app.use(apiTestRouter.routes())
    app.use(githubApiRouter.routes())
    app.use(uploadRouter.routes())

    app.listen(port, () => {
        console.log(chalk.green(`server is running at ${hostname}:${port}`));
        console.log(process.env.NODE_ENV);
    });
} catch(err) {
    const errorLog = `${err.name},${err.message},${err.stack},${new Date()}`;
    fs.appendFileSync('./log/error.log', errorLog);
}