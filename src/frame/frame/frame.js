/**
 * @author: wangjun
 * @date: 2019-03-04 18:17:51
 * @desc: 封装框架
 */
import Vue from 'vue'
import vFrame from './frame.vue'

const frame = {
  name: 'frame',
  install: function (Vue) {
    Vue.component('v-frame', vFrame)
  }
}

export default frame
