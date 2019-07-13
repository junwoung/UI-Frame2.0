/**
* @author: wangjun
* @date: 2019-07-09 21:20:47
* @desc: 注册input组件
*/

import vInput from './input.vue'

export default {
  name: 'v-input',
  install: function (Vue) {
    Vue.component('v-input', vInput)
  }
}
