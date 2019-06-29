/**
* @author: wangjun
* @date: 2019-06-28 16:47:44
* @desc: 注册步骤组件
*/

import vStep from './step.vue'

const step = {
  name: 'v-step',
  install: function (Vue) {
    Vue.component('v-step', vStep)
  }
}

export default step
