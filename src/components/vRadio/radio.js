/**
* @author: wangjun
* @date: 2019-03-07 16:22:07
* @desc: 注册radio插件
*/

import vRadio from './radio.vue'

const radio = {
  name: 'vRadio',
  install: function (Vue) {
    Vue.component('v-radio', vRadio)
  }
}

export default radio
