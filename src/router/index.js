import Vue from 'vue'
import Router from 'vue-router'
//  导入具体业务组件
import select from '@/business/select'
import checkbox from '@/business/checkbox'
import tab from '@/business/tab'
import pagination from '@/business/pagination'
import upload from '@/business/upload'
import time from '@/business/time'
import query from '@/business/query'
import dialog from '@/business/dialog'
import carousel from '@/business/carousel'
import newTime from '@/business/newTime'

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
      path: '/time',
      component: time
    },
    {
      path: '/newTime',
      component: newTime
    },
    {
      path: '/query',
      component: query
    },
    {
      path: '/dialog',
      component: dialog
    },
    {
      path: '/carousel',
      component: carousel
    },
    {
      path: '*',
      redirect: '/select'
    }
  ]
})
