> 目录结构和原项目一致，增加`dist`目录作为`ts`编译文件存放位置
#### 项目命令说明
> 详细命令可查看`package.json`内的`scripts`字段

 - `npm start`：编译`ts`文件并运行
 - `npm run build`： 编译`ts`文件
 - `npm run ts_node`：通过`ts node`运行项目，`--files`项目是为了启动时加载`tsconfig.json`里的文件，默认是不加载的，这意味着你在`tsconfig.json`中配置的一些`.d.ts`会失效，编译时会报`can't find module xxx`等错误
 - `npm run dev`： 通过`nodemon`监听`ts`文件改变，并重新编译运行

#### `nodemon.json`配置文件说明
```Typescript
{
    "ignore": ["**/*.test.ts", "**/*.spec.ts", ".git", "node_modules"], // 忽略监听文件
    "watch": ["."], // 监听目录
    "exec": "npm start", // 监听变化后执行npm start命令
    "ext": "ts" // 监听ts文件
}
```