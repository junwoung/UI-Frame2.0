/**
* @author: wangjun
* @date: 2019-03-13 16:11:13
* @desc: 注册time插件
*/

import vTime from './time.vue'

const time = {
  name: 'vTime',
  install: function (Vue) {
    Vue.component('v-time', vTime)
  }
}

export default time
