const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const app = new Koa()
const router = require('./router')

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'), // 指定视图目录
  nunjucksConfig: {
    trimBlocks: true // 开启转义 防Xss
  }
}))

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, './public')))

app.use(bodyParser())
router(app)

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000')
})
