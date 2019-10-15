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

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})
