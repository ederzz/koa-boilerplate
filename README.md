### koa-iintroduction
一个koa项目，搭配各种koa插件，使用mongoDB作数据库存储(本地数据库名称为`koaIntroduction`,你也可以到config文件夹下面的配置文件进行查看),使用[config](https://www.npmjs.com/package/config)作项目配置

 - 使用`koa-router`进行路由处理
 - 使用`koa-bodyparser`解析`post`请求`body`内容
 - 使用`koa-nunjucks-2`作为模板引擎
 - 使用`koa-static`进行处理静态文件
 - 使用`mongoose`链接`mongoDB`数据库
 - 使用`config`模块管理配置文件

### 项目目录结构
 ```
├─config                    配置文件
├─controller                具体的路由处理函数
│  ├─account
│  └─index
├─models                    数据库模型
├─router                    路由处理
├─static                    静态文件
│  └─css
├─views                     html模板
└─index.js                  程序入口                     
 ```

