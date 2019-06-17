//  判断用户是否登陆
(() => {
  setTimeout(() => {
    let username = sessionStorage.USERNAME
    if (username === undefined) {
      // location.href = '/static/login/login.html'
      // location.href = '#/login'
    }
  }, 0)
})()
