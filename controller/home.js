// 引入 service 文件
const HomeService = require('../service/home')

module.exports = {
  index: async (ctx, next) => {
    await ctx.render('home/index', { title: 'iKcamp 欢迎您' })
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
    await ctx.render('home/login', {
      btnName: '登录'
    })
  },
  register: async (ctx, next) => {
    const { name, password } = ctx.request.body
    const res = await HomeService.register(name, password)
    if (res.status === -1) {
      ctx.render('home/login', res.data)
    } else if (res.status === -1) {
      ctx.state.title = '个人中心'
      await ctx.render('home/success', res.data)
    }
  }
}
