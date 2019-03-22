/**
* @author: wangjun
* @date: 2019-03-18 15:37:51
* @desc: 注册query插件
*/

import vQuery from './query.vue'

const query = {
  name: 'vQuery',
  install: function (Vue) {
    Vue.component('v-query', vQuery)
  }
}

export default query
