import Vue from 'vue'
import Router from 'vue-router'
//  导入具体业务组件
import select from '@/business/select'
import checkbox from '@/business/checkbox'
import tab from '@/business/tab'
import pagination from '@/business/pagination'
import upload from '@/business/upload'

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
      path: '/tab',
      component: tab
    },
    {
      path: '/pagination',
      component: pagination
    },
    {
      path: '/upload',
      component: upload
    },
    {
      path: '*',
      redirect: '/select'
    }
  ]
})
