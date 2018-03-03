const Router = require('koa-router');
const router = new Router();

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

router.get('/', async (ctx, next) => {
    ctx.response.body = 'here is home.';
})
.get('/test', async (ctx, next) => {
    ctx.response.body = 'hree is test.';
    await next();
})
.get('/user/:id', async (ctx, next) => {
    ctx.response.body = `用户id：${ctx.params.id}`;
})
.all('/test', async (ctx, next) => {
    console.log('路由处理中间件。');
});

module.exports = router;