const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = new Router()

app.use(bodyParser())
// 请求参数放在 URL 后面
// http://localhost:3000/home?id=12&name=ikcamp

router.get('/home', async (ctx, next) => {
  const url = ctx.url
  const request = ctx.request
  const reqQuery = request.query
  const reqQuerystring = request.querystring
  // console.log(ctx.request.query)
  // console.log(ctx.request.querystring)
  ctx.response.body = {
    url,
    reqQuery,
    reqQuerystring
  }
})

// 请求参数放在 URL 中间
// http://localhost:3000/home/12/ikcamp
router.get('/home/:id/:name', async (ctx, next) => {
  // console.log(ctx.params)
  const params = ctx.params
  ctx.body = {
    params
  }
})

// POST请求
router.get('/user', async (ctx, next) => {
  const html =
    `
      <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：ikcamp" />
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/>
        <button>GoGoGo</button>
      </form>
    `
  ctx.body = html
  next()
})
// 增加响应表单请求的路由
router.post('/user/register', async (ctx, next) => {
  const { name, password } = ctx.request.body
  if (name === 'ikcamp' && password === '123456') {
    ctx.body = `Hello， ${name}！`
  } else {
    ctx.body = '账号信息错误'
  }
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})
