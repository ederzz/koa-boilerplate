将`index.js`下面的启动数据库的代码：
```
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
```
修改为：
```
// connect db
initDb()
    .on('error', console.log)

listen()

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
```