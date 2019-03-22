/**
* @author: wangjun
* @date: 2019-03-18 17:04:13
* @desc: 注册dimension组件
*/

import vDimension from './dimension.vue'

const dimension = {
  name: 'vDimension',
  install: function (Vue) {
    Vue.component('v-dimension', vDimension)
  }
}

export default dimension
