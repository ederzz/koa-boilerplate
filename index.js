const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-body')
const nunjucks = require('koa-nunjucks-2')
const serve = require('koa-static')
const config = require('config')
const fs = require('fs')
const chalk = require('chalk')
const cors = require('koa2-cors')
const shortid = require('shortid')

const initDb = require('./models/db')
const { mimeCollections } = require('./constants')
const { loadRoutes, requestLog, errorLog } = require('./utils')
const staticDirPath = '.' + path.resolve(__dirname, '/static')

const app = module.exports = new Koa()

if (!module.parent) {
    // error log
    app.use(requestLog)

    // request log
    app.use(errorLog)
}

// 指定静态资源目录
app.use(serve(staticDirPath))

// 模板引擎
app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true 
    }
}))

// 解析post请求
app.use(bodyParser({
    formidable:{
        uploadDir: __dirname + '/static', // directory where files will be stored
        keepExtensions: true,
        onFileBegin(name, file) {
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
                            
            file.path = path.resolve(
                paths.slice(0, -1).join('/'), 
                dirName, `${shortid.generate()}${suffix}`
            )
        }
    },
    multipart: true,
    urlencoded: true
}))

// cors config
app.use(cors())

// routes
loadRoutes(app)

// connect db
initDb()
    .on('error', console.log)
    .on('disconnected', initDb)
    .on('open', listen)

function listen() {
    if (!module.parent) {
        const hostname = config.get('host.hostname')
        const port = config.get('host.port')

        app.listen(port, () => {
            console.log(chalk.green(`server is running at ${hostname}:${port}`))
            console.log('env:' + process.env.NODE_ENV)
        })
    }
}