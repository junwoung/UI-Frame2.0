/**
* @author: wangjun
* @date: 2019-03-11 10:48:19
* @desc: 注册分页插件
*/

import vPagination from './pagination.vue'

const pagination = {
  name: 'vPagination',
  install: function (Vue) {
    Vue.component('v-pagination', vPagination)
  }
}

export default pagination
