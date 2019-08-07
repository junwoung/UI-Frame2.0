/**
* @author: wangjun
* @date: 2019-08-05 15:46:45
* @desc: 注册加载组件
*/

import Vue from 'vue'
import vLoading from './loading.vue'

const loading = {
  name: 'v-loading',
  install: function (Vue) {
    Vue.component('v-loading', vLoading)
  }
}

Vue.use(loading)
