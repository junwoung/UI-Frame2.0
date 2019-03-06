/**
 * @author: wangjun
 * @date: 2019-03-06 09:27:53
 * @desc: 安装注册select插件
 */
import Vue from 'vue'
import vSelect from './select.vue'

const select = {
  name: 'vSelect',
  install: function () {
    Vue.component('v-select', vSelect)
  }
}
export default select
