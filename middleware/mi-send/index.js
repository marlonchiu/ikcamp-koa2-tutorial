module.exports = () => {
  function render (json) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
  }
  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}

/**
 * 代码中，我们把 JSON 数据的处理方法挂载在 ctx 对象中，并起名为 send。
 * 当我们需要返回 JSON 数据给客户端时候，只需要调用此方法，
 * 并把 JSON 对象作为参数传入到方法中就行了
 */
