//  单独配置业务组建路由
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
import landmark from '@/business/landmark'
import form from '@/business/form'
import table from '@/business/table'
import btnGroup from '@/business/btnGroup'
import input from '@/business/text'

//  导入具体指令业务
import direcNumber from '@/business/input'
import direcTop from '@/business/top'
import lazyload from '@/business/lazyload'
import direcTips from '@/business/tips'

require('./login.js')

export default [
  {
    path: '/select',
    component: select
  },
  {
    path: '/checkbox',
    component: checkbox
  },
  {
    path: '/checkbox/:id',
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
    path: `/time`,
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
    path: '/direc_number',
    component: direcNumber
  },
  {
    path: '/direc_top',
    component: direcTop
  },
  {
    path: '/lazyLoad',
    component: lazyload
  },
  {
    path: '/direc_tips',
    component: direcTips
  },
  {
    path: '/landmark',
    component: landmark
  },
  {
    path: '/form',
    component: form
  },
  {
    path: '/table',
    component: table
  },
  {
    path: '/btnGroup',
    component: btnGroup
  },
  {
    path: '/input',
    component: input
  }
  // ,
  // {
  //   path: '*',
  //   redirect: '/select'
  // }
]
