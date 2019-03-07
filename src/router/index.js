import Vue from 'vue'
import Router from 'vue-router'
//  导入具体业务组件
import select from '@/business/select'
import checkbox from '@/business/checkbox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/select',
      component: select
    },
    {
      path: '/checkbox',
      component: checkbox
    },
    {
      path: '/pagination',
      component: select
    },
    {
      path: '*',
      redirect: '/select'
    }
  ]
})
