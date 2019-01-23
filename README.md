# koa-introduction
> [typescript版本](https://github.com/shenyiling/typescript-node-boilerplate)，添加了部分新内容

koa application boilerplate.

## Usage
```
git clone git@github.com:shenyiling/koa-boilerplate.git
npm i && npm start
```

## 其他命令说明

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
