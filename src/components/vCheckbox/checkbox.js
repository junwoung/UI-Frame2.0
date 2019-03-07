/**
* @author: wangjun
* @date: 2019-03-07 10:31:24
* @desc: 注册checkbox组件
*/

import vCheckbox from './checkbox.vue'

const checkbox = {
  name: 'vCheckbox',
  install: function (Vue) {
    Vue.component('v-checkbox', vCheckbox)
  }
}

export default checkbox
