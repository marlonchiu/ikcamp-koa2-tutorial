const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')

app.use(bodyParser())
router(app)

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})
