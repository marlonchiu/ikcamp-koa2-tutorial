// 引入 service 文件
const HomeService = require('../service/home')

module.exports = {
  index: async (ctx, next) => {
    ctx.body = '<h1>Index page</h1>'
  },
  home: async (ctx, next) => {
    const url = ctx.url
    const request = ctx.request
    const reqQuery = request.query
    const reqQuerystring = request.querystring
    ctx.body = {
      url,
      reqQuery,
      reqQuerystring
    }
  },
  homeParams: async (ctx, next) => {
    const params = ctx.params
    ctx.body = {
      params
    }
  },
  login: async (ctx, next) => {
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
  },
  register: async (ctx, next) => {
    const { name, password } = ctx.request.body
    const data = await HomeService.register(name, password)
    ctx.response.body = data
  }
}
