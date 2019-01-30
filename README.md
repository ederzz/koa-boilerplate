# koa-introduction
> [typescript版本](https://github.com/shenyiling/typescript-node-boilerplate)，文件内容有所不同

koa application boilerplate.

## Usage
>运行前先启动MongoDB服务，或者[修改index.js文件](https://github.com/shenyiling/koa-boilerplate/blob/master/start-ignore-db.md)
```
git clone git@github.com:shenyiling/koa-boilerplate.git
npm i && npm start
```

## npm scripts
```Shell
yarn dev // 文件修改后，自动重启
yarn debug // 通过google浏览器控制台进行断点调试
yarn test // 运行测试文件
```

## docker启动项目
>先安装`docker`

1.项目目录下：`docker build -t koa_bolilerplate .`  
2.拉去mongo镜像：`docker pull mongo`  
3.创建mongo容器：`docker run --name mongo -d -p 27017:27017 mongo`  
4.创建爱你koa-boilerplate容器：`docker run --name koa-boilerplate -d -p 3002:3002 -e NODE_ENV='docker' --link mongo:mongo koa_bolilerplate`

## 项目目录结构
```
├── config                  应用配置目录
│   ├── default.json        默认配置
│   └── production.json     生产环境配置
├── controller              路由处理逻辑目录
│   ├── account             
│   │   ├── helper.js       工具函数
│   │   ├── index.js
│   │   └── validate.js     接口参数验证文件
│   └── index               
│       ├── helper.js
│       └── index.js
├── log                     日志目录
│   ├── app.log
│   └── error.log
├── models                  数据库模型目录
│   ├── db.js               链接MongoDB数据库
│   └── index.js            数据库模型
├── router                  应用路由目录
│   ├── account.js
│   ├── githubApi.js
│   ├── index.js
│   └── upload.js
├── static                  静态资源目录  
├── utils.js                工具函数文件
├── views                   html模板目录
│   └── test.html
├── index.js                应用主文件
├── constants.js            js常量文件
├── Dockerfile              docker file
├── README.md
├── nodemon.json            nodemon配置文件
├── package.json
├── package-lock.json
└── yarn.lock
```
