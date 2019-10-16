const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.all('/*', async (ctx, next) => {
  // 代表允许来自所有域名请求
  ctx.set('Access-Control-Allow-Origin', '*')
  // 其他一些设置...
  await next()
})

// router.use(async (ctx, next) => {
//   // 重定向到路由名称为 “sign-in” 的页面
//   ctx.redirect(ctx.router.url('sign-in'))
//   await next()
// })

router
  .get('/', async (ctx) => {
    ctx.body = 'Index Page'
  })
  .get('/home', async (ctx) => {
    ctx.body = 'Home Page'
  })
  .get('user', '/users/:id', async (ctx) => {
    ctx.body = ctx.url
  })
  .post('/users', async (ctx, next) => {
    // ...
  })
  .put('/users/:id', async (ctx, next) => {
    // ...
  })
  .del('/users/:id', async (ctx, next) => {
    // ...
  })
  .all('/users/:id', async (ctx, next) => {
    // ...
  })

/**
 * 在任意http请求中，遵从 RESTful 规范，可以把 GET、POST、PUT、DELETE 类型的请求分别对应 查，增，改，删，
 * 这里 router 的方法也一一对应。通常我们使用 GET 来查询和获取数据，使用 POST 来更新资源。
 * PUT 和 DELETE 使用比较少，但是如果你们团队采用 RESTful架构，就比较推荐使用了。
 * 上述代码中还有一个all 方法。
 * all 方法通常用于匹配一组路由或者全部路由从而做一些统一设置和处理，也可以处理不确定客户端发送的请求方法类型的情况
 */
// koa-router 也支持单个路由多中间件的处理
router.get('/users/:id', function (ctx, next) {
  return User.findOne(ctx.params.id).then(user => {
    // 首先读取用户的信息，异步操作
    ctx.user = user
    next()
  })
}, function (ctx) {
  console.log(ctx.user)
  // 在这个中间件中再对用户信息做一些处理
  // => { id: 17, name: "Alex" }
})

// koa-router 也支持参数，参数会被添加到 ctx.params 中
router.get('/:category/:title', function (ctx, next) {
  console.log(ctx.params)
  // => { category: 'programming', title: 'how-to-node' }
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})
