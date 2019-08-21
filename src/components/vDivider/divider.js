/**
* @author: wangjun
* @date: 2019-08-07 14:31:02
* @desc: 注册分割线组件
*/

import Vue from 'vue'
import vDivider from './divider.vue'

const divider = {
  name: 'v-divider',
  install: function (Vue) {
    Vue.component('v-divider', vDivider)
  }
}

Vue.use(divider)
