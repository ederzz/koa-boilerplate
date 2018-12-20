import router from 'koa-router';
import fs from 'fs'
import path from 'path'
import homeController from '../controller/index';

const filePath = path.resolve(__dirname, '../static/css/test.css')
const routerInstance = new router()

/**路由前缀设置 */
// const router = new Router({
//     prefix: '/user'
// });

/**路由命名 */
// router.url('user'); => 路由： /user

/**多个中间件 */
// router.get(
//     '/users/:id',
//     (ctx, next) => {
//       return User.findOne(ctx.params.id).then(function(user) {
//         ctx.user = user;
//         next();
//       });
//     },
//     ctx => {
//       console.log(ctx.user);
//       // => { id: 17, name: "Alex" }
//     }
// );

/**路由嵌套 */
// const forums = new Router();
// const posts = new Router();
 
// posts.get('/', (ctx, next) => {...});
// posts.get('/:pid', (ctx, next) => {...});
// forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 
// // responds to "/forums/123/posts" and "/forums/123/posts/123"
// app.use(forums.routes());

/**路由跳转 */
// router.redirect('sign-in');

routerInstance.get('/', homeController.index)
.get('/query', homeController.query)
.get('/test', homeController.test)
.get('/param/:id', homeController.param)
.post('/user', homeController.addUser)
.all('/test', homeController.all)
.get('/static', async (ctx, _) => {
    ctx.body = fs.readFileSync(filePath)
    return filePath
})

export default routerInstance