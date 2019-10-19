const Koa = require('koa')
const app = new Koa()
const router = require('./router')

// 引入中间件
const middleware = require('./middleware')
middleware(app)

router(app)

app.listen(3000, () => {
  console.log('[demo] server is running at http://localhost:3000')
})
