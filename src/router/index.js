import Vue from 'vue'
import Router from 'vue-router'

import loginPage from '../login/index'
import login from './loginRouter'
import business from './businessRouter'
import frame from '../frame/frame/frame.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: loginPage,
      children: login
    },
    {
      path: '/index',
      component: frame,
      children: business
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
