//  单独配置登陆文件等路由
import login from '../login/login/login.vue'
import register from '../login/register/register.vue'

export default [
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  }
]
