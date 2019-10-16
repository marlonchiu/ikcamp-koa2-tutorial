module.exports = {
  register: async (name, password) => {
    let data
    if (name === 'ikcamp' && password === '123456') {
      data = `Hello， ${name}！`
    } else {
      data = '账号信息错误'
    }
    return data
  }
}
